#def summarize(text):
    # #Dummy summarization logic
    #return " ".join(text.split()[:10]) + "..."

from transformers import pipeline

# Initialize the summarizer
summarizer_model = pipeline("summarization")

def summarize(text):
    """
    Summarizes the input text using Hugging Face transformers.
    """
    # Ensure text is not too long for the model
    if len(text.split()) > 512:
        text = " ".join(text.split()[:512])

    # Perform summarization
    summary = summarizer_model(text, max_length=50, min_length=25, do_sample=False)
    return summary[0]["summary_text"]

