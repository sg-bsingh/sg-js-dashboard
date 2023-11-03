(function () {
  
  // Single event per element.
  document.getElementById("btnEdit").onclick = function () {
    grid.enable();
    document.querySelector("#btnCancel").removeAttribute("hidden");
    document.querySelector("#btnEdit").setAttribute("hidden", true);
    document.querySelector("#btnSave").removeAttribute("hidden");

    let delete_btn = document.querySelectorAll(".remove-widget");
    for (let i = 0; i < delete_btn.length; i++) {
      delete_btn[i].removeAttribute("hidden");
    }
  };

  document.getElementById("btnCancel").onclick = function () {
    loadDashboard();
    resetEditLayout();
  };

  document.getElementById("btnSave").onclick = function () {
    serializedFull = grid.save(true, true);
    serializedData = serializedFull.children;
    //alert(JSON.stringify(serializedFull, null, '  '))

    resetEditLayout();
    var json_data = JSON.stringify(serializedFull, null, "  ");
    document.querySelector("#txtAreaJsonData").innerHTML = json_data;
    saveJsonObjToFile(serializedFull, "sentinel_saved.json");
  };
})();

function resetEditLayout() {
  grid.disable();
  document.querySelector("#btnCancel").setAttribute("hidden", true);
  document.querySelector("#btnEdit").removeAttribute("hidden");
  document.querySelector("#btnSave").setAttribute("hidden", true);

  let delete_btn = document.querySelectorAll(".remove-widget");
  for (let i = 0; i < delete_btn.length; i++) {
    delete_btn[i].setAttribute("hidden", true);
  }
}

function renderDashboard() {
  render_bar_chart();
  render_line_chart();

  //render textarea
  document.querySelector("#txtAreaJsonData").innerHTML =
    "Awaiting JSON data...!";

  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
}
