// Game Initialization
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let geoData = null; // Store geoJSON data

// Function to load geoJSON map (from file)
function loadMap() {
    fetch('europe.geojson')  // Make sure this path matches where your geoJSON file is located
        .then(response => response.json())
        .then(data => {
            geoData = data; // Store geoJSON data globally
            drawMap(geoData); // Start drawing map after loading
        })
        .catch(error => console.error("Error loading geoJSON:", error));
}

// Function to draw the geoJSON map
function drawMap(geoData) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    geoData.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates[0];  // Assuming it's a simple polygon

        // Set country color (initially gray)
        ctx.fillStyle = "#999999";

        // Draw country borders
        ctx.beginPath();
        coordinates.forEach(([x, y], index) => {
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();  // Outline the country border
    });
}

// Handle clicks on the canvas
canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    checkCountryClick(x, y);  // Check if a country was clicked
});

// Function to check if a country was clicked (based on coordinates)
function checkCountryClick(x, y) {
    geoData.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates[0];
        if (isPointInPolygon(x, y, coordinates)) {
            alert(`You clicked on ${feature.properties.name}`);
            highlightCountry(feature);  // Highlight the selected country
        }
    });
}

// Point-in-polygon check (basic approach, but can be improved)
function isPointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Function to highlight the selected country
function highlightCountry(countryFeature) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawMap(geoData);  // Redraw map with the highlighted country

    // Highlight selected country (for example, change color)
    ctx.fillStyle = "#0000FF";  // Blue color for selection
    const coordinates = countryFeature.geometry.coordinates[0];
    ctx.beginPath();
    coordinates.forEach(([x, y], index) => {
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Start the game (set up country selection or trigger on page load)
function startGame(country) {
    playerCountry = country;
    document.getElementById("menu").style.display = "none"; // Hide menu
    canvas.style.display = "block"; // Show canvas

    loadMap();  // Load the map (geoJSON)
}
