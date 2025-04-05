import gifForever from "../css/assets/images/milk-mocha-bear-dance.gif";
import gifInDaClub from "../css/assets/images/giphy.gif";
import gifBeautyBeat from "../css/assets/images/music.gif";
import gifHips from "../css/assets/images/muddu-dance.gif";
import gif24k from "../css/assets/images/bugcat-capoo.gif";
import gifShapeOfYou from "../css/assets/images/cute-music.gif";
import gifBTS from "../css/assets/images/bt21-cute.gif";
import gifOneKiss from "../css/assets/images/little-bad-bear-dancing-listening.gif";

const songs = [
    { title: "Forever", artist: "Chris Brown", videoId: "5sMKX22BHeE", gif: gifForever },
    { title: "In Da Club", artist: "50 Cent", videoId: "5qm8PH4xAss", gif: gifInDaClub },
    { title: "Beauty and a Beat", artist: "Justin Bieber", videoId: "Lf9OgcXV5cE", gif: gifBeautyBeat },
    { title: "Hips Don’t Lie", artist: "Shakira", videoId: "DUT5rEU6pqM", gif: gifHips },
    { title: "24K Magic", artist: "Bruno Mars", videoId: "UqyT8IEBkvY", gif: gif24k },
    { title: "Shape of You", artist: "Ed Sheeran", videoId: "_dK2tDK9grQ", gif: gifShapeOfYou },
    { title: "Permission to Dance", artist: "BTS", videoId: "LCpjdohpuEE", gif: gifBTS },
    { title: "One Kiss", artist: "Calvin Harris, Dua Lipa", videoId: "Bm8rz-llMhE", gif: gifOneKiss },
];

/**
 * Handles fetching and rendering content for the Explore page.
 * It loads trending tracks, artists, genres, and integrates a YouTube player.
 * This function is executed when the DOM has fully loaded.
 * @async
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", async () => {
    const trendingContainer = document.querySelector(".trending-grid");
    const artistContainer = document.querySelector(".artist-grid");
    const genreContainer = document.querySelector(".genre-scroll");

    /**
     * Fetch and render trending songs.
     * @type {Array<Object>}
     */
    const trendingTracks = await window.getTrendingTracks();
    trendingTracks.forEach(track => {
        const trackElement = document.createElement("div");
        trackElement.classList.add("trending-item");
        trackElement.innerHTML = `
            <figure class="trending-content">
                <img src="${track.images[0]?.url || 'assets/default.jpg'}" alt="">
                <figcaption>${track.name}</figcaption>
            </figure>
            <button class="play-button" data-url="${track.external_urls.spotify}" aria-label="Play ${track.name} on Spotify">
                <i class="fas fa-play"></i>
            </button>
        `;
        trendingContainer.appendChild(trackElement);
    });

    /**
     * Fetch and render artists in the Explore section.
     * @type {Array<Object>}
     */
    const exploreArtists = await window.getExploreArtists();
    exploreArtists.forEach(artist => {
        const artistElement = document.createElement("div");
        artistElement.classList.add("artist-item");
        artistElement.innerHTML = `
            <figure class="artist-content">
                <img src="${artist.images[0]?.url || 'assets/default.jpg'}" alt="">
                <figcaption>${artist.name}</figcaption>
            </figure>
        `;
        artistElement.addEventListener("click", () => {
            window.open(`https://open.spotify.com/artist/${artist.id}`, "_blank");
        });
        artistContainer.appendChild(artistElement);
    });

    /**
     * Fetch and render music genres.
     * @type {Array<Object>}
     */
    const genres = await window.getGenres();
    genres.forEach(genre => {
        const genreElement = document.createElement("div");
        genreElement.classList.add("genre-item");
        genreElement.innerHTML = `
        <figure class="genre-item">
            <img src="${genre.icons[0]?.url || 'assets/default.jpg'}" alt="">
            <figcaption>${genre.name}</figcaption>
        </figure>
        `;
        genreContainer.appendChild(genreElement);
    });

    // Listen to songs
    document.querySelectorAll(".play-button").forEach(button => {
        button.addEventListener("click", () => {
            window.open(button.dataset.url, "_blank");
        });
    });
});

/**
 * Initializes the YouTube player section and adds song list functionality.
 * @returns {void}
 */
window.player = null;

document.addEventListener("DOMContentLoaded", () => {
    let pendingVideoId = null;

    function initYouTubeSection() {
        console.log("YT API loaded");

        const youtubeSection = document.createElement("section");
        youtubeSection.classList.add("youtube-player-section");
        youtubeSection.innerHTML = `
            <h2>Listen to their songs</h2>
            <div id="youtube-player" style="width: 0; height: 0; overflow: hidden;"></div>
        `;

        const artistSection = document.querySelector(".top-artists");
        if (artistSection) {
            artistSection.insertAdjacentElement("afterend", youtubeSection);
        }

        const songList = document.createElement("div");
        songList.classList.add("song-list");

        songs.forEach((song, index) => {
            const songItem = document.createElement("div");
            songItem.classList.add("song-item");
            songItem.innerHTML = `
                <p><strong>${song.title}</strong> - ${song.artist}</p>
                <button class="play-song" data-index="${index}" data-video-id="${song.videoId}">
                    <i class="fas fa-play"></i> Play
                </button>
            `;
            songList.appendChild(songItem);
        });

        youtubeSection.appendChild(songList);

        function createYouTubePlayer(videoId) {
            if (window.player) {
                window.player.loadVideoById(videoId);
                window.player.playVideo();
            } else {
                pendingVideoId = videoId;

                window.player = new YT.Player("youtube-player", {
                    height: "0",
                    width: "0",
                    videoId: videoId,
                    playerVars: { autoplay: 0, controls: 0 },
                    events: {
                        onReady: (event) => {
                            console.log("Player is ready");
                            if (pendingVideoId) {
                                event.target.loadVideoById(pendingVideoId);
                                event.target.playVideo();
                                pendingVideoId = null;
                            }
                        }
                    },
                });
            }
        }

        function playYouTubeVideo(videoId) {
            createYouTubePlayer(videoId);
        }

        window.playYouTubeVideo = playYouTubeVideo;

        document.addEventListener("click", (event) => {
            const playButton = event.target.closest(".play-song");
            if (playButton) {
                const songIndex = playButton.dataset.index;
                const song = songs[songIndex];

                if (song) {
                    console.log("Playing song:", song.title);

                    document.getElementById("song-title").textContent = song.title;
                    document.getElementById("artist-name").textContent = song.artist;
                    document.getElementById("song-gif").src = song.gif || "css/assets/images/default.gif";

                    const popup = document.getElementById("music-popup");
                    if (popup) {
                        popup.style.display = "flex";
                    } else {
                        console.error("Popup-rutan hittades inte!");
                    }

                    // Play the video after player is ready
                    playYouTubeVideo(song.videoId);
                }
            }
        });

        const playBtn = document.getElementById("play-btn");
        const pauseBtn = document.getElementById("pause-btn");
        const stopBtn = document.getElementById("stop-btn");

        playBtn?.addEventListener("click", () => {
            if (window.player) window.player.playVideo();
        });

        pauseBtn?.addEventListener("click", () => {
            if (window.player) window.player.pauseVideo();
        });

        stopBtn?.addEventListener("click", () => {
            if (window.player) window.player.stopVideo();
        });
    }

    let attempts = 0;
    const checkYouTubeAPI = () => {
        if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") {
            initYouTubeSection();
        } else if (attempts < 5) {
            console.warn("Waiting for YouTube IFrame API...");
            attempts++;
            setTimeout(checkYouTubeAPI, 1000);
        } else {
            console.error("YouTube API failed to load.");
        }
    };

    setTimeout(checkYouTubeAPI, 300);
});

// Close popup when user clicks close button
document.addEventListener("click", (event) => {
    const closeButton = event.target.closest(".close-btn");
    if (closeButton) {
        const popup = document.getElementById("music-popup");
        if (popup) {
            popup.style.display = "none";

            if (window.player) {
                window.player.stopVideo();
            }
        } else {
            console.error("Popup-rutan kunde inte hittas!");
        }
    }
});

// Toggle play/pause on click
document.addEventListener("DOMContentLoaded", () => {
    const playPauseButton = document.querySelector(".controls .play-btn");

    if (playPauseButton) {
        playPauseButton.addEventListener("click", () => {
            if (window.player) {
                const playerState = window.player.getPlayerState();

                if (playerState === 1) {
                    window.player.pauseVideo();
                    playPauseButton.classList.remove("fa-pause");
                    playPauseButton.classList.add("fa-play");
                } else {
                    window.player.playVideo();
                    playPauseButton.classList.remove("fa-play");
                    playPauseButton.classList.add("fa-pause");
                }
            } else {
                console.error("YouTube player is not initialized.");
            }
        });
    } else {
        console.error("Could not find .play-button in .controls");
    }
});
