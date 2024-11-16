document.getElementById("tone-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("text").value;

    fetch("/tone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
    })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById("tone").textContent = data.tone;
        });
});
