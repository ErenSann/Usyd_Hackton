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

def get_user_by_username(username):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
    account = cursor.fetchone()
    conn.close()
    return account

def insert_user(username, password):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    conn.commit()
    conn.close()

def get_usernames(user_id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT username FROM users WHERE id=%s", (user_id,))
    username = cursor.fetchone()
    conn.close()
    return username

def create_tables_if_not_exists():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS pinpoints (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        lat DOUBLE NOT NULL,
        lng DOUBLE NOT NULL,
        color VARCHAR(20) NOT NULL     
    );
    ''')
    conn.commit()
    conn.close()

def insert_pinpoint(user_id, name, description, lat, lng, color):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO pinpoints (user_id, name, description, lat, lng, color) VALUES (%s, %s, %s, %s, %s, %s)",
                   (user_id, name, description, lat, lng, color))
    conn.commit()
    conn.close()

# def get_all_pinpoints(id):
#     conn = get_db()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM pinpoints where user_id=%s", (id,))
#     return cursor.fetchall()

def get_all_pinpoints():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM pinpoints")
    return cursor.fetchall()