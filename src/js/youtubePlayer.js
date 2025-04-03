/**
 * Global variable for the YouTube Player instance.
 * Initialized by the YouTube IFrame API when ready.
 * @type {YT.Player | null}
 */
let player;

/**
 * Promise that resolves when the YouTube player is ready.
 * Used to delay actions until the player is initialized.
 * @type {Promise<void>}
 */
let playerReadyResolve;
const playerReady = new Promise(resolve => {
    playerReadyResolve = resolve;
});

/**
 * Called automatically by the YouTube IFrame API once it's loaded.
 * Initializes the YouTube Player and resolves the `playerReady` Promise.
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

                // Call the explore.js function
                if (typeof initYouTubeSection === "function") {
                    initYouTubeSection();
                }
            }
        }
    });
};

/**
 * Loads and plays a specific YouTube video once the player is ready.
 *
 * @async
 * @function
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

/**
 * Returns the initialized YouTube player instance.
 *
 * @function
 * @returns {YT.Player | null} The YouTube player instance or null if not yet initialized.
 */
function getYouTubePlayer() {
    return player;
}

window.playYouTubeVideo = playYouTubeVideo;
window.getYouTubePlayer = getYouTubePlayer;