from flask import Flask
from flask_socketio import SocketIO
from .db import create_tables_if_not_exists
socketio = SocketIO()
from .db import *
def create_app():
    app = Flask(__name__)
    app.secret_key = "mysecretkey"
    create_tables_if_not_exists()

    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    socketio.init_app(app)
    return app
