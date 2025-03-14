document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchButton = document.querySelector(".search-wrapper button");

    // Check if query is in URL (when searching on search.html)
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    if (query) {
        searchInput.value = query; 
        searchSpotify(query).then(displaySearchResults);
    }

    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            console.warn("Sökningen är tom.");
            return;
        }
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }

    // Event listener for click on the search button
    searchButton.addEventListener("click", performSearch);

    // Event listener for the "Enter" button
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents the form from being submitted if it is in a <form>
            performSearch();
        }
    });
});

async function searchSpotify(query) {
    const token = await window.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track,artist,album&limit=10`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    return response.json();
}

// Show search results in search.html
function displaySearchResults(data) {
    const resultsContainer = document.querySelector(".search-results");
    if (!resultsContainer) {
        console.warn("Ingen .search-results-sektion hittades. Avbryter...");
        return;
    }

    resultsContainer.innerHTML = ""; // Clear previous search results

    if (!data || (!data.tracks.items.length && !data.albums.items.length && !data.artists.items.length)) {
        resultsContainer.innerHTML = "<p>Inga resultat hittades.</p>";
        return;
    }

    // Show ARTISTS (Up to 10)
    if (data.artists.items.length > 0) {
        data.artists.items.slice(0, 10).forEach(artist => {
            const artistElement = document.createElement("div");
            artistElement.classList.add("search-item");
            artistElement.innerHTML = `
                <img src="${artist.images[0]?.url || 'assets/default.jpg'}" alt="${artist.name}">
                <p>${artist.name}</p>
            `;
            resultsContainer.appendChild(artistElement);
        });
    }

    // Show ALBUM (Up to 10)
    if (data.albums.items.length > 0) {
        data.albums.items.slice(0, 10).forEach(album => {
            const albumElement = document.createElement("div");
            albumElement.classList.add("search-item");
            albumElement.innerHTML = `
                <img src="${album.images[0]?.url || 'assets/default.jpg'}" alt="${album.name}">
                <p>${album.name}</p>
            `;
            resultsContainer.appendChild(albumElement);
        });
    }

    // Show SONGS with "Listen on Spotify" link
    if (data.tracks.items.length > 0) {
        data.tracks.items.forEach(track => {
            const trackElement = document.createElement("div");
            trackElement.classList.add("search-item");
            trackElement.innerHTML = `
                <img src="${track.album.images[0]?.url || 'assets/default.jpg'}" alt="${track.name}">
                <p><strong>${track.name}</strong> - ${track.artists.map(artist => artist.name).join(", ")}</p>
                <a href="${track.external_urls.spotify}" target="_blank">Lyssna på Spotify</a>
            `;
            resultsContainer.appendChild(trackElement);
        });
    }
}