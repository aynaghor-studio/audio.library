function filterContent(category) {
    const items = document.querySelectorAll('.filter-item');
    
    items.forEach(item => {
      if (category === 'all' || item.classList.contains(category)) {
        item.style.display = 'block'; // Show matching items
      } else {
        item.style.display = 'none'; // Hide non-matching items
      }
    });
  }



// Function to pause all audio elements except the one passed
function pauseOtherAudios(currentAudio) {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        if (audio !== currentAudio) {
            audio.pause();  // Pause other audios
            audio.currentTime = 0;  // Reset their playback
        }
    });
}

// Add event listeners to all audio elements to pause others when one is played
const audios = document.querySelectorAll('audio');
audios.forEach(audio => {
    audio.addEventListener('play', function() {
        pauseOtherAudios(audio);  // Pause others when this one plays
    });
});

// loader //
// Wait for the window to load, then hide the loader and show the content
window.onload = function () {
  setTimeout(function () {
      // Hide the loader and reveal the content
      document.getElementById("loader").style.opacity = "0";
      document.getElementById("loader").style.pointerEvents = "none"; // Disable interactions
  }, 5000); // Hide loader after 5 seconds
};

// Scroll to top buttom //
// Get the button
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Show the button when the user scrolls down 200px from the top
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to top function when button is clicked
scrollToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

