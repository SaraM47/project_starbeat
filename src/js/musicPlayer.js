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

    // Open popup and start YouTube player if it is not already there
    openBtn.addEventListener("click", () => {
        popup.style.display = "flex";
        if (!player) loadYouTubePlayer();
    });

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        if (player) player.pauseVideo();
    });

    // Player controls
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

    progressBar.addEventListener("input", () => {
        if (player) {
            const seekTime = (progressBar.value / 100) * (73 - 49) + 49; // Keep it within 0:49 - 1:12
            player.seekTo(seekTime, true);
        }
    });
});

// YouTube API Setup
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
            start: 49, // Start at 0:49
            end: 73, // End at 1:12
            modestbranding: 1
        },
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

// Loop function to force YouTube to stay between 0:49 - 1:12
function checkLoop() {
    setInterval(() => {
        if (player && player.getCurrentTime() >= 73) {
            player.seekTo(49, true); // Jump back to 0:49
        }
    }, 1000); // Checks every second
}

// Update progress bar & time
function updateProgressBar() {
    setInterval(() => {
        if (player && player.getDuration) {
            const currentTime = player.getCurrentTime();
            const duration = 73 - 49; // Only the clip 0:49 - 1:12

            progressBar.value = ((currentTime - 49) / duration) * 100; // Calculate the correct percentage

            // Formatera tid (mm:ss)
            currentTimeDisplay.innerText = formatTime(currentTime - 49); // Show time from 0:00
            durationDisplay.innerText = formatTime(duration); // Show total time as 0:23
        }
    }, 1000);
}

// Format time to mm:ss
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

// Load the YouTube player if needed
function loadYouTubePlayer() {
    if (!player) {
        onYouTubeIframeAPIReady();
    }
}
