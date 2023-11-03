var isEditing = false;
let grid = null;
const widgets = [];

function initGridStack() {
  grid = GridStack.init({
    minRow: 1,
    cellHeight: "10rem",
    margin: 5,
    float: true,
    disableResize: !isEditing,
    disableDrag: !isEditing,
  });
  //makeWidgets(widgets);
}

function postInitialisationEvents() {
  grid.on("added removed change", function (e, items) {
    if (!items) return;
    let str = "";
    items.forEach(function (item) {
      str += " (x,y)=" + item.x + "," + item.y;
    });
    console.log(e.type + " " + items.length + " items:" + str);
  });
}

const layout = "moveScale";
function resizeGrid() {
  let width = document.body.clientWidth;
  if (width < 700) {
    grid.column(1, layout);
  } else if (width < 850) {
    grid.column(3, layout);
  } else if (width < 950) {
    grid.column(6, layout);
  } else if (width < 1100) {
    grid.column(8, layout);
  } else {
    grid.column(12, layout);
  }
}

function makeWidgets(widgets) {
  widgets.forEach((widget) => {
    makeWidget(widget);
  });
}

function makeWidget(item) {
  const elSelector = `#widget_${item.id}`;
  return grid.makeWidget(elSelector);
}

async function addWidget() {
  const widgetCount = widgets.length + 1;
  const widget = {
    id: widgetCount,
    title: `Widget ${widgetCount}`,
    grid: {
      w: 3,
      h: 2,
    },
  };
  widgets.push(widget);
  await nextTick();
  makeWidget(widget);
}

function deleteWidget(widget) {
  const index = widgets.findIndex((w) => w.id === widget.id);
  if (index === -1) {
    return;
  }
  const selector = `#${CSS.escape(widget.id)}`;
  grid.removeWidget(selector);
  grid.compact();
  widgets.splice(index, 1);
}

function toggleEdit() {
  if (isEditing) {
    grid.disable();
  } else {
    grid.enable();
  }
  isEditing = !isEditing;
}

(function () {
  // initGridStack();
  // resizeGrid(); // finally size to actual window

  // postInitialisationEvents();

  // window.addEventListener("resize", function () {
  //   resizeGrid();
  // });

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

function removeWidget(el){
    el.remove();
    grid.removeWidget(el, false);
}
