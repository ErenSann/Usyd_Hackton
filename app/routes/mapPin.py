from flask import Flask, jsonify, request, render_template
from . import main
pins = []

# @main.route('/')
# def index():
#     return render_template("home.html")

@main.route('/pins', methods=['POST'])
def add_pin():
    new_pin = request.json
    pins.append(new_pin)
    return jsonify({"status": "success"})

@main.route('/pins', methods=['GET'])
def get_pins():
    return jsonify(pins)