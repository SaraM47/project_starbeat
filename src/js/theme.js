/**
 * Theme-related elements.
 * @property {HTMLElement} themeToggle - The theme toggle button element.
 * @property {HTMLElement} body - The body element of the document.
 * @property {HTMLElement} themeIcon - The theme icon inside the toggle button.
 */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

/**
 * Updates the theme of the website.
 * Removes any existing theme classes and applies the new theme.
 * Saves the theme in local storage.
 *
 * @param {string} theme - The new theme to be applied ("light-mode" or "dark-mode").
 */
function updateTheme(theme) {
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(theme);
    updateThemeIcon(theme);
    localStorage.setItem("theme", theme);
}

/**
 * Updates the theme toggle icon based on the current theme.
 *
 * @param {string} theme - The current theme ("light-mode" or "dark-mode").
 */
function updateThemeIcon(theme) {
    themeIcon.classList = theme === "light-mode" ? "fas fa-sun" : "fas fa-moon";
}

/**
 * Retrieves the saved theme from local storage.
 * If no saved theme is found, it follows the system's preferred theme.
 */
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    updateTheme(savedTheme);
} else {
    // If no saved theme, follow system setting
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    body.classList.add(prefersLight ? "light-mode" : "dark-mode");
    updateThemeIcon(prefersLight ? "light-mode" : "dark-mode");
}

/**
 * Listens for changes in the system color scheme and updates the theme accordingly.
 * This only applies if the user has not manually selected a theme.
 */
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) { // Only if the user has not selected manually
        updateTheme(e.matches ? "dark-mode" : "light-mode");
    }
});

/**
 * Toggles the theme manually when the user clicks the theme toggle button.
 */
themeToggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("light-mode") ? "dark-mode" : "light-mode";
    updateTheme(newTheme);
});
