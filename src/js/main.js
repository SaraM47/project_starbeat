import "./cursor.js";

// Check if we are on the home page by looking for ".loading-screen"
if (document.querySelector(".loading-screen")) {
    // Loading screen is displayed for 2 seconds until the page is loaded, then the main content is displayed - only on the home page
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

    // Function to display artists
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

    // Function to display albums
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

    // Function to display specific songs
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
