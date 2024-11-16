document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("generate-form");
    const promptInput = document.getElementById("prompt");
    const generatedOutput = document.getElementById("generated");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        const prompt = promptInput.value.trim();
        if (!prompt) {
            alert("Please provide a prompt for content generation!");
            return;
        }

        try {
            // Call the Python Flask API for content generation
            const generatedText = await generateContent(prompt);

            // Display the generated content
            generatedOutput.textContent = generatedText;

        } catch (error) {
            alert("An error occurred while generating content: " + error.message);
        }
    });

    // Function to fetch generated content from the Python Flask API
    async function generateContent(prompt) {
        const response = await fetch("http://localhost:5001/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error("Failed to generate content.");
        }

        const data = await response.json();
        return data.generated_text; // Return the generated text from the API
    }
});
