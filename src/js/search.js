document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
const searchButton = document.querySelector(".search-wrapper button");

if (searchInput && searchButton) {
    searchButton.addEventListener("click", () => performSearch(searchInput.value.trim()));
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });
} else {
    console.warn("searchInput eller searchButton hittades inte. Kontrollera HTML-strukturen.");
}

    // Declare the new elements for mobile search
     const mobileSearchInput = document.getElementById("mobile-search");
     const mobileSearchButton = document.querySelector(".mobile-search-container button");

    // Check if query is in URL (when searching on search.html)
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");

    if (query) {
        if (searchInput) searchInput.value = query;
        if (mobileSearchInput) mobileSearchInput.value = query;
        searchSpotify(query).then(displaySearchResults);
    }

    function performSearch() {
        const desktopQuery = searchInput ? searchInput.value.trim() : "";
        const mobileQuery = mobileSearchInput ? mobileSearchInput.value.trim() : "";
        
        // Choose the right query based on the input used
        const query = desktopQuery || mobileQuery;
    
        if (!query) {
            console.warn("Sökningen är tom.");
            return;
        }
    
        // Update URL to update search results
        const newUrl = `search.html?q=${encodeURIComponent(query)}`;
        
        // If the user is already on search.html, just refresh the results instead of reloading
        if (window.location.pathname.includes("search.html")) {
            history.pushState(null, "", newUrl); // Updates URL without reloading
            searchSpotify(query).then(displaySearchResults); // Retrieves new results
        } else {
            window.location.href = newUrl;
        }
    }
    
       // Desktop search bar event
        if (searchInput && searchButton) {
        searchButton.addEventListener("click", performSearch);
        searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });
    }

        // Mobile search bar event
        if (mobileSearchInput && mobileSearchButton) {
        mobileSearchButton.addEventListener("click", performSearch);
        mobileSearchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    });
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

// Function for managing favorites
function toggleFavorite(item, button) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const index = favorites.findIndex(fav => fav.id === item.id);
    let icon = button.querySelector("i");

    if (index === -1) {
        // Add to favorites
        favorites.push(item);
        icon.classList.remove("fa-regular");
        icon.classList.add("fas");
        console.log(`Lagt till i favoriter: ${item.title}`);
    } else {
        // Add to favorites
        favorites.splice(index, 1);
        icon.classList.remove("fas");
        icon.classList.add("fa-regular");
        console.log(`Tog bort från favoriter: ${item.title}`);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Function to create favorite button
function createFavoriteButton(item) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let isFavorited = favorites.some(fav => fav.id === item.id);

    return `<button class="favorite-btn" data-id="${item.id}" data-title="${item.name}" 
            data-artist="${item.artists ? item.artists.map(a => a.name).join(", ") : ''}" 
            data-image="${item.images ? item.images[0]?.url : item.album?.images[0]?.url || 'assets/default.jpg'}"
            aria-label="${isFavorited ? 'Remove from favorites' : 'Add to favorites'}">
                <i class="${isFavorited ? 'fas' : 'fa-regular'} fa-heart"></i>
                <span class="sr-only">${isFavorited ? 'Remove from favorites' : 'Add to favorites'}</span>
            </button>`;
}

// Function to display search results
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

    // Show artist (up to 10)
    if (data.artists.items.length > 0) {
        data.artists.items.slice(0, 10).forEach(artist => {
            const artistElement = document.createElement("div");
            artistElement.classList.add("search-item");
            artistElement.innerHTML = `
            <img src="${artist.images[0]?.url || 'assets/default.jpg'}" alt="Artist: ${artist.name}">
            <p>${artist.name}</p>
                ${createFavoriteButton(artist)}
            `;
            resultsContainer.appendChild(artistElement);
        });
    }

    // Show album (up to 10)
    if (data.albums.items.length > 0) {
        data.albums.items.slice(0, 10).forEach(album => {
            const albumElement = document.createElement("div");
            albumElement.classList.add("search-item");
            albumElement.innerHTML = `
            <img src="${album.images[0]?.url || 'assets/default.jpg'}" alt="Album: ${album.name} by ${album.artists.map(a => a.name).join(", ")}">
            <p>${album.name}</p>
                ${createFavoriteButton(album)}
            `;
            resultsContainer.appendChild(albumElement);
        });
    }

    // Show tracks (up to 10)
    if (data.tracks.items.length > 0) {
        data.tracks.items.forEach(track => {
            const trackElement = document.createElement("div");
            trackElement.classList.add("search-item");
            trackElement.innerHTML = `
            <img src="${track.album.images[0]?.url || 'assets/default.jpg'}" alt="Track: ${track.name} by ${track.artists.map(a => a.name).join(", ")}">
            <p><strong>${track.name}</strong> - ${track.artists.map(artist => artist.name).join(", ")}</p>
                <a href="${track.external_urls.spotify}" target="_blank">Lyssna på Spotify</a>
                ${createFavoriteButton(track)}
            `;
            resultsContainer.appendChild(trackElement);
        });
    }

    // Event listener for saving favorites
    document.querySelectorAll(".favorite-btn").forEach(button => {
        const item = {
            id: button.dataset.id,
            title: button.dataset.title,
            artist: button.dataset.artist,
            image: button.dataset.image
        };

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (favorites.some(fav => fav.id === item.id)) {
            button.querySelector("i").classList.add("fas");
            button.querySelector("i").classList.remove("fa-regular");
        }

        button.addEventListener("click", (e) => {
            toggleFavorite(item, e.currentTarget);
        });
    });
}