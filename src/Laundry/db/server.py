import sqlite3
from flask import Flask, make_response, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
import time
import threading

app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.config["SECRET_KEY"] = 'secret_dev_key'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
app.config["SESSION_TYPE"] = "sqlalchemy" 

db = SQLAlchemy(app)

app.config['SESSION_SQLALCHEMY'] = db

sess = Session(app)

# Database lock for coordinating access
db_lock = threading.Lock()

def init_database():
    """Initialize database with proper constraints"""
    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    
    # Create users table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS laundry_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)
    
    # Create bookings table with unique constraint to prevent double bookings
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            booking_date TEXT NOT NULL,
            booking_time INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(booking_date, booking_time),
            FOREIGN KEY (username) REFERENCES laundry_users(username)
        )
    """)
    
    conn.commit()
    conn.close()

# Initialize database on startup
init_database()

@app.route('/api/laundry/login', methods=['POST'])
def get_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM laundry_users WHERE username = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        session['username'] = username
        message = make_response("User found, you are now logged in", 200)
    else:
        message = make_response("User not found, please try again", 404)
    
    return message

@app.route('/api/laundry/login/createAccount', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    
    try:
        cursor.execute("INSERT INTO laundry_users (username, password) VALUES (?, ?)", (username, password))
        conn.commit()
        message = "User added successfully"
        status_code = 200
    except sqlite3.IntegrityError:
        message = "Username already exists"
        status_code = 409
    except sqlite3.Error as e:
        print("Error:", e)
        message = str(e)
        status_code = 400

    conn.close()
    return jsonify({"message": message}), status_code

@app.route('/api/laundry/user', methods=['GET'])
def get_logged_in_user():
    if 'username' in session:
        return jsonify({"message": "User is logged in", "user_info": {"name": session['username']}})
    else:
        return jsonify({"message": "No user logged in"}), 401
    
@app.route('/api/laundry/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "User logged out"}), 200

@app.route("/api/laundry/addBooking", methods=['POST'])
def addBooking():
    data = request.get_json()
    username = data.get('username', {}).get('name')
    date = data.get('date')
    time_slot = data.get('time')
    print("ADDING BOOKING FOR USER:", username, "DATE:", date, "TIME:", time_slot)

    if not username or not date or not time_slot:
        return jsonify({"message": "Missing required fields"}), 400

    # Optimistic locking with retry logic
    max_retries = 3
    retry_count = 0
    
    while retry_count < max_retries:
        try:
            with db_lock:  # Use threading lock for coordination
                conn = sqlite3.connect("laundry_database.db")
                cursor = conn.cursor()
                
                # First, check if the slot is already booked
                cursor.execute("SELECT username FROM bookings WHERE booking_date = ? AND booking_time = ?", (date, time_slot))
                existing_booking = cursor.fetchone()
                
                if existing_booking:
                    conn.close()
                    return jsonify({
                        "message": f"Time slot {time_slot} on {date} is already booked by {existing_booking[0]}",
                        "error": "slot_already_booked"
                    }), 409
                
                # Check if user already has a booking on this date
                cursor.execute("SELECT booking_time FROM bookings WHERE username = ? AND booking_date = ?", (username, date))
                user_existing = cursor.fetchone()
                
                if user_existing:
                    conn.close()
                    return jsonify({
                        "message": f"You already have a booking on {date} at time slot {user_existing[0]}",
                        "error": "user_already_booked"
                    }), 409
                
                # Insert the booking with unique constraint
                cursor.execute("INSERT INTO bookings (username, booking_date, booking_time) VALUES (?, ?, ?)", 
                             (username, date, time_slot))
                conn.commit()
                conn.close()
                
                return jsonify({"message": "Booking added successfully"}), 200
                
        except sqlite3.IntegrityError as e:
            conn.close()
            if "UNIQUE constraint failed" in str(e):
                # Another user booked this slot between our check and insert
                retry_count += 1
                if retry_count < max_retries:
                    time.sleep(0.1)  # Small delay before retry
                    continue
                else:
                    return jsonify({
                        "message": f"Time slot {time_slot} on {date} was just booked by another user. Please try a different time.",
                        "error": "concurrent_booking"
                    }), 409
            else:
                return jsonify({"message": f"Database constraint error: {str(e)}"}), 400
                
        except sqlite3.Error as e:
            conn.close()
            print("Database error:", e)
            return jsonify({"message": f"Database error: {str(e)}"}), 500
        except Exception as e:
            conn.close()
            print("Unexpected error:", e)
            return jsonify({"message": f"Unexpected error: {str(e)}"}), 500
    
    return jsonify({"message": "Failed to book after multiple attempts"}), 500

@app.route("/api/laundry/deleteBooking", methods=['POST'])
def deleteBooking():
    data = request.get_json()
    username = data.get('username', {}).get('name')
    date = data.get('date')
    time_slot = data.get('time')

    if not username or not date or not time_slot:
        return jsonify({"message": "Missing required fields"}), 400

    print("DELETING BOOKING FOR USER:", username, "DATE:", date, "TIME:", time_slot)
    
    try:
        with db_lock:
            conn = sqlite3.connect("laundry_database.db")
            cursor = conn.cursor()
            
            # Verify the booking exists and belongs to the user
            cursor.execute("SELECT id FROM bookings WHERE username = ? AND booking_date = ? AND booking_time = ?", 
                         (username, date, time_slot))
            booking = cursor.fetchone()
            
            if not booking:
                conn.close()
                return jsonify({"message": "Booking not found or doesn't belong to you"}), 404
            
            cursor.execute("DELETE FROM bookings WHERE username = ? AND booking_date = ? AND booking_time = ?", 
                         (username, date, time_slot))
            conn.commit()
            conn.close()
            
            print("Booking deleted successfully")
            return jsonify({"message": "Booking deleted successfully"}), 200
            
    except sqlite3.Error as e:
        conn.close()
        print("Error:", e)
        return jsonify({"message": f"Database error: {str(e)}"}), 500

@app.route("/api/laundry/getBookings", methods=['GET'])
def getBookings():
    try:
        conn = sqlite3.connect("laundry_database.db")
        cursor = conn.cursor()
        cursor.execute("SELECT booking_date, booking_time, username FROM bookings ORDER BY booking_date, booking_time")
        bookings = cursor.fetchall()
        conn.close()

        return jsonify({"bookings": bookings})
    except sqlite3.Error as e:
        conn.close()
        return jsonify({"message": f"Database error: {str(e)}"}), 500

@app.route("/api/laundry/checkBookingForUser", methods=['POST'])
def checkBookingForUser():
    data = request.get_json()
    print("THIS IS THE DATA: ", data)
    username = data.get('username')
    date = data.get('currentDateFormatted')
    print("CHECKING BOOKING FOR USER:", username, "DATE:", date)

    if not username or not date:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        conn = sqlite3.connect("laundry_database.db")
        cursor = conn.cursor()
        cursor.execute("SELECT booking_date, booking_time FROM bookings WHERE username = ? AND booking_date >= ? ORDER BY booking_date, booking_time", 
                      (username, date))
        booking = cursor.fetchall()
        conn.close()
        print("Booking for user:", booking)

        if booking:
            message = "User has a booking"
            return jsonify({
                "message": message, 
                "booking_date": booking[0][0], 
                "booking_slot": booking[0][1]
            })
        else:
            message = "User has no booking"
            return jsonify({"message": message})
    except sqlite3.Error as e:
        conn.close()
        return jsonify({"message": f"Database error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=5001)
