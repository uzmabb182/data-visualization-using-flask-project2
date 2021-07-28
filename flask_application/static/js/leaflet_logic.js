// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

d3.json("us_lat_long.json", function(data) {
  console.log(data);
});

// Store our API endpoint as queryUrl.
url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(url).then(function (response) {
  // Once we get a response, send to the function.
  console.log(response); 
  createMarkers(response);
});
//==========================================================================================

function createMarkers(response) {

  // Define a function that we want to run once for each station 
  
  let stations = response.data.stations;
  
  let bikeStations = [];

  for (var i = 0; i <stations.length; i++) {

    // For each station, create a marker, and bind a popup with the station's name.
    let bikeMarker = L.marker([stations[i].lat, stations[i].lon])
      .bindPopup("<h3>" + stations.name + "<h3><h3>Capacity: " + stations.capacity + "</h3>");
      
    // Add the marker to the bikeMarkers array.
    bikeStations.push(bikeMarker);
   
  }
 
  bikesLayer = L.layerGroup(bikeStations)

  // Send our bikes layer to the createMap function
  createMap(bikesLayer);
}
//==========================================================================================
// Create the createMap function.
function createMap(bikesLayer) {

  // Create the base layers.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topomap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topomap
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    "Bike Station": bikesLayer
  };

  // Create our map, giving it the streetmap and bikeslayer to display on load.
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, topomap, bikesLayer]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


  