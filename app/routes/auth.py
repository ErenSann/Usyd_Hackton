import MySQLdb
from flask import render_template, request, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash
from . import main
from app.db import get_user_by_username, insert_user

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        account = get_user_by_username(username)  # Using db function

        if account and check_password_hash(account[2], password):
            session['user_id'] = account[0]
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

        insert_user(username, hashed_password)  # Using db function

        return redirect(url_for('main.login'))  # Redirecting to login page after successful registration

    return render_template('register.html')

@main.route('/logout')
def logout():
    session.pop('username', None)
    return render_template('login.html')
