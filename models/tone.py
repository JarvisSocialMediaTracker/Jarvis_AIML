def analyze_tone(text):
    if "happy" in text:
        return "positive"
    elif "sad" in text:
        return "negative"
    else:
        return "neutral"
