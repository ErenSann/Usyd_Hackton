function updatePinInfoBox(location) {
  var pinForm = document.getElementById("pin-form");
  pinForm.classList.remove("hidden");

  document.getElementById("pin-form-fields").onsubmit = function(e) {
    e.preventDefault();
    var name = document.getElementById("pin-name").value;
    var description = document.getElementById("pin-description").value;
    var color = selectedColor;

    if (name && description) {
      savePinToServer(name, description, location, color);
    }
  };
}

function addPinInfoToList(name, description, location, color) {
  console.log(name, description, location, color);
  const ul = document.getElementById("pin-list");
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(`${name} (${location.lat().toFixed(2)}, ${location.lng().toFixed(2)}) - ${description} - Color: ${color}`));
  ul.appendChild(li);
}
