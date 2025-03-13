const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

// Function to update the theme
function updateTheme(theme) {
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(theme);
    updateThemeIcon(theme);
    localStorage.setItem("theme", theme);
}

// Function to update the icon
function updateThemeIcon(theme) {
    themeIcon.classList = theme === "light-mode" ? "fas fa-sun" : "fas fa-moon";
}

// Check if the user has saved a theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
    updateTheme(savedTheme);
} else {
    // If no saved theme, follow system setting
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    body.classList.add(prefersLight ? "light-mode" : "dark-mode");
    updateThemeIcon(prefersLight ? "light-mode" : "dark-mode");
}

// Listen for changes in the system color theme
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) { // Only if the user has not selected manually
        updateTheme(e.matches ? "dark-mode" : "light-mode");
    }
});

// Switch theme manually with the button
themeToggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("light-mode") ? "dark-mode" : "light-mode";
    updateTheme(newTheme);
});
