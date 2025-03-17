document.addEventListener("DOMContentLoaded", () => {
    updateFavoritesPage();
});

// Function to update and display favorites
function updateFavoritesPage() {
    const favoritesContainer = document.querySelector(".favorites-list");
    if (!favoritesContainer) {
        console.warn("No .favorites-list-sektion found. Interrupts...");
        return;
    }

    favoritesContainer.innerHTML = ""; 

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

    // Event listener for removing favorites
    document.querySelectorAll(".remove-favorite").forEach(button => {
        button.addEventListener("click", (e) => {
            removeFromFavorites(e.currentTarget.dataset.id);
            updateFavoritesPage(); // Update the list after deletion
        });
    });
}

// Function to remove a favorite from Local Storage
function removeFromFavorites(id) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(item => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
