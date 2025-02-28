// Real-time strategy game inspired by HOI4
// Built with HTML5 Canvas and JavaScript

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the map image
const map = new Image();
map.src = "map.png"; // Make sure this file exists in your repo

let countries = [
    { name: 'USA', x: 200, y: 200, color: 'blue', army: 100, production: 1, resources: 100 },
    { name: 'Germany', x: 600, y: 300, color: 'black', army: 100, production: 1, resources: 100 },
    { name: 'USSR', x: 900, y: 400, color: 'red', army: 100, production: 1, resources: 100 }
];

function drawCountries() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map, 0, 0, canvas.width, canvas.height); // Draw the map first

    countries.forEach(country => {
        ctx.fillStyle = country.color;
        ctx.beginPath();
        ctx.arc(country.x, country.y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Draw text properly
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center'; // Center text
        ctx.fillText(`${country.name} (${Math.floor(country.army)})`, country.x, country.y - 40);
    });
}

function updateGame() {
    countries.forEach(country => {
        if (country.resources > 0) {
            country.army += country.production * 0.5;
            country.resources -= country.production * 0.2; // Resource consumption
        }
    });
    drawCountries();
    requestAnimationFrame(updateGame);
}

document.addEventListener('click', (e) => {
    countries.forEach(country => {
        const dx = e.clientX - country.x;
        const dy = e.clientY - country.y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
            country.army -= 10;
            console.log(`${country.name} attacked! Army: ${Math.floor(country.army)}`);
        }
    });
});

function aiBehavior() {
    countries.forEach(country => {
        if (country.army > 120) {
            const target = countries.find(c => c !== country && c.army < country.army);
            if (target) {
                target.army -= 5;
                console.log(`${country.name} attacks ${target.name}!`);
            }
        }
        // AI manages resources and production
        if (country.resources < 50) {
            country.production *= 0.9;
        } else {
            country.production *= 1.05;
        }
    });
    setTimeout(aiBehavior, 3000);
}

function generateResources() {
    countries.forEach(country => {
        country.resources += 5; // Simulate resource gathering
    });
    setTimeout(generateResources, 5000);
}

// Start the game after the map loads
map.onload = () => {
    console.log("Map Loaded!"); // Debugging
    generateResources();
    aiBehavior();
    updateGame();
};

