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
  let task = ''; // Declare task with 'let'

  if (color === 'red') {
    task = 'urgent';
  } else if (color === 'green') { // Use 'else if' instead of 'elif'
    task = 'normal';
  } else if (color === 'blue') { // Use 'else if' instead of 'elif'
    task = 'reward tasks';
  }

  li.appendChild(document.createTextNode(`Name: ${name} (${location.lat().toFixed(2)}, ${location.lng().toFixed(2)}) - Description: ${description} - Task: ${task}`));
  ul.appendChild(li);
}

