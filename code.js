// Typing text animation for "Welcome to Aynaghor Studio"
const typingText = document.getElementById("typing-text");
const message = "Welcome to আয়না ঘর Studio";
let index = 0;

function typeWriter() {
  if (index < message.length) {
    typingText.innerHTML += message.charAt(index);
    index++;
    setTimeout(typeWriter, 250); // Adjust speed here
  }
}

typeWriter(); // Start typing animation when page loads

// Handle security code validation
const correctCode = "9@E8Sp"; // Example code

function checkCode() {
  const enteredCode = document.getElementById("security-code").value;
  if (enteredCode === correctCode) {
    alert("Code verified successfully!");
    // Redirect to another page (e.g., dashboard.html)
    window.location.href = "main.html";  // Redirect to a new page (same window)
    // Or open a new window/tab:
    // window.open("dashboard.html", "_blank");  // Open in a new tab
  } else {
    alert("Incorrect code. Please try again.");
  }
}
