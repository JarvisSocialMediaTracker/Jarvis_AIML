from flask import Flask, request, jsonify, render_template
from models.summarizer import summarize
from models.tone import analyze_tone
from models.generator import generate_text
from database import add_user

app = Flask(__name__)

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize_content():
    data = request.json
    summary = summarize(data["text"])
    tone = analyze_tone(data["text"])
    return jsonify({"summary": summary, "tone": tone})

@app.route("/generate", methods=["POST"])
def generate_content():
    prompt = request.json["prompt"]
    content = generate_text(prompt)
    tone = analyze_tone(content)
    return jsonify({"content": content, "tone": tone})

@app.route("/tone", methods=["POST"])
def tone_analysis():
    text = request.json["text"]
    tone = analyze_tone(text)
    return jsonify({"tone": tone})

@app.route("/signup", methods=["POST"])
def signup():
    user_data = request.json
    success = add_user(user_data)
    return jsonify({"success": success})

if __name__ == "__main__":
    app.run(debug=True)
