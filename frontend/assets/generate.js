document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("generate-form");
    const promptInput = document.getElementById("prompt");
    const outputElement = document.getElementById("generated-content");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page refresh

        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert("Please enter a prompt to generate content!");
            return;
        }

        // Placeholder logic for content generation
        const generatedContent = generateContent(prompt);

        // Display the generated content
        outputElement.textContent = generatedContent;
    });

    // Mock function to generate content
    function generateContent(prompt) {
        const examples = {
            "greeting": "Hello! How can I assist you today?",
            "joke": "Why don’t skeletons fight each other? They don’t have the guts.",
            "quote": "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
        };

        // Return example based on prompt keyword or default text
        const keyword = prompt.toLowerCase();
        return examples[keyword] || `Generated content for: "${prompt}"`;
    }
});

