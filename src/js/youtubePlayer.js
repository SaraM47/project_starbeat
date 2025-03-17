let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtube-player", {
        height: "360",
        width: "640",
        videoId: "", // No video is loaded initially
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
        }
    });
}

function playYouTubeVideo(videoId) {
    if (player) {
        player.loadVideoById(videoId); // Play the video in the existing player
    } else {
        console.error("YouTube player is not ready.");
    }
}
