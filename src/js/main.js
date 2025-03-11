// Fetching images and text from Spotify API to Display Artists, Songs & Albums in HTML
async function displayTopArtists() {
    const artists = await getTopArtists();
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
    const albums = await getNewReleases();
    const albumContainer = document.querySelector(".album-container");

    albumContainer.innerHTML = ""; 

    albums.slice(0, 4).forEach(album => {
        const albumCard = document.createElement("article");
        albumCard.classList.add("album-card");

        const albumImg = document.createElement("img");
        albumImg.src = album.images[0]?.url || "assets/default.jpg"; // If no image exists, using a default image.
        albumImg.alt = album.name;

        const albumTitle = document.createElement("p");
        albumTitle.textContent = album.name;

        albumCard.appendChild(albumImg);
        albumCard.appendChild(albumTitle);
        albumContainer.appendChild(albumCard);
    });
}

// Run the functions when the page loads
window.onload = () => {
    displayTopArtists();
    displayAlbums();
};
