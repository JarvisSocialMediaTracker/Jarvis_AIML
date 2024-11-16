document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tone-form");
    const textInput = document.getElementById("text");
    const toneOutput = document.getElementById("tone");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const text = textInput.value.trim();
        if (!text) {
            alert("Please provide some text to analyze!");
            return;
        }

        try {
            // Call the Flask API for tone analysis
            const tone = await analyzeTone(text);

            // Display the analyzed tone
            toneOutput.textContent = `The tone of the text is: ${tone}`;

        } catch (error) {
            alert("An error occurred while analyzing the tone: " + error.message);
        }
    });

    // Function to fetch tone from the Python Flask API
    async function analyzeTone(text) {
        const response = await fetch("http://localhost:5002/analyze-tone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error("Failed to analyze tone.");
        }

        const data = await response.json();
        return data.tone; // Return the tone from the API response
    }
});
