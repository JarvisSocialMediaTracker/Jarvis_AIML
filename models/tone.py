from flask import Flask, request, jsonify

app = Flask(__name__, template_folder="/c/Users/Shailshree Sinha/Documents/GitHub/Jarvis_AIML/templates/index.html")

# Simple tone analysis function (using keyword matching)
def analyze_tone(text):
    positive_keywords = ["good", "great", "awesome", "fantastic", "happy", "positive"]
    negative_keywords = ["bad", "horrible", "terrible", "sad", "negative", "angry"]

    # Convert text to lowercase for keyword matching
    text_lower = text.lower()

    # Check for positive and negative keywords
    if any(keyword in text_lower for keyword in positive_keywords):
        return "Positive"
    elif any(keyword in text_lower for keyword in negative_keywords):
        return "Negative"
    else:
        return "Neutral"  # If no keywords found, classify as Neutral

@app.route('/analyze-tone', methods=['POST'])
def analyze_tone_endpoint():
    try:
        # Parse the request data
        data = request.get_json()
        text = data.get("text", "")

        if not text:
            return jsonify({"error": "Text is required for tone analysis!"}), 400
        
        # Analyze the tone based on the text
        tone = analyze_tone(text)

        return jsonify({"tone": tone})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)
