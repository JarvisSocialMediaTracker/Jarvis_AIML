document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("signup-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!username || !email || !password) {
            statusMessage.textContent = "All fields are required!";
            statusMessage.style.color = "red";
            return;
        }

        if (!validateEmail(email)) {
            statusMessage.textContent = "Invalid email format!";
            statusMessage.style.color = "red";
            return;
        }

        if (password.length < 6) {
            statusMessage.textContent = "Password must be at least 6 characters long!";
            statusMessage.style.color = "red";
            return;
        }

        // Simulate successful signup
        statusMessage.textContent = `Welcome, ${username}! Signup successful.`;
        statusMessage.style.color = "green";

        // Clear inputs after signup
        usernameInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
    });

    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
