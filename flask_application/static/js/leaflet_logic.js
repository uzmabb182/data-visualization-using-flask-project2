
// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

d3.json("../static/data/cleaned_states_coordinates.json").then(function (data) {
  console.log(data);

  console.log(data[0].state); 
  console.log(data[1].state); 

  console.log(data[0].lat); 
  console.log(data[1].lat); 
  
  for (var i = 0; i <data.length; i++) {
    console.log(data[i].lat); 
    console.log(data[i].long);  
  }
  createMarkers(data);
});

//==========================================================================================

function createMarkers(data) {

  console.log(data);
  console.log(data[0].lat); 
  console.log(data[0].long); 

  // Define a function that we want to run once for each poverty location 
  
  let povertyMarkers = [];

  for (var i = 0; i <data.length; i++) {

    // For each location, create a marker, and bind a popup with the state's name.
    let coordinateMarker = L.marker([data[i].lat, data[i].long])
      .bindPopup("<h3>" + data[i].state + "<h3><h3>Capacity: " + data[i].avg_bachelors_or_higher_2019 + "</h3>");
      
    // Add the marker to the povertyMarkers array.
    // console.log(coordinateMarker)
    povertyMarkers.push(coordinateMarker);
   
  }
  
  console.log(povertyMarkers)
  povertyLayer = L.layerGroup(povertyMarkers)

  // Send our poverty layer to the createMap function
  createMap(povertyLayer);
}
//==========================================================================================
// Create the createMap function.
function createMap(povertyLayer) {

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
    "Bike Station": povertyLayer
  };

  // Create our map, giving it the streetmap and povertylayer to display on load.
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, topomap, povertyLayer]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


  