/**
 * Runs when the DOM is fully loaded and updates the favorites page.
 */
document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesPage();
});

/**
 * Updates and displays the favorites list on the page.
 * Retrieves favorites from local storage and dynamically populates the UI.
 * 
 * @returns {void} This function does not return anything but updates the UI dynamically.
 * @example
 * // Call function to refresh the favorites section
 * updateFavoritesPage();
 */
function updateFavoritesPage() {
    const favoritesContainer = document.querySelector(".favorites-list");
    if (!favoritesContainer) {
        console.warn("No .favorites-list-sektion found. Interrupts...");
        return;
    }

    favoritesContainer.innerHTML = ""; 

    /**
     * @type {Array<Object>} favorites - List of favorite items stored in localStorage.
     * @property {string} favorites[].id - The unique identifier of the favorite item.
     * @property {string} favorites[].title - The title of the favorite item.
     * @property {string} favorites[].artist - The artist name associated with the favorite item.
     * @property {string} [favorites[].image] - The image URL of the favorite item (optional).
     */
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = "<p>No favorites have been added yet.</p>";
        return;
    }

    favorites.forEach(item => {
        const favoriteElement = document.createElement("div");
        favoriteElement.classList.add("favorite-item");

        favoriteElement.innerHTML = `
            <img src="${item.image || 'assets/default.jpg'}" alt="${item.title}">
            <div class="favorite-info">
            <h2 class="title">${item.title}</h2>
            <p class="artist">${item.artist}</p>
            </div>
            <button class="remove-favorite" data-id="${item.id}" aria-label="Remove ${item.title} from favorites">
            <i class="fas fa-heart-broken"></i>
            <span class="sr-only">Remove ${item.title} from favorites</span>
            </button>
            `;

        favoritesContainer.appendChild(favoriteElement);
    });

    // Event listener for removing favorites by remove buttons
    document.querySelectorAll(".remove-favorite").forEach(button => {
        button.addEventListener("click", (e) => {
            removeFromFavorites(e.currentTarget.dataset.id);
            updateFavoritesPage(); // Update the list after deletion - refresh the list after removal
        });
    });
}

/**
 * Removes a favorite item from local storage based on its ID.
 * 
 * @param {string} id - The unique ID of the item to be removed.
 * @returns {void} This function does not return anything but updates localStorage.
 */
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item.id !== id); // Filter out the removed item
    localStorage.setItem("favorites", JSON.stringify(favorites)); // Update local storage
}
