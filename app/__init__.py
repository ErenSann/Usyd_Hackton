from flask import Flask
from flask_socketio import SocketIO
socketio = SocketIO()
from .db import *
def create_app():
    app = Flask(__name__)
    app.secret_key = "mysecretkey"

    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    socketio.init_app(app)
    return app
