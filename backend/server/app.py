from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/generate', methods=['POST'])
def generate_text():
    input_text = request.json.get('text', '')
    response = {
        'text': input_text + ' generated'
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
