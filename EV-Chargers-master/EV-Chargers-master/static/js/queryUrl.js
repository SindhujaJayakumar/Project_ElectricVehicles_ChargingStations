// Store our API endpoint inside queryUrl
var queryUrl = "https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=E85,ELEC&state=CA&limit=200&api_key=ApaTmgR89mLvljGxv0g3TINHNSrc6zMUDR5LxK99&format=JSON";
// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.fuel_stations);
});
function placeholder() {
    var placesAutocomplete = places({
        appId: 'pl0DEKJ4XSAE',
        apiKey: '9fe8de3ec445c3f66f52197966c2e68f',
        container: document.querySelector('#input-map')
    });
    var map = L.map('map-example-container', {
        scrollWheelZoom: false,
        zoomControl: false,
    });
    var osmLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 1,
        maxZoom: 13,
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    var markers = [];
    map.setView(new L.LatLng(0, 0), 1);
    map.addLayer(osmLayer);
    placesAutocomplete.on('suggestions', handleOnSuggestions);
    placesAutocomplete.on('cursorchanged', handleOnCursorchanged);
    placesAutocomplete.on('change', handleOnChange);
    placesAutocomplete.on('clear', handleOnClear);
    function handleOnSuggestions(e) {
        markers.forEach(removeMarker);
        markers = [];
        if (e.suggestions.length === 0) {
            map.setView(new L.LatLng(0, 0), 1);
            return;
        }
        e.suggestions.forEach(addMarker);
        findBestZoom();
    }
    function handleOnChange(e) {
        markers
            .forEach(function (marker, markerIndex) {
                if (markerIndex === e.suggestionIndex) {
                    markers = [marker];
                    marker.setOpacity(1);
                    findBestZoom();
                }
                else {
                    removeMarker(marker);
                }
            });
    }
    function handleOnClear() {
        map.setView(new L.LatLng(0, 0), 1);
        markers.forEach(removeMarker);
    }
    function handleOnCursorchanged(e) {
        markers
            .forEach(function (marker, markerIndex) {
                if (markerIndex === e.suggestionIndex) {
                    marker.setOpacity(1);
                    marker.setZIndexOffset(1000);
                }
                else {
                    marker.setZIndexOffset(0);
                    marker.setOpacity(0.5);
                }
            });
    }
    function addMarker(suggestion) {
        var marker = L.marker(suggestion.latlng, { opacity: .4 });
        marker.addTo(map);
        markers.push(marker);
    }
    function removeMarker(marker) {
        map.removeLayer(marker);
    }
    function findBestZoom() {
        var featureGroup = L.featureGroup(markers);
        map.fitBounds(featureGroup.getBounds().pad(0.5), { animate: false });
    }
}
placeholder();
