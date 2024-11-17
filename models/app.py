from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer import summarize
from tone import analyze_tone
from generator import generate_content

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend compatibility

@app.route("/summarize", methods=["POST"])
def summarize_route():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    summary = summarize(text)
    return jsonify({"summary": summary})

@app.route("/tone", methods=["POST"])
def tone_route():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    tone = analyze_tone(text)
    return jsonify({"tone": tone})

@app.route("/generate", methods=["POST"])
def generate_route():
    data = request.json
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    generated_content = generate_content(prompt)
    return jsonify({"content": generated_content})

if __name__ == "__main__":
    app.run(debug=True)
