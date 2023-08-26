from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# In-memory store for pins
pins = []

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/pins', methods=['POST'])
def add_pin():
    new_pin = request.json
    pins.append(new_pin)
    return jsonify({"status": "success"})

@app.route('/pins', methods=['GET'])
def get_pins():
    return jsonify(pins)

if __name__ == '__main__':
    app.run(debug=True)
