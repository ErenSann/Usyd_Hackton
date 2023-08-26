// create a list of markers
function addMarker(location, color , name, description, creator) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
//    name: pname,
//    description: description,
//    creator: creator
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 1,
      scale: 5,
      strokeColor: 'white',
      strokeWeight: 1,
    }
  });
  lastMarker = marker;
//  marker.addListener('click', function() {
//      var infoBox = document.getElementById("info-box");
//      infoBox.classList.remove("hidden");
//      infoBox.innerHTML = `<h3>${marker.name}</h3><p>${marker.description}</p><p>${marker.creator}</p>`;
//            infoBox.innerHTML = `<h3>${name}</h3><p>${description}</p><p>${creator}</p>`;
//   });

// Add the marker click event
marker.addListener('click', function() {
    var pointBox = document.getElementById("point-box");

    // Remove the 'hidden' class to make it visible
    pointBox.classList.remove("hidden");

    // Insert data into point-box
    pointBox.innerHTML = `<span id="close-point-box" style="cursor:pointer;">x</span><h3>Name : ${name}</h3><p> Description : ${description}</p><p>Creator : ${creator}</p>`;

    // Attach close event to newly added close button
    document.getElementById("close-point-box").addEventListener('click', function() {
        pointBox.classList.add("hidden");
    });
});

// Hide the point-box when clicking the close button
document.getElementById("close-point-box").addEventListener('click', function() {
    var pointBox = document.getElementById("point-box");
    pointBox.classList.add("hidden");
});

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

