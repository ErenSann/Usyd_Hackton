from flask import render_template, session, redirect, url_for
from flask_socketio import join_room, leave_room, emit
from app import socketio
from . import main

user_rooms = {}


@main.route('/chat')
def chat():
    if 'username' in session:
        return render_template('chat.html', username=session['username'])
    return redirect(url_for('main.login'))

@socketio.on('connect')
def handle_connect():
    pass

@socketio.on('join')
def handle_join(data):
    room = data['room']
    username = data['username']
    join_room(room)
    user_rooms[username] = room
    emit('message', {'user': 'System', 'message': f'{username} has joined the room {room}.'}, room=room)


@socketio.on('leave')
def handle_leave(data):
    room = data['room']
    username = data['username']
    leave_room(room)
    emit('message', {'user': 'System', 'message': f'{username} has left the room {room}.'}, room=room)


@socketio.on('message')
def handle_message(data):
    room = data['room']
    username = session['username']
    message = data['message']
    emit('message', {'user': username, 'message': message, 'room': room}, room=room)


