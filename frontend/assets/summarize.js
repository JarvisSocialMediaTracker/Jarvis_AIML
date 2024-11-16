document.getElementById("summarize-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const content = document.getElementById("content").value;

    fetch("/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: content })
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("summary").textContent = data.summary;
            document.getElementById("tone").textContent = data.tone;
        });
});
