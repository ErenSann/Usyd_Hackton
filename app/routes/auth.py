import MySQLdb
from flask import render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from app.db import get_db
from . import main

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # connect to the database
        db = MySQLdb.connect(host="localhost", user="admin", passwd="admin", db="hackton")
        cursor = db.cursor()

        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        account = cursor.fetchone()
        print("login")
        print(account[2])
        if account and check_password_hash(account[2], password):
            session['username'] = account[1]
            return redirect(url_for('main.home'))
        else:
            return "Invalid login credentials"

    return render_template('login.html')

@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='sha256')
        print("register")
        print(hashed_password)

        db = MySQLdb.connect(host="localhost", user="admin", passwd="admin", db="hackton")
        cursor = db.cursor()

        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
        db.commit()

        return render_template('login.html')

    return render_template('register.html')

@main.route('/logout')
def logout():
    session.pop('username', None)
    return render_template('login.html')
