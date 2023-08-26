var map;
var selectedColor = 'red';

var buttons = document.querySelectorAll("#color-selection button");
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        selectedColor = this.getAttribute('data-color');
    });
});

document.getElementById("pin-search").addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    filterPins(searchTerm);
});

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng);
  });
}

function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: selectedColor,
            fillOpacity: 1,
            scale: 5,
            strokeColor: 'white',
            strokeWeight: 1
        }
    });

  var pinForm = document.getElementById("pin-form");
  pinForm.classList.remove("hidden");

  document.getElementById("pin-form-fields").onsubmit = function(e) {
    e.preventDefault();
    var name = document.getElementById("pin-name").value;
    var description = document.getElementById("pin-description").value;

    if (name && description) {
      fetch('/pins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
          lat: location.lat(),
          lng: location.lng()
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          var ul = document.getElementById("pin-list");
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(`${name} (${location.lat().toFixed(2)}, ${location.lng().toFixed(2)}) - ${description}`));
          ul.appendChild(li);
          pinForm.classList.add("hidden");
        }
      });
    }
  };
}

window.onload = initialize;

function filterPins(term) {
    var pins = document.querySelectorAll("#pin-list li");

    pins.forEach(function(pin) {
        if (pin.textContent.toLowerCase().includes(term)) {
            pin.style.display = "";
        } else {
            pin.style.display = "none";
        }
    });
}