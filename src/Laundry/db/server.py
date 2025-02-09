import sqlite3
from flask import Flask, make_response, request, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session

app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
app.config["SECRET_KEY"] = 'secret_dev_key'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
app.config["SESSION_TYPE"] = "sqlalchemy" 

db = SQLAlchemy(app)

app.config['SESSION_SQLALCHEMY'] = db

sess = Session(app)

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
    time = data.get('time')
    print("ADDING BOOKING FOR USER:", username, "DATE:", date, "TIME:", time)

    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    
    try:
        cursor.execute("INSERT INTO bookings (username, booking_date, booking_time) VALUES (?, ?, ?)", (username, date, time))
        conn.commit()
        message = "Booking added successfully"
        status_code = 200
    except sqlite3.Error as e:
        print("Error:", e)
        message = str(e)
        status_code = 400

    conn.close()
    return jsonify({"message": message}), status_code

@app.route("/api/laundry/deleteBooking", methods=['POST'])
def deleteBooking():
    data = request.get_json()
    username = data.get('username', {}).get('name')
    date = data.get('date')
    time = data.get('time')

    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    
    try:
        cursor.execute("DELETE FROM bookings WHERE username = ? AND booking_date = ? AND booking_time = ?", (username, date, time))
        conn.commit()
        message = "Booking deleted successfully"
        status_code = 200
    except sqlite3.Error as e:
        print("Error:", e)
        message = str(e)
        status_code = 400

    conn.close()
    return jsonify({"message": message}), status_code

@app.route("/api/laundry/getBookings", methods=['GET'])
def getBookings():
    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT booking_date, booking_time FROM bookings")
    bookings = cursor.fetchall()
    conn.close()

    return jsonify({"bookings": bookings})

@app.route("/api/laundry/checkBookingForUser", methods=['POST'])
def checkBookingForUser():
    data = request.get_json()
    print("THIS IS THE DATA: ", data)
    username = data.get('username')
    date = data.get('currentDateFormatted')
    print("CHECKING BOOKING FOR USER:", username, "DATE:", date)

    conn = sqlite3.connect("laundry_database.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings WHERE username = ? AND booking_date >= ?", (username, date))
    booking = cursor.fetchall()
    conn.close()
    print("Booking for user:", booking)

    if booking:
        message = "User has a booking"
        return jsonify({"message": message, "booking_date": booking[0][2], "booking_slot": booking[0][3]})
    else:
        message = "User has no booking"
        return jsonify({"message": message})

if __name__ == '__main__':
    app.run(host='localhost', port=5001)
