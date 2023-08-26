from flask import Flask, jsonify, request, render_template,session
from . import main
from app.db import get_all_pinpoints, insert_pinpoint
pins = []

@main.route('/pins', methods=['POST'])
def add_pin():
    new_pin = request.json
    insert_pinpoint(session.get('user_id'),new_pin['name'], new_pin['description'], new_pin['lat'], new_pin['lng'], new_pin['color'])
    return jsonify({"status": "success"})

@main.route('/pins', methods=['GET'])
def get_pins():
    pinpoints = get_all_pinpoints(session.get('user_id'))
    # Convert the pinpoints data to a JSON serializable format
    pinpoints_list = []
    for pin in pinpoints:
        pin_dict = {
            'id': pin[0],
            'user_id': pin[1],
            'name': pin[2],
            'description': pin[3],
            'lat': pin[4],
            'lng': pin[5],
            'color': pin[6]
        }
        pinpoints_list.append(pin_dict)
    return jsonify(pinpoints_list)