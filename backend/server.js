// backend/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create users and todos tables
db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)");
  db.run("CREATE TABLE todos (id INTEGER PRIMARY KEY, user_id INTEGER, task TEXT, completed INTEGER DEFAULT 0, FOREIGN KEY(user_id) REFERENCES users(id))");
});

// User registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run(username, hashedPassword, function(err) {
    if (err) {
      return res.status(500).json({ message: "Error registering user." });
    }
    res.status(201).json({ message: "User registered successfully!", id: this.lastID });
  });
  stmt.finalize();
});

// User login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving user." });
    }
    if (!row) {
      return res.status(401).json({ message: "User does not exist." });
    }
    const match = await bcrypt.compare(password, row.password);
    if (match) {
      res.json({ message: "Login successful!", userId: row.id });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  });
});

// CRUD endpoints for todos
app.post('/api/todos', (req, res) => {
  const { userId, task } = req.body;
  const stmt = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)");
  stmt.run(userId, task, function(err) {
    if (err) {
      return res.status(500).json({ message: "Error adding todo." });
    }
    res.status(201).json({ message: "Todo added successfully!", id: this.lastID });
  });
  stmt.finalize();
});

app.get('/api/todos/:userId', (req, res) => {
  db.all("SELECT * FROM todos WHERE user_id = ?", [req.params.userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving todos." });
    }
    res.json(rows);
  });
});

app.put('/api/todos/:id', (req, res) => {
  const { task, completed } = req.body;
  db.run("UPDATE todos SET task = ?, completed = ? WHERE id = ?", [task, completed, req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: "Error updating todo." });
    }
    res.json({ message: "Todo updated successfully!" });
  });
});

app.delete('/api/todos/:id', (req, res) => {
  db.run("DELETE FROM todos WHERE id = ?", [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: "Error deleting todo." });
    }
    res.json({ message: "Todo deleted successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});