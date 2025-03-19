/**
 * Music Player Module
 * Handles the YouTube music player inside the popup, allowing play, pause, and looping functionality.
 */
let player;
let isPlaying = false;
let progressBar = document.getElementById("progress-bar");
let currentTimeDisplay = document.createElement("span");
let durationDisplay = document.createElement("span");

// Add time digits before and after the progress bar
progressBar.parentNode.insertBefore(currentTimeDisplay, progressBar);
progressBar.parentNode.appendChild(durationDisplay);

document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-player");
    const popup = document.getElementById("music-popup");
    const closeBtn = document.querySelector(".close-btn");
    const playBtn = document.querySelector(".play-btn");

    /**
     * Opens the music player popup and initializes YouTube player if not already loaded.
     */
    openBtn.addEventListener("click", () => {
        popup.style.display = "flex";
        if (!player) loadYouTubePlayer();
    });

     /**
     * Closes the music player popup and pauses video playback.
     */
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        if (player) player.pauseVideo();
    });

    /**
     * Toggles play/pause for the YouTube video when clicking the play button.
     *
     * @param {Event} event - The click event triggered when the play button is clicked.
     */
    playBtn.addEventListener("click", () => {
        if (isPlaying) {
            player.pauseVideo();
            playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
        } else {
            player.playVideo();
            playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
        }
        isPlaying = !isPlaying;
    });

    /**
     * Seeks the video to the selected time within the allowed range (0:35 - 1:12).
     *
     * @param {Event} event - The input event from the progress bar.
     */
    progressBar.addEventListener("input", () => {
        if (player) {
            const seekTime = (progressBar.value / 100) * (73 - 38) + 38; // Keep it within 0:35 - 1:12
            player.seekTo(seekTime, true);
        }
    });
});

/**
 * Initializes the YouTube IFrame API Player when the API is ready.
 */
function onYouTubeIframeAPIReady() {
    if (!document.getElementById("youtube-player")) {
        console.error("YouTube player element not found!");
        return;
    }

    player = new YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId: "2Ek3WMM7I-0", // Ariana Grande - Break Free (Audio version)
        playerVars: {
            autoplay: 0,
            controls: 0,
            start: 38, // Start at 0:35
            end: 73, // End at 1:12
            modestbranding: 1
        },
         /**
         * Event listener for player state changes.
         *
         * @param {Object} event - The event object from the YouTube API.
         * @param {number} event.data - The current state of the player.
         */
        events: {
            onStateChange: function (event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    checkLoop();
                    updateProgressBar();
                }
            }
        }
    });
}

/**
 * Ensures the video loops between 0:35 - 1:12 by checking the current time every second.
 */
function checkLoop() {
    setInterval(() => {
        if (player && player.getCurrentTime() >= 73) {
            player.seekTo(38, true); // Jump back to 0:35
        }
    }, 1000); // Checks every second
}

/**
 * Updates the progress bar and time display while the video is playing.
 */
function updateProgressBar() {
    setInterval(() => {
        if (player && player.getDuration) {
            const currentTime = player.getCurrentTime();
            const duration = 73 - 38; // Only the clip 0:49 - 1:12

            progressBar.value = ((currentTime - 38) / duration) * 100; // Calculate the correct percentage

            // Formatera tid (mm:ss)
            currentTimeDisplay.innerText = formatTime(currentTime - 38); // Show time from 0:00
            durationDisplay.innerText = formatTime(duration); // Show total time as 0:35
        }
    }, 1000);
}

/**
 * Formats time in mm:ss format.
 *
 * @param {number} seconds - Time in seconds.
 * @returns {string} Formatted time in mm:ss format.
 */
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

/**
 * Loads the YouTube player if it's not already initialized.
 */
function loadYouTubePlayer() {
    if (!player) {
        onYouTubeIframeAPIReady();
    }
}
