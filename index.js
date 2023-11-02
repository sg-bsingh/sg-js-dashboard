/* global bootstrap: false */

(function () {

document.querySelector("#txtAreaJsonData").innerHTML = 'Awaiting JSON data...!';
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
 const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Single event per element.
document.getElementById("btnEdit").onclick = function() {
  
  isEditing = true;
  grid.enable();
  document.querySelector("#btnCancel").removeAttribute("hidden");
  document.querySelector("#btnEdit").setAttribute("hidden", true);
  document.querySelector("#btnSave").removeAttribute("hidden");
};

document.getElementById("btnCancel").onclick = function() {
  
  resetEditLayout();
};

document.getElementById("btnSave").onclick = function() {
  serializedFull = grid.save(true, true);
  serializedData = serializedFull.children;
  //alert(JSON.stringify(serializedFull, null, '  '))
  resetEditLayout();

  document.querySelector("#txtAreaJsonData").innerHTML = JSON.stringify(serializedFull, null, '  ');
};
 
})()

function resetEditLayout() {
  isEditing = false;
  grid.disable();
  document.querySelector("#btnCancel").setAttribute("hidden", true);
  document.querySelector("#btnEdit").removeAttribute("hidden");
  document.querySelector("#btnSave").setAttribute("hidden", true);
}

