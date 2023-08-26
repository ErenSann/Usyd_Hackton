from flask import Blueprint


main = Blueprint('main', __name__)
from .auth import *
from .chat import *
from .mapPin import*
