const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let playerCountry = ""; // Stores selected country

function startGame(country) {
    playerCountry = country;
    document.getElementById("menu").style.display = "none"; // Hide menu
    canvas.style.display = "block"; // Show game

    loadGame();
}

function loadGame() {
    const mapImage = new Image();
    mapImage.src = "map.png";

    mapImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(`You are playing as ${playerCountry}`, 50, 50);
    };
}
