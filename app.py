from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

# 用于存储用户和对应房间的字典
user_rooms = {}

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    user_id = request.sid
    user_rooms[user_id] = None

@socketio.on('join')
def handle_join(data):
    user_id = request.sid
    room = data['room']
    user_rooms[user_id] = room
    join_room(room)
    emit('message', f'User {user_id} has joined the room {room}.', room=room)

@socketio.on('leave')
def handle_leave():
    user_id = request.sid
    room = user_rooms[user_id]
    if room:
        leave_room(room)
        emit('message', f'User {user_id} has left the room {room}.', room=room)
        user_rooms[user_id] = None

@socketio.on('message')
def handle_message(data):
    user_id = request.sid
    room = user_rooms[user_id]
    if room:
        emit('message', {'user': user_id, 'message': data['message']}, room=room)

if __name__ == '__main__':
    socketio.run(app, debug=True)
