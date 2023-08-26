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
    if 'username' in session:
        user_rooms[session['username']] = None

@socketio.on('join')
def handle_join(data):
    if 'username' in session:
        room = data['room']
        user_rooms[session['username']] = room
        join_room(room)
        emit('message', {'user': 'System', 'message': f'{session["username"]} has joined the room {room}.'}, room=room)


@socketio.on('leave')
def handle_leave():
    if 'username' in session:
        room = user_rooms[session['username']]
        if room:
            leave_room(room)
            emit('message', {'user': 'System', 'message': f'{session["username"]} has left the room {room}.'}, room=room)
            user_rooms[session['username']] = None

@socketio.on('message')
def handle_message(data):
    if 'username' in session:
        room = user_rooms[session['username']]
        if room:
            emit('message', {'user': session['username'], 'message': data['message']}, room=room)
