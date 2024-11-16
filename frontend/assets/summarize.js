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

        // Example placeholder logic for summary and tone analysis
        const summary = content.split(".").slice(0, 2).join(".") + ".";
        const tone = "Neutral"; // Placeholder; tone analysis could be added with libraries or APIs

        // Display the results
        summaryOutput.textContent = summary;
        toneOutput.textContent = tone;
    });
});
