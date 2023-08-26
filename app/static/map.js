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
      addMarker(location, pin.color, pin.name, pin.description, pin.creator);  // Added more args here
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

function filterPins(term) {
  const pins = document.querySelectorAll("#pin-list li");

  pins.forEach(function(pin) {
    if (pin.textContent.toLowerCase().includes(term)) {
      pin.style.display = "";
    } else {
      pin.style.display = "none";
    }
  });
}

// Create a function to toggle isCreatingPoint
function toggleCreatePoint() {
  isCreatingPoint = !isCreatingPoint;
}

// Create a function to cancel point creation
function cancelCreatePoint() {
  isCreatingPoint = false;
  document.getElementById("pin-form").classList.add("hidden");
    if (lastMarker) {  // Check if a last marker exists
      lastMarker.setMap(null);  // Remove the last marker from the map
      lastMarker = null;  // Reset the last marker
    }
}

