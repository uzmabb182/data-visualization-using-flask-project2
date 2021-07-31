var myMap = L.map("map", {
    center: [39.01, -98.48],
    zoom: 4
  });
  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
    id: 'mapbox/streets-v11',
      accessToken: API_KEY
  }).addTo(myMap);

  
  L.geoJson(statesData).addTo(myMap);

  function color(d) {
    return d > 700   ? '#800026' :
           d > 600   ? '#BD0026' :
           d > 500   ? '#E31A1C' :
           d > 400   ? '#FC4E2A' :
           d > 300   ? '#FD8D3C' :
           d > 200   ? '#FEB24C' :
           d > 100   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: color(feature.properties.store_count),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}


L.geoJson(statesData, {style: style}).addTo(myMap);

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Starbucks Stores</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.store_count + ' stores'
        : 'Hover over a state');
};

info.addTo(myMap);


function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 2,
      color: '#008BCB',
      dashArray: '',
      fillOpacity: 0.7
  });

  info.update(layer.feature.properties);
}

function resetHighlight(e) {
  geojson.resetStyle(e.target);
  info.update();
}

function zoomToFeature(e) {
  myMap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

geojson = L.geoJson(statesData, {
  style: style,
  onEachFeature: onEachFeature
}).addTo(myMap);

