/**
 * Global variable for the YouTube Player instance.
 * @type {YT.Player | null}
 */
let player;

/**
 * Initializes the YouTube IFrame API and creates the player.
 * This function is called automatically by the YouTube API.
 */
window.onYouTubeIframeAPIReady = function () {
    const container = document.getElementById("youtube-player");
    if (!container) {
        console.warn("#youtube-player not found on this page");
        return;
    }

    player = new YT.Player(container, {
        height: "360",
        width: "640",
        videoId: "", // No video loaded initially
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
        },
        events: {
            onReady: () => {
                console.log("YouTube Player is ready");
                onPlayerReadyCallbacks.forEach(cb => cb());
                onPlayerReadyCallbacks = [];
            }
        }
    });
};


window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

/**
 * Loads and plays a specific YouTube video in the existing player.
 * 
 * @param {string} videoId - The unique ID of the YouTube video to play.
 * @example
 * playYouTubeVideo("2Ek3WMM7I-0"); // Plays Ariana Grande - Break Free
 */
function playYouTubeVideo(videoId) {
    if (player && typeof player.loadVideoById === "function") {
        console.log("▶️ Playing video:", videoId);
        player.loadVideoById(videoId);
    } else {
        console.warn("YouTube player not ready...");
        onPlayerReadyCallbacks.push(() => {
            console.log("(Delayed) Playing video:", videoId);
            player.loadVideoById(videoId);
        });
    }
}

// Function globally accessible for YouTube API
window.playYouTubeVideo = playYouTubeVideo;