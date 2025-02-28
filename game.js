// Get the canvas element and its context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerCountry = ""; // Stores selected country

// Function to start the game after country selection
function startGame(country) {
    playerCountry = country;
    document.getElementById("menu").style.display = "none"; // Hide menu
    canvas.style.display = "block"; // Show canvas

    loadMap();
}

// Function to load the map and render the countries
function loadMap() {
    fetch('europe.geojson')  // Assuming your file is named 'europe.geojson'
        .then(response => response.json())
        .then(data => {
            drawMap(data); // Pass the geoJSON data to the drawing function
        });
}

// Function to draw the geoJSON map
function drawMap(geoData) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    geoData.features.forEach((feature) => {
        // Each feature represents a country in geoJSON
        const coordinates = feature.geometry.coordinates[0];  // Assume it's a simple polygon

        // Set country color (can change based on selection)
        ctx.fillStyle = "#FF5733"; // Change color dynamically later for selection

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
    // Loop through countries and check if the click is inside a country polygon
    // This is a basic check, but ideally, we need a more sophisticated method (e.g., using point-in-polygon logic)
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
