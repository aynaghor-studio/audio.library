const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

// MySQL setup (replace these with your InfinityFree credentials)
const db = mysql.createConnection({
  host: 'your_database_host',    // e.g., 'sql123.epizy.com'
  user: 'your_database_user',    // e.g., 'username123'
  password: 'your_database_password',
  database: 'your_database_name' // e.g., 'your_database_name'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(session({
  secret: 'W87QE',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Visitor count and user logs (in-memory)
let visitorCount = 0;
let userLogs = []; // Array to hold user login history

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.post('/login', (req, res) => {
  const { username, securityPin } = req.body;

  // Check user credentials in the MySQL database
  db.query('SELECT * FROM users WHERE username = ? AND security_pin = ?', [username, securityPin], (err, results) => {
    if (err) {
      console.error(err);
      return res.send('Error checking credentials.');
    }

    if (results.length > 0) {
      const user = results[0];

      // Successful login
      req.session.user = { username: user.username, userId: user.id, device: req.headers['user-agent'] };
      visitorCount++; // Increment visitor count

      // Log the login data
      const loginTime = new Date();
      db.query('INSERT INTO user_logs (username, device_name, login_time) VALUES (?, ?, ?)', 
        [user.username, req.headers['user-agent'], loginTime], (err) => {
          if (err) {
            console.error('Error logging login data: ' + err);
          }
        });

      userLogs.push({ username: user.username, device_name: req.headers['user-agent'], login_time: loginTime });
      res.redirect('/main');
    } else {
      res.send('Invalid username or security pin');
    }
  });
});

app.get('/admin', (req, res) => {
  // Admin page now accessible without any login check
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/admin-data', (req, res) => {
  // Fetch user logs from the database
  db.query('SELECT * FROM user_logs', (err, results) => {
    if (err) {
      console.error('Error fetching user logs: ' + err);
      return res.status(500).send('Error fetching user logs');
    }
    res.json({ visitorCount, userLogs: results });
  });
});

// Server Setup
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
