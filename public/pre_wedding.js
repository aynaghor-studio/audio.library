
// Category Function //
function filterGenre(category) {
    const sections = document.querySelectorAll('.song-section');
    sections.forEach(section => {
        if (category === 'all' || section.id === category) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

function filterLanguage(language) {
    const cards = document.querySelectorAll('.song-card');
    cards.forEach(card => {
        if (language === 'all' || card.classList.contains(language)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
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