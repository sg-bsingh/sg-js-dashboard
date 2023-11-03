(function () {
  document.getElementById("btnLoad").onclick = function () {
    let request = new XMLHttpRequest();
    request.open("GET", "./dashboards/sentinel.json", false);
    request.send(null);

    var dash_obj = JSON.parse(request.responseText);

    grid = GridStack.addGrid(document.querySelector("#divGridStack"), dash_obj);
    resetEditLayout();
    renderDashboard();

    document.querySelector("#btnLoad").setAttribute("hidden", true);
    document.querySelector("#btnDestroy").removeAttribute("hidden");
  };

  document.getElementById("btnDestroy").onclick = function () {
    if (!grid) {
      return;
    }
    grid.removeAll();
    grid.destroy(true);

    document.querySelector("#btnLoad").removeAttribute("hidden");
    document.querySelector("#btnEdit").setAttribute("hidden", true);
    document.querySelector("#btnDestroy").setAttribute("hidden", true);
  };
})();

function removeWidget(el) {
  el.remove();
  grid.removeWidget(el, false);
}
