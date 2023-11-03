/* global bootstrap: false */

(function () {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Single event per element.
  document.getElementById("btnEdit").onclick = function () {
    isEditing = true;
    grid.enable();
    document.querySelector("#btnCancel").removeAttribute("hidden");
    document.querySelector("#btnEdit").setAttribute("hidden", true);
    document.querySelector("#btnSave").removeAttribute("hidden");
  };

  document.getElementById("btnCancel").onclick = function () {
    resetEditLayout();
  };

  document.getElementById("btnSave").onclick = function () {
    serializedFull = grid.save(true, true);
    serializedData = serializedFull.children;
    //alert(JSON.stringify(serializedFull, null, '  '))

    resetEditLayout();
    var json_data = JSON.stringify(serializedFull, null, "  ");
    document.querySelector("#txtAreaJsonData").innerHTML = json_data;
    saveJsonObjToFile(serializedFull, 'sentinel_saved.json');
  };
})();

function resetEditLayout() {
  isEditing = false;
  grid.disable();
  document.querySelector("#btnCancel").setAttribute("hidden", true);
  document.querySelector("#btnEdit").removeAttribute("hidden");
  document.querySelector("#btnSave").setAttribute("hidden", true);
}

function renderDashboard() {
  render_bar_chart();
  render_line_chart();

  //render textarea
  document.querySelector("#txtAreaJsonData").innerHTML =
    "Awaiting JSON data...!";
}

function saveJsonInFS(jsonArr) {
  var xhr = new XMLHttpRequest(),
    jsonArr,
    method = "GET",
    jsonRequestURL = "./dashboards/sentinel_saved.json";

  xhr.open(method, jsonRequestURL, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // we convert your JSON into JavaScript object
      jsonArr = JSON.parse(xhr.responseText);

      // we add new value:
      //jsonArr.push({ nissan: "sentra", color: "green" });

      // we send with new request the updated JSON file to the server:
      xhr.open("POST", jsonRequestURL, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      // if you want to handle the POST response write (in this case you do not need it):
      // xhr.onreadystatechange = function(){ /* handle POST response */ };
      xhr.send("jsonTxt=" + JSON.stringify(jsonArr));
      // but on this place you have to have a server for write updated JSON to the file
    }
  };
  xhr.send(null);
}
