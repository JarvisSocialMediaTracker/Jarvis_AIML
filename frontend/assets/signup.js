document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) alert("Signup successful!");
            else alert("Signup failed! Username might already exist.");
        });
});
