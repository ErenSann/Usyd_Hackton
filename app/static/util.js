document.getElementById("pin-search").addEventListener('input', function() {
    var searchTerm = this.value.toLowerCase();
    filterPins(searchTerm);
});

var buttons = document.querySelectorAll("#color-selection button");
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        selectedColor = this.getAttribute('data-color');
    });
});


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

function hideOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}
