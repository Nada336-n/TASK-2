// script.js
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progress = document.getElementById('progress');
    const playlistItems = document.querySelectorAll('.playlist-item');
    const trackName = document.querySelector('.track-name');
    const trackArtist = document.querySelector('.track-artist');

    let currentIndex = 0;
    const playlist = Array.from(playlistItems);

    function loadTrack(index) {
        const track = playlist[index];
        if (track) {
            audio.src = track.getAttribute('data-src');
            trackName.textContent = track.textContent; // Display track name
            // Update artist name if needed
            audio.play();
        }
    }

    playButton.addEventListener('click', () => {
        audio.play();
    });

    pauseButton.addEventListener('click', () => {
        audio.pause();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : playlist.length - 1;
        loadTrack(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < playlist.length - 1) ? currentIndex + 1 : 0;
        loadTrack(currentIndex);
    });

    audio.addEventListener('timeupdate', () => {
        const value = (audio.currentTime / audio.duration) * 100;
        progress.value = value;
    });

    progress.addEventListener('input', () => {
        const value = progress.value / 100 * audio.duration;
        audio.currentTime = value;
    });

    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            loadTrack(currentIndex);
        });
    });

    // Load the first track initially
    loadTrack(currentIndex);
});
