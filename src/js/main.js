import "./cursor.js";

/**
 * Checks if the current page is the home page by looking for the `.loading-screen` element.
 * If found, it initializes the loading screen effect and fetches data for artists, albums, and songs.
 */
if (document.querySelector(".loading-screen")) {
    /**
     * Displays a loading screen for 2 seconds before showing the main content.
     * This is only applied on the home page.
     *
     * @event load - Triggered when the page finishes loading.
     */
    window.addEventListener("load", () => {
        setTimeout(() => {
            const loadingScreen = document.querySelector(".loading-screen");
            const mainContent = document.querySelector(".main-content");

            if (loadingScreen && mainContent) {
                loadingScreen.style.display = "none";
                mainContent.style.display = "block";
            }
        }, 2000);
    });

     /**
     * Fetches and displays a list of top artists on the home page.
     * If the artist section does not exist, a warning is logged.
     * If no artist data is available, a fallback message is displayed.
     *
     * @async
     * @function displayTopArtists
     * @returns {Promise<void>} - Updates the artist container with artist cards.
     */
    async function displayTopArtists() {
        const artistContainer = document.querySelector(".artist-container");
        if (!artistContainer) {
            console.warn("Artist-sektionen saknas.");
            return;
        }

        const artists = await window.getTopArtists();
        if (!artists || artists.length === 0) {
            artistContainer.innerHTML = "<p>No artist data available</p>";
            return;
        }

        artistContainer.innerHTML = "";
        artists.forEach(artist => {
            const artistCard = document.createElement("article");
            artistCard.classList.add("artist-card");
            artistCard.innerHTML = `
                <img src="${artist.images[0]?.url || "assets/default.jpg"}" alt="${artist.name}">
                <p>${artist.name}</p>
            `;
            artistContainer.appendChild(artistCard);
        });
    }

    /**
     * Fetches and displays a list of new album releases on the home page.
     * If the album section does not exist, a warning is logged.
     *
     * @async
     * @function displayAlbums
     * @returns {Promise<void>} - Updates the album wrapper with album cards.
     */
    async function displayAlbums() {
        const albumWrapper = document.querySelector(".album-wrapper");
        if (!albumWrapper) {
            console.warn("Album-sektionen saknas.");
            return;
        }

        const albums = await window.getNewReleases();
        albumWrapper.innerHTML = "";

        albums.slice(0, 10).forEach(album => {
            const albumCard = document.createElement("div");
            albumCard.classList.add("album-card");
            albumCard.innerHTML = `
                <img src="${album.images[0]?.url || "assets/default.jpg"}" alt="${album.name}">
                <h3>${album.name}</h3>
            `;
            albumWrapper.appendChild(albumCard);
        });
    }

       /**
     * Fetches and displays a list of specific tracks on the home page.
     * If the track section does not exist, a warning is logged.
     *
     * @async
     * @function displaySpecificTracks
     * @returns {Promise<void>} - Updates the track container with track cards.
     */
    async function displaySpecificTracks() {
        const trackContainer = document.querySelector(".song-container");
        if (!trackContainer) {
            console.warn("Track-sektionen saknas.");
            return;
        }

        const tracks = await getSpecificTracks();
        trackContainer.innerHTML = "";

        tracks.forEach(track => {
            if (!track) return;

            const trackElement = document.createElement("div");
            trackElement.classList.add("song-card");
            trackElement.innerHTML = `
                <img src="${track.album?.images[0]?.url || "assets/default.jpg"}" alt="${track.name}">
                <p><strong>${track.name}</strong> - ${track.artists.map(artist => artist.name).join(", ")}</p>
            `;
            trackContainer.appendChild(trackElement);
        });
    }

    // Run the functions only on the home page
    displayTopArtists();
    displayAlbums();
    displaySpecificTracks();
}
