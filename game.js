// Get the canvas element and its context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to the full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Add a fallback background color
ctx.fillStyle = "#cccccc";  // Light gray background
ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill the canvas with the background color

// Load the map image
const mapImage = new Image();
mapImage.src = "map.png";  // Ensure the image path is correct

// Once the image has loaded, draw it on the canvas
mapImage.onload = () => {
    // Clear the canvas before drawing the map
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the map on the canvas
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
};

// Handle any image loading errors
mapImage.onerror = () => {
    alert("Image failed to load! Check your file path.");
};
