document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tone-form");
    const contentInput = document.getElementById("content");
    const toneOutput = document.getElementById("tone");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page refresh

        const content = contentInput.value.trim();
        if (!content) {
            alert("Please paste content to analyze the tone!");
            return;
        }

        // Placeholder logic for tone detection
        const tone = analyzeTone(content);

        // Display the tone result
        toneOutput.textContent = tone;
    });

    // Mock function for tone analysis
    function analyzeTone(content) {
        const positiveWords = ["happy", "great", "excellent", "positive", "amazing"];
        const negativeWords = ["sad", "bad", "terrible", "negative", "awful"];

        const words = content.toLowerCase().split(/\s+/);
        const positiveCount = words.filter(word => positiveWords.includes(word)).length;
        const negativeCount = words.filter(word => negativeWords.includes(word)).length;

        if (positiveCount > negativeCount) {
            return "Positive";
        } else if (negativeCount > positiveCount) {
            return "Negative";
        } else {
            return "Neutral";
        }
    }
});

