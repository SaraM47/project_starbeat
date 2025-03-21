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
document.addEventListener("DOMContentLoaded", () => {
    function initYouTubeSection() {
        const youtubeSection = document.createElement("section");
        youtubeSection.classList.add("youtube-player-section");
        youtubeSection.innerHTML = `
            <h2>Listen to their songs</h2>
            <div id="youtube-player"></div>
            <div class="player-controls">
            <button id="play-btn"><i class="fas fa-play"></i> Play</button>
            <button id="pause-btn"><i class="fas fa-pause"></i> Pause</button>
            <button id="stop-btn"><i class="fas fa-stop"></i> Stop</button>
            </div>
        `;

        const artistSection = document.querySelector(".top-artists");
        if (artistSection) {
            artistSection.insertAdjacentElement("afterend", youtubeSection);
        }

        /**
        * Song list with YouTube Video IDs.
        * @type {Array<Object>}
        */    
        const songs = [
            { title: "Forever", artist: "Chris Brown", videoId: "5sMKX22BHeE" },
            { title: "In Da Club", artist: "50 Cent", videoId: "5qm8PH4xAss" },
            { title: "Beauty and a Beat", artist: "Justin Bieber", videoId: "Lf9OgcXV5cE" },
            { title: "Hips Don’t Lie", artist: "Shakira", videoId: "DUT5rEU6pqM" },
            { title: "24K Magic", artist: "Bruno Mars", videoId: "UqyT8IEBkvY" },
            { title: "Shape of You", artist: "Ed Sheeran", videoId: "_dK2tDK9grQ" },
            { title: "Permission to Dance", artist: "BTS", videoId: "LCpjdohpuEE" },
            { title: "One Kiss", artist: "Calvin Harris, Dua Lipa", videoId: "Bm8rz-llMhE" }
        ];

        const songList = document.createElement("div");
        songList.classList.add("song-list");

        songs.forEach(song => {
            const songItem = document.createElement("div");
            songItem.classList.add("song-item");
            songItem.innerHTML = `
                <p><strong>${song.title}</strong> - ${song.artist}</p>
                <button class="play-song" data-video-id="${song.videoId}">
                    <i class="fas fa-play"></i> Play
                </button>
            `;
            songList.appendChild(songItem);
        });

        youtubeSection.appendChild(songList);

        document.addEventListener("click", (event) => {
            if (event.target.closest(".play-song")) {
                const videoId = event.target.closest(".play-song").dataset.videoId;
                window.playYouTubeVideo(videoId);
            }
        });

        const playBtn = document.getElementById("play-btn");
        const pauseBtn = document.getElementById("pause-btn");
        const stopBtn = document.getElementById("stop-btn");

        playBtn?.addEventListener("click", () => {
            const yt = window.getYouTubePlayer();
            yt?.playVideo();
        });

        pauseBtn?.addEventListener("click", () => {
            const yt = window.getYouTubePlayer();
            yt?.pauseVideo();
        });

        stopBtn?.addEventListener("click", () => {
            const yt = window.getYouTubePlayer();
            yt?.stopVideo();
        });
    }

    // Wait for iframe API to load and init UI
    setTimeout(() => {
        if (typeof YT !== "undefined" && typeof YT.Player !== "undefined") {
            initYouTubeSection();
        } else {
            console.warn("Waiting for YouTube IFrame API...");
            setTimeout(() => location.reload(), 1000); // This is a fallback: reload once
        }
    }, 300); // Small delay to ensure DOM and YouTube API loaded
});
