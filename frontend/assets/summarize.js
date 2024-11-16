document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("summarize-form");
    const contentInput = document.getElementById("content");
    const summaryOutput = document.getElementById("summary");
    const toneOutput = document.getElementById("tone");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        const content = contentInput.value.trim();
        if (!content) {
            alert("Please paste content to summarize!");
            return;
        }

        try {
            // Call the Python Flask API to get the summary
            const summary = await summarizeContent(content);

            // Placeholder for tone analysis; replace with actual tone analysis API if needed
            const tone = "Neutral"; 

            // Display the results
            summaryOutput.textContent = summary;
            toneOutput.textContent = tone;

        } catch (error) {
            alert("An error occurred while summarizing the content: " + error.message);
        }
    });
});

// Function to fetch summary from the Python Flask API
async function summarizeContent(content) {
    const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error("Failed to summarize content.");
    }

    const data = await response.json();
    return data.summary; // Return the summary from the API response
}
