// backend/index.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3001; // Use the environment variable for port

app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database with a persistent file
const db = new sqlite3.Database('./todolists.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create users and todos tables if they don't exist
db.serialize(() => {
  // Create users table
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)", (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    }
  });

  // Create todos table with additional fields: description, priority, and priorityDate
  db.run("CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, user_id INTEGER, task TEXT, description TEXT, priority TEXT, priorityDate TEXT, completed INTEGER DEFAULT 0, FOREIGN KEY(user_id) REFERENCES users(id))", (err) => {
    if (err) {
      console.error('Error creating todos table:', err.message);
    }
  });
});

// User registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    stmt.run(username, hashedPassword, function(err) {
      if (err) {
        return res.status(500).json({ message: "Error registering user: " + err.message });
      }
      res.status(201).json({ message: "User registered successfully!", id: this.lastID });
    });
    stmt.finalize();
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving user: " + err.message });
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
  const { userId, task, description, priority, priorityDate } = req.body;
  const stmt = db.prepare("INSERT INTO todos (user_id, task, description, priority, priorityDate) VALUES (?, ?, ?, ?, ?)");
  stmt.run(userId, task, description, priority, priorityDate, function(err) {
    if (err) {
      return res.status(500).json({ message: "Error adding todo: " + err.message });
    }
    res.status(201).json({ message: "Todo added successfully!", id: this.lastID });
  });
  stmt.finalize();
});

app.get('/api/todos/:userId', (req, res) => {
  db.all("SELECT * FROM todos WHERE user_id = ?", [req.params.userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving todos: " + err.message });
    }
    res.json(rows);
  });
});

app.put('/api/todos/:id', (req, res) => {
  const { task, description, priority, priorityDate } = req.body;
  if (!task || !description || !priority || !priorityDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  db.run(
    "UPDATE todos SET task = ?, description = ?, priority = ?, priorityDate = ? WHERE id = ?",
    [task, description, priority, priorityDate, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: "Error updating todo: " + err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "Todo not found." });
      }
      res.json({ message: "Todo updated successfully!" });
    }
  );
});

app.delete('/api/todos/:id', (req, res) => {
  db.run("DELETE FROM todos WHERE id = ?", [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: "Error deleting todo: " + err.message });
    }
    res.json({ message: "Todo deleted successfully!" });
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});


