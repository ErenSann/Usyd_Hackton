function addMarker(location, color = selectedColor) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      scale: 5,
      strokeColor: 'white',
      strokeWeight: 1
    }
  });
  lastMarker = marker;
}


function savePinToServer(name, description, location, color) {
  fetch('/pins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      description: description,
      lat: location.lat(),
      lng: location.lng(),
      color: color
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      addPinInfoToList(name, description, location, color);
      document.getElementById("pin-form").classList.add("hidden");
    }
  });
}