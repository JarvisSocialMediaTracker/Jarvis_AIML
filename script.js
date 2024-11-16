// Show Login Form
function showLogin() {
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("signup-section").classList.add("hidden");
}

// Show Signup Form
function showSignUp() {
  document.getElementById("signup-section").classList.remove("hidden");
  document.getElementById("login-section").classList.add("hidden");
}

// Handle Login Form Submission
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  // Send login request to the backend
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(`Welcome back, ${username}!`);
        // Redirect or perform additional actions
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    });
});

// Handle Signup Form Submission
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  // Send signup request to the backend
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Signup successful! Please log in.");
        showLogin();
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    });
});

// Placeholder for LinkedIn Login
function loginWithLinkedIn() {
  alert("LinkedIn Login is not yet implemented.");
}

// Placeholder for Facebook Login
function loginWithFacebook() {
  alert("Facebook Login is not yet implemented.");
}
