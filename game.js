// Real-time HOI4-inspired game with real borders on a Europe map

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the Europe map as background
const map = new Image();
map.src = "map.png"; // Make sure this file is in your GitHub repo!

// Define country borders as polygons (x, y coordinates)
let countries = [
    { name: 'UK', color: 'blue', army: 100, production: 2, resources: 150, borders: [[100, 200], [200, 180], [220, 250], [120, 270]] },
    { name: 'France', color: 'lightblue', army: 120, production: 3, resources: 170, borders: [[220, 300], [350, 290], [360, 400], [230, 420]] },
    { name: 'Germany', color: 'black', army: 140, production: 4, resources: 200, borders: [[400, 250], [550, 240], [560, 360], [410, 370]] },
    { name: 'Italy', color: 'green', army: 110, production: 2, resources: 160, borders: [[450, 400], [550, 390], [570, 500], [460, 510]] },
    { name: 'USSR', color: 'red', army: 200, production: 5, resources: 250, borders: [[700, 200], [900, 180], [920, 350], [720, 400]] }
];

// Function to draw the map and country borders
function drawMap() {
    ctx.drawImage(map, 0, 0, canvas.width, canvas.height);

    countries.forEach(country => {
        ctx.fillStyle = country.color + "80"; // Transparent color for territory
        ctx.beginPath();
        country.borders.forEach((point, index) => {
            if (index === 0) ctx.moveTo(point[0], point[1]);
            else ctx.lineTo(point[0], point[1]);
        });
        ctx.closePath();
        ctx.fill();

        // Draw country names and armies
        const center = getPolygonCenter(country.borders);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText(`${country.name} (${Math.floor(country.army)})`, center[0], center[1]);
    });
}

// Function to calculate the center of a polygon (for text display)
function getPolygonCenter(points) {
    let x = 0, y = 0;
    points.forEach(point => { x += point[0]; y += point[1]; });
    return [x / points.length, y / points.length];
}

// Function to check if a point is inside a polygon (for clicks)
function isInsidePolygon(point, polygon) {
    let [x, y] = point;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let [xi, yi] = polygon[i];
        let [xj, yj] = polygon[j];
        let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Click event to attack a country
document.addEventListener('click', (e) => {
    countries.forEach(country => {
        if (isInsidePolygon([e.clientX, e.clientY], country.borders)) {
            country.army -= 10;
            console.log(`${country.name} attacked! Army: ${Math.floor(country.army)}`);
        }
    });
});

// AI behavior: Attack weaker nations
function aiBehavior() {
    countries.forEach(country => {
        if (country.army > 120) {
            let target = countries.find(c => c !== country && c.army < country.army);
            if (target) {
                target.army -= 5;
                console.log(`${country.name} attacks ${target.name}!`);
            }
        }
    });
    setTimeout(aiBehavior, 3000);
}

// Resource generation
function generateResources() {
    countries.forEach(country => {
        country.resources += 5;
    });
    setTimeout(generateResources, 5000);
}

// Game loop
function updateGame() {
    drawMap();
    requestAnimationFrame(updateGame);
}

// Start the game
map.onload = () => {
    generateResources();
    aiBehavior();
    updateGame();
};
