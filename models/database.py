import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash

def add_user(user_data):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    """)
    try:
        # Hash the password before inserting it into the database
        hashed_password = generate_password_hash(user_data["password"])

        cursor.execute("INSERT INTO users (username, password) VALUES (?, ?)", 
                       (user_data["username"], hashed_password))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        # User already exists
        return False
    finally:
        conn.close()

# Example usage
user_data = {
    "username": "test_user",
    "password": "secure_password123"
}

if add_user(user_data):
    print("User added successfully.")
else:
    print("Username already exists.")
def check_user_credentials(username, password):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM users WHERE username=?", (username,))
    stored_password = cursor.fetchone()
    
    if stored_password and check_password_hash(stored_password[0], password):
        return True  # Valid user
    return False  # Invalid username or password
