window.onload = () => {
    const map = document.getElementById('map');  // The SVG map element
    
    map.addEventListener('load', () => {
        const svgDoc = map.contentDocument;  // Access the content inside the SVG
        const countries = svgDoc.querySelectorAll('path');  // Select all countries (assuming countries are <path> elements in the SVG)
        
        countries.forEach(country => {
            country.addEventListener('click', () => {
                const countryName = country.getAttribute('id');  // Assuming each country has an 'id' attribute
                alert(`You clicked on: ${countryName}`);  // Display country name
            });
        });
    });
};
