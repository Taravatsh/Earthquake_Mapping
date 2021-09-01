// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY //API key in config.js
});

// We create the dark view tile layer that will be an option for ou app.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [light] //by default it will display street first
})

// Pass our map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map); //map is the map object we created

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/Taravatsh/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON data.
// d3.json(torontoData).then(function(data) {
//     console.log(data);
//     L.geoJson(data).addTo(map);
// });


// Skill Drill: The default map layer as night navigation with day navigation as another option.
//The airline routes are in light yellow with a weight of 2.
//Each airline route has a popup marker that shows the airline code and destination.
// d3.json(torontoData).then(function(data) {
//     console.log(data);
//     L.geoJson(data, {
//         weight: 2,
//         color: "#ffffa1",
//         onEachFeature: function(feature, layer) {
//             layer.bindPopup("<h2> Arline: " + feature.properties.airline + "</h2> <hr> <h3>  Destination: " + feature.properties.dst + "</h3>");
//         }
//     }).addTo(map);
// });

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
        layer.bindPopup("<h2> Arline: " + feature.properties.airline + "</h2> <hr> <h3>  Destination: " + feature.properties.dst + "</h3>");
        }
    }).addTo(map);
});