// Fetching images and text from Spotify API to Display Artists, Songs & Albums in HTML
async function displayTopArtists() {
    const artists = await window.getTopArtists();

    if (!artists || artists.length === 0) {
        console.error("Ingen artistdata hämtades!");
        document.querySelector(".artist-container").innerHTML = "<p>Ingen artistdata tillgänglig</p>";
        return;
    }

    const artistContainer = document.querySelector(".artist-container");
    artistContainer.innerHTML = "";

    artists.forEach(artist => {
        const artistCard = document.createElement("article");
        artistCard.classList.add("artist-card");

        const artistImg = document.createElement("img");
        artistImg.src = artist.images[0]?.url || "assets/default.jpg";
        artistImg.alt = artist.name;

        const artistName = document.createElement("p");
        artistName.textContent = artist.name;

        artistCard.appendChild(artistImg);
        artistCard.appendChild(artistName);
        artistContainer.appendChild(artistCard);
    });
}

async function displayAlbums() {
    const albums = await window.getNewReleases();
    const albumWrapper = document.querySelector(".album-wrapper");

    albumWrapper.innerHTML = ""; 

    // Limit to viewing 10 albums
    albums.slice(0, 10).forEach((album, index) => {
        const albumCard = document.createElement("div");
        albumCard.classList.add("album-card");

        const albumImg = document.createElement("img");
        albumImg.src = album.images[0]?.url || "assets/default.jpg";
        albumImg.alt = album.name;

        const albumTitle = document.createElement("p");
        albumTitle.textContent = album.name;

        albumCard.appendChild(albumImg);
        albumCard.appendChild(albumTitle);
        albumWrapper.appendChild(albumCard);
    });
}

async function displaySpecificTracks() {
    const tracks = await getSpecificTracks(); 

    const trackContainer = document.querySelector(".song-container");
    trackContainer.innerHTML = "";

    if (!tracks.length) {
        trackContainer.innerHTML = "<p>Ingen låtdata tillgänglig</p>";
        return;
    }

    tracks.forEach(track => {
        if (!track) return;

        const trackElement = document.createElement("div");
        trackElement.classList.add("song-card");

        // Get the album image, falling back to default if missing
        const imageUrl = track.album?.images[0]?.url || "assets/default.jpg";

        trackElement.innerHTML = `
            <img src="${imageUrl}" alt="${track.name}">
            <p><strong>${track.name}</strong> - ${track.artists.map(artist => artist.name).join(", ")}</p>
        `;

        trackContainer.appendChild(trackElement);
    });
}

// Run the functions when the page loads
window.onload = () => {
    displayTopArtists();
    displayAlbums();
    displaySpecificTracks();
};
