// Get the canvas element and its context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to the full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the map image
const mapImage = new Image();
mapImage.src = "map.png";  // Make sure map.png is in the same folder as the HTML and game.js

// Once the image has loaded, draw it on the canvas
mapImage.onload = () => {
    // Clear the canvas before drawing the map
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the map on the canvas
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
};

// Handle any image loading errors
mapImage.onerror = (err) => {
    console.error("Image failed to load:", err);
};

// Example of handling clicks on the canvas
canvas.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    console.log(`Clicked at coordinates: ${x}, ${y}`);
    // You can add more logic here to interact with specific areas of the map
});
