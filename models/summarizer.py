from flask import Flask, request, jsonify
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

app = Flask(__name__, template_folder="/c/Users/Shailshree Sinha/Documents/GitHub/Jarvis_AIML/templates/index.html")

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        # Parse the content from the request
        data = request.get_json()
        content = data.get("content", "")
        if not content:
            return jsonify({"error": "No content provided."}), 400

        # Summarization logic
        parser = PlaintextParser.from_string(content, Tokenizer("english"))
        summarizer = LsaSummarizer()
        summary_sentences = summarizer(parser.document, 3)  # Get 3 sentences in the summary

        # Format the summary as a string
        summary = " ".join(str(sentence) for sentence in summary_sentences)
        return jsonify({"summary": summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
