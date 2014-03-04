/********************** The Map itself ***************************/
// Make the map object itself. At this point it doesn't have any
// layers or even a basemap
var map = L.map('mapdiv');
map.setView([45,-93],8);

/*********************** Base map ******************************/

// Let's set some basemap options
var tile_options = {
    subdomains: '1234', // Using multiple subdomains allows the user to download more tiles at a time so 
    attribution: 'Map data OpenStreeMaps and MapQuest'
};

// Now we add the actual tile layer
var basemap = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',tile_options);
basemap.addTo(map);


/************************ CSV Data ****************************/

// Options for the CSV data
var csv_options = {
    fieldSeparator: ',',
    titles: ['lng','lat','ignore','popup'],
    onEachFeature: function(feature,layer){
        layer.bindPopup(feature.properties.popup);
    }
};

var csvContents = document.getElementById('locations').innerHTML;
var geoLayer = L.geoCsv(csvContents,csv_options);
// map.addLayer(geoLayer);


/************************* Clustering **************************/

var clusterOptions = {
    maxClusterRadius: 30
};

var markers = new L.MarkerClusterGroup(clusterOptions);
markers.addLayer(geoLayer);
map.addLayer(markers);
