const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();

// Initialize SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Database opening error:", err);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create Users table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )
`);

// Set up middleware
app.use(bodyParser.json()); // Parse JSON bodies for login/signup requests
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

// Signup Route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if the username already exists
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
    if (row) {
      // If username exists, return a message
      return res.json({ success: false, message: "Username already taken" });
    }

    // Insert new user into the database
    db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password],
      function (err) {
        if (err) {
          return res.json({
            success: false,
            message: "Error registering user",
          });
        }
        res.json({ success: true, message: "User registered successfully" });
      }
    );
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Verify credentials
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (row) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
