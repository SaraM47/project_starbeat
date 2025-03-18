/**
 * Adds a floating music note effect following the user's cursor.
 * Randomly selects a note symbol and color, animates it, and removes it after 1 second.
 *
 * @event mousemove - Triggered when the user moves the mouse.
 * @param {MouseEvent} e - The event object containing the cursor's position.
 * @example
 * // This script is automatically applied when the page loads.
 * // Move the mouse to see floating notes appear.
 */
document.addEventListener("mousemove", (e) => {
     /**
     * Array of possible music note symbols.
     * @type {string[]}
     */
    const notes = ["♩", "♪", "♫", "♬"];

    /**
     * Array of possible colors for the notes.
     * @type {string[]}
     */
    const colors = ["#ff80ab", "#c2a2ff", "#8fd3fe", "#fff6a9"];

    // Create a new music note element
    let note = document.createElement("div");
    note.classList.add("note");
    note.innerText = notes[Math.floor(Math.random() * notes.length)];

    // Seleting a random color from the list 
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.color = randomColor;

    // Set a random rotation angle between -360 and 360 degrees
    let randomRotation = Math.floor(Math.random() * 720) - 360;
    note.style.setProperty("--rotation", `${randomRotation}deg`);

    // Append the note to the document
    document.body.appendChild(note);

    // Position the note at the cursor's location - handle scrolling
    note.style.left = `${e.pageX}px`;
    note.style.top = `${e.pageY}px`;

    // Remove the note after 1 second to prevent excessive elements
    setTimeout(() => {
        note.remove();
    }, 1000);
});
