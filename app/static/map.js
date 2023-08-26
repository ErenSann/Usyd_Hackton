var map;
var selectedColor = 'red';
var isCreatingPoint = false;
var lastMarker = null;
window.onload = initialize;


function initialize() {
  var mapOptions = {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  fetch('/pins', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    console.log('Received data:', data);
    if (data && Array.isArray(data)) {
      data.forEach(pin => {
        var location = new google.maps.LatLng(pin.lat, pin.lng);
        addMarker(location, pin.color);
        addPinInfoToList(pin.name, pin.description, location, pin.color);
      });
    }
  });

google.maps.event.addListener(map, 'click', function(event) {
  if (isCreatingPoint) {
    addMarker(event.latLng, selectedColor);
    updatePinInfoBox(event.latLng);
  }
});
}

