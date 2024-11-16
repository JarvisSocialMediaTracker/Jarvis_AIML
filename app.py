from flask import Flask, request, jsonify, render_template
from models.summarizer import summarize
from models.tone import analyze_tone
from models.generator import generate_text
from database import add_user
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (for local development)

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize_content():
    data = request.json
    if "text" not in data:
        return jsonify({"error": "Text is required"}), 400

    summary = summarize(data["text"])
    tone = analyze_tone(data["text"])
    return jsonify({"summary": summary, "tone": tone})

@app.route("/generate", methods=["POST"])
def generate_content():
    data = request.json
    if "prompt" not in data:
        return jsonify({"error": "Prompt is required"}), 400

    content = generate_text(data["prompt"])
    tone = analyze_tone(content)
    return jsonify({"content": content, "tone": tone})

@app.route("/tone", methods=["POST"])
def tone_analysis():
    data = request.json
    if "text" not in data:
        return jsonify({"error": "Text is required"}), 400

    tone = analyze_tone(data["text"])
    return jsonify({"tone": tone})

@app.route("/signup", methods=["POST"])
def signup():
    user_data = request.json
    success = add_user(user_data)
    if success:
        return jsonify({"success": True, "message": "User registered successfully"})
    else:
        return jsonify({"success": False, "message": "Username already exists"}), 400

if __name__ == "__main__":
    app.run(debug=True)
