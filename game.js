document.addEventListener("DOMContentLoaded", () => {
    const mapObject = document.getElementById("map");
    
    mapObject.addEventListener("load", () => {
        const svgDoc = mapObject.contentDocument;
        
        if (svgDoc) {
            svgDoc.querySelectorAll("path").forEach(country => {
                country.addEventListener("click", () => {
                    alert("You selected " + country.id);
                });
            });
        }
    });
});
