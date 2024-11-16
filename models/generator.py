#def generate_text(prompt):
    # Dummy content generation logic
    #return f"Generated content based on: {prompt}"


from transformers import pipeline

# Initialize the text generation pipeline
text_generator = pipeline("text-generation", model="gpt2")

def generate_text(prompt):
    """
    Generates text based on the provided prompt using GPT-2.
    """
    generated = text_generator(prompt, max_length=50, num_return_sequences=1)
    return generated[0]["generated_text"]

