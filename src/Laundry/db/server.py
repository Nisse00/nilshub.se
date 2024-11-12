import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Apply CORS to the entire app with specific options
CORS(app)

@app.route('/', methods=['GET'])
def get_users():
    return "Hello, this is the Laundry API!"

@app.route('/api/laundry/login', methods=['POST'])
def get_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Connect to the database and query user data
    conn = sqlite3.connect("src/Laundry/db/laundry_database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM laundry_users WHERE name = ? AND password = ?", (username, password))
    user = cursor.fetchone()
    conn.close()

    if user:
        message = "User found, you are now logged in"
        status_code = 200
    else:
        message = "User not found, please try again"
        status_code = 404
    
    return jsonify({"message": message}), status_code

@app.route('/api/laundry/login/createAccount', methods=['POST'])
def add_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(data)

    # Connect to the database and insert user data
    conn = sqlite3.connect("src/Laundry/db/laundry_database.db")
    cursor = conn.cursor()
    
    # You might want to add error handling here for user creation
    try:
        cursor.execute("INSERT INTO laundry_users (name, password) VALUES (?, ?)", (username, password))
        conn.commit()
        message = "User added successfully"
        status_code = 200
    except sqlite3.Error as e:
        print("Error:", e)
        message = str(e)
        status_code = 400  # or another appropriate status code

    conn.close()

    return jsonify({"message": message}), status_code

if __name__ == '__main__':
    app.run(host='localhost', port=5001)
