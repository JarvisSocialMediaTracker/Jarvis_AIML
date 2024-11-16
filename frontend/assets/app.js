// Utility function to display results on the page
function displayResult(targetId, result) {
    const element = document.getElementById(targetId);
    element.innerHTML = `<pre>${result}</pre>`;
}

// Utility function to send POST requests to the backend
async function sendPostRequest(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
    }
}

// Handle Summarization
async function handleSummarization() {
    const inputText = document.getElementById('inputText').value;
    const resultContainer = 'resultContainer';

    // Show loading spinner
    displayResult(resultContainer, "Summarizing...");

    const data = { text: inputText };
    const result = await sendPostRequest('/summarize', data);

    // Update UI with the result
    if (result && result.summary) {
        displayResult(resultContainer, result.summary);
    } else {
        displayResult(resultContainer, "No summary generated.");
    }
}

// Handle Tone Analysis
async function handleToneAnalysis() {
    const inputText = document.getElementById('inputText').value;
    const resultContainer = 'resultContainer';

    // Show loading spinner
    displayResult(resultContainer, "Analyzing tone...");

    const data = { text: inputText };
    const result = await sendPostRequest('/tone', data);

    // Update UI with the tone analysis
    if (result && result.tone) {
        const toneIcon = `/static/images/${result.tone}.png`; // Use tone icon
        displayResult(
            resultContainer,
            `<p>Detected Tone: ${result.tone}</p><img src="${toneIcon}" alt="${result.tone}" />`
        );
    } else {
        displayResult(resultContainer, "No tone detected.");
    }
}

// Handle Content Generation
async function handleContentGeneration() {
    const inputPrompt = document.getElementById('inputPrompt').value;
    const resultContainer = 'resultContainer';

    // Show loading spinner
    displayResult(resultContainer, "Generating content...");

    const data = { prompt: inputPrompt };
    const result = await sendPostRequest('/generate', data);

    // Update UI with the generated content
    if (result && result.content) {
        displayResult(resultContainer, result.content);
    } else {
        displayResult(resultContainer, "No content generated.");
    }
}

// Event Listeners for Buttons
document.getElementById('summarizeButton').addEventListener('click', handleSummarization);
document.getElementById('toneButton').addEventListener('click', handleToneAnalysis);
document.getElementById('generateButton').addEventListener('click', handleContentGeneration);
