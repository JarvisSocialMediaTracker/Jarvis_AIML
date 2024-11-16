document.getElementById("generate-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const prompt = document.getElementById("prompt").value;

    fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt })
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("generated").textContent = data.content;
            document.getElementById("tone").textContent = data.tone;
        });
});
