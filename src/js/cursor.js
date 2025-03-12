document.addEventListener("mousemove", (e) => {
    const notes = ["♩", "♪", "♫", "♬"];
    const colors = ["#ff80ab", "#c2a2ff", "#8fd3fe", "#fff6a9"];

    let note = document.createElement("div");
    note.classList.add("note");
    note.innerText = notes[Math.floor(Math.random() * notes.length)];

    // Random color from the list
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.color = randomColor;
    note.style.textShadow = `0 0 5px ${randomColor}, 0 0 10px ${randomColor}`;

    // Random rotation angle (-360 to 360 degrees)
    let randomRotation = Math.floor(Math.random() * 720) - 360;
    note.style.setProperty("--rotation", `${randomRotation}deg`);

    document.body.appendChild(note);

    // Handle scrolling
    note.style.left = `${e.pageX}px`;
    note.style.top = `${e.pageY}px`;

    setTimeout(() => {
        note.remove();
    }, 1000);
});
