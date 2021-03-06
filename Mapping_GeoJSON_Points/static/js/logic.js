// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

//  // Grabbing our GeoJSON data. (arguments of the function can be called anything)
//  L.geoJson(sanFranAirport, {
//      // We turn each feature into a Marker on the map. 
//      pointToLayer: function(feature, latlng) {
//          console.log(latlng);
//          return L.marker(latlng).bindPopup("<h2>" + feature.properties.city + "</h2>");
//      }
//  }).addTo(map); //map object we created

// Grabbing our GeoJSON data using onEachFeature.
// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer)
//         layer.bindPopup("<h2>" + "Airport Code: " + feature.properties.faa + "</h2>+ "<hr>" + "<h3>" + "Airport name:" + feature.properties.name + "</h3>");
//     }
// }).addTo(map);

// Skill Drill: Edit your logic.js to create a popup marker for San Francisco Airport on a night preview navigation map. When you click on the popup, it will display the city, state, and the name of the airport.
// L.geoJSON(sanFranAirport, {
//     pointToLayer: function(f, l) {
//         return L.marker(l).bindPopup("<h2>" + f.properties.name + "</h2>" + "<hr>" + "<h3>" + f.properties.city + ", " + f.properties.country);
//     }
// }).addTo(map); // navigation-night-v1 for tileLayer

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY //API key in config.js
});

// We create the dark view tile layer that will be an option for ou app.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data ?? <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets] //by default it will display street first
})

// Pass our map layers into our layer control and add the layer control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map); //map is the map object we created

// Accessing the airport GeoJSON URL.
let airportData = "https://raw.githubusercontent.com/Taravatsh/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h2>" + "Airport Code: " + feature.properties.faa + "</h2>" + "<hr>" + "<h3>" + "Airport name:" + feature.properties.name + "</h3>");
        }
    }).addTo(map);
});

    //L.geoJson(data).addTo(map); without popup