const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to handle sessions
app.use(session({
    secret: '97TR4Q', // Change this to something more secure
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 } // Session will expire after 10 minutes of inactivity
}));

// Serve static files like HTML, CSS, etc.
app.use(express.static('public'));

// Middleware to protect routes and check for session
function checkSession(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login page if no session exists
    }
    next();
}

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
    const { username, password, 'security-code': securityCode } = req.body;

    // Validate the security code
    if (securityCode === '8OPQ9') {
        // Set session on successful login
        req.session.user = { username: username };

        // Redirect to main.html after successful login
        res.redirect('/main.html');
    } else {
        res.send('Invalid security code. Please try again.');
    }
});

// Serve protected HTML files (like main.html, language-songs.html)
app.get('/main.html', checkSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'main.html')); // Serve the main.html file after login
});

app.get('/Bengali.html', checkSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'Bengali.html')); // Serve the language-songs.html file after login
});

// Add any additional HTML files here, making sure they are protected by the session check
app.get('/Bihari.html', checkSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'Bihari.html')); // Example of another page
});

app.get('/firstrice.html', checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, 'firstrice.html')); // Example of another page
});

app.get('/Muslim.html', checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, 'Muslim.html')); // Example of another page
});

app.get('/Pre wedding.html', checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, 'Pre wedding.html')); // Example of another page
});


// Middleware to handle session expiration (5 minutes idle)
app.use((req, res, next) => {
    if (req.session.user) {
        req.session.cookie.maxAge = 300000; // Reset session expiration on activity
    }
    next();
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send('Error logging out.');
        }
        res.redirect('/login'); // Redirect to login page after logout
    });
});

// Default route (optional to handle invalid paths)
app.get('*', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login'); // Redirect to login if no session exists
    } else {
        res.send('404 Not Found'); // Optional: Send 404 if route is not found
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
