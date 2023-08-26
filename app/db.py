import MySQLdb

def get_db():
    return MySQLdb.connect(host="localhost", user="admin", passwd="admin", db="hackton")

def check_user(username, password):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
    account = cursor.fetchone()
    conn.close()
    return bool(account)

def insert_user(username, password):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    conn.commit()
    conn.close()
