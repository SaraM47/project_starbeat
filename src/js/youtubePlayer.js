/**
 * Global variable for the YouTube Player instance.
 * @type {YT.Player | null}
 */
let playerReadyResolve;
const playerReady = new Promise(resolve => {
    playerReadyResolve = resolve;
});

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
        videoId: "",
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
        },
        events: {
            onReady: () => {
                console.log("YouTube Player is ready");
                playerReadyResolve(); 
            }
        }
    });
};

/**
 * Loads and plays a specific YouTube video in the existing player.
 * 
 * @param {string} videoId - The unique ID of the YouTube video to play.
 * @example
 * playYouTubeVideo("2Ek3WMM7I-0"); // Plays Ariana Grande - Break Free
 */

async function playYouTubeVideo(videoId) {
    await playerReady; 
    if (player && typeof player.loadVideoById === "function") {
        console.log("Playing video:", videoId);
        player.loadVideoById(videoId);
    } else {
        console.error(" Player is still not valid after ready");
    }
}

function getYouTubePlayer() {
    return player;
}

window.playYouTubeVideo = playYouTubeVideo;
window.getYouTubePlayer = getYouTubePlayer;