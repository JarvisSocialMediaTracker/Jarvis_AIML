#def analyze_tone(text):
    #if "happy" in text:
        #return "positive"
    #elif "sad" in text:
        #return "negative"
    #else:
        #return "neutral"

from transformers import pipeline

# Initialize the sentiment analysis pipeline
tone_analyzer = pipeline("sentiment-analysis")

def analyze_tone(text):
    """
    Analyzes the tone of the given text using a pre-trained sentiment analysis model.
    """
    result = tone_analyzer(text)[0]
    tone = result["label"].lower()  # Convert labels like "POSITIVE" to "positive"
    return tone

