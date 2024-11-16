from flask import Flask, request, jsonify
import random

app = Flask(__name__)

# Placeholder content generation function
def generate_content(prompt):
    # A simple mock content generation based on the prompt (for demonstration purposes)
    generated_phrases = [
        "Artificial intelligence is revolutionizing multiple industries.",
        "The future of content creation will be shaped by machine learning models.",
        "Technology is advancing at a rapid pace, bringing new opportunities.",
        "Automation is transforming the way businesses operate and employees work.",
        "AI-driven solutions are enabling more efficient decision-making processes."
    ]
    
    # Simulate content generation by combining prompt with random phrases
    return f"{prompt}: {random.choice(generated_phrases)}"

@app.route('/generate', methods=['POST'])
def generate():
    try:
        # Parse the JSON data from the request
        data = request.get_json()
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required!"}), 400
        
        # Generate content based on the prompt
        generated_text = generate_content(prompt)

        return jsonify({"generated_text": generated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
