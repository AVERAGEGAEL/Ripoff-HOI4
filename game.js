// Get the canvas element and its context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size to the full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define some clickable regions (example coordinates for countries)
const regions = [
    { name: "Country A", x: 100, y: 200, width: 150, height: 100, color: "#FF0000" }, // Red
    { name: "Country B", x: 300, y: 400, width: 200, height: 150, color: "#00FF00" }  // Green
];

// Load the map image
const mapImage = new Image();
mapImage.src = "map.png";  // Ensure the image path is correct

// Once the image has loaded, draw it on the canvas
mapImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

    // Draw the regions (over the map)
    regions.forEach(region => {
        ctx.fillStyle = region.color;
        ctx.fillRect(region.x, region.y, region.width, region.height);
    });
};

// Handle clicks on the canvas
canvas.addEventListener("click", (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // Check if the click is inside any region
    regions.forEach(region => {
        if (
            x >= region.x && x <= region.x + region.width &&
            y >= region.y && y <= region.y + region.height
        ) {
            alert(`You clicked on ${region.name}!`);
            
            // Change the color to indicate selection (blue when selected)
            region.color = "#0000FF"; // Change to blue when selected
            redrawMap(); // Redraw the map with updated region colors
        }
    });
});

// Function to redraw the map with updated region colors
function redrawMap() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw the map image
    ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);
    
    // Redraw the regions with their updated colors
    regions.forEach(region => {
        ctx.fillStyle = region.color;
        ctx.fillRect(region.x, region.y, region.width, region.height);
    });
}
