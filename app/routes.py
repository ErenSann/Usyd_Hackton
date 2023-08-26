from flask import Blueprint, render_template, request, redirect, url_for, session
from .db import check_user, insert_user

main = Blueprint('main', __name__)

@main.route('/')
def home():
    if 'username' in session:
        return render_template('home.html', username=session['username'])
    return redirect(url_for('main.login'))

@main.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if check_user(username, password):
            session['username'] = username
            return redirect(url_for('main.home'))
        else:
            return "Invalid login credentials"

    return render_template('login.html')

@main.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        insert_user(username, password)

        return redirect(url_for('main.login'))

    return render_template('register.html')

@main.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('main.login'))
