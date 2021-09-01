// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
var map = L.map('mapid').setView([37.6213, -122.3790], 5); //mapid id in index.html

// Coordinates for each point to be used in the line.
 let line = [
     [33.9416, -118.4085],
     [37.6213, -122.3790],
     [40.7899, -111.9791],
     [47.4502, -122.3088]
 ];

// Create a polyline using the line coordinates and make the line red.
 L.polyline(line, {
     color: "yellow"
 }).addTo(map)

// Skill Drill: create an airline route from SFO to John F. Kennedy International Airport (JFK) with two stops, Austin-Bergstrom International Airport (AUS) and Toronto Pearson International Airport (YYZ). Make the route a blue dashed line, with a weight of 4 and opacity of 0.5 on the light map.
// let l = [
//     [37.6213, -122.3790],
//     [30.9175, -97.6664],
//     [43.6777, -79.6248],
//     [40.6413, -73.7781]
// ];
// L.polyline(l, {
//     color: "blue",
//     weight: 4,
//     opacity: 0.5,
//     dashArray: 4
// }).addTo(map)

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY //API key in config.js
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); //map is the map object we created
