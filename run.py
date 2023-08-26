from flask import Flask, render_template, request, redirect, url_for, session
import MySQLdb

app = Flask(__name__)
app.secret_key = "mysecretkey"

@app.route('/')
def home():
    if 'username' in session:
        return render_template('home.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        db = MySQLdb.connect(host="localhost", user="admin", passwd="admin", db="hackton")
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        account = cursor.fetchone()

        if account:
            session['username'] = account[1]
            return redirect(url_for('home'))
        else:
            return "Invalid login credentials"

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        db = MySQLdb.connect(host="localhost", user="admin", passwd="admin", db="hackton")
        cursor = db.cursor()
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        db.commit()

        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)

