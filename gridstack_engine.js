let grid = null;
const widgets = [
  {
    id: 1,
    title: "Widget 1",
    grid: {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
    },
  },
  {
    id: 2,
    title: "Widget 2",
    grid: {
      x: 2,
      y: 0,
      w: 2,
      h: 1,
    },
  },
  {
    id: 3,
    title: "Widget 3",
    grid: {
      x: 0,
      y: 2,
      w: 2,
      h: 1,
    },
  },
  {
    id: 4,
    title: "Widget 4",
    grid: {
      x: 2,
      y: 2,
      w: 1,
      h: 2,
    },
  },
  {
    id: 5,
    title: "Widget 5",
    grid: {
      x: 3,
      y: 2,
      w: 1,
      h: 2,
    },
  },
];

function initGridStack() {
  grid = GridStack.init({
    column: 4,
    cellHeight: 100,
    margin: 10,
    disableResize: !isEditing,
    disableDrag: !isEditing,
  });
  makeWidgets(widgets);
}

function makeWidgets(widgets) {
  widgets.forEach((widget) => {
    makeWidget(widget);
  });
}

function makeWidget(item) {
  const elSelector = `#${item.id}`;
  return grid.makeWidget(elSelector);
}

async function addWidget() {
  const widgetCount = widgets.length + 1;
  const widget = {
    id: widgetCount,
    title: `Widget ${widgetCount}`,
    grid: {
      w: 1,
      h: 1,
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

let isEditing = false;

function toggleEdit() {
  if (isEditing) {
    grid.disable();
  } else {
    grid.enable();
  }
  isEditing = !isEditing;
}

(function () {
  initGridStack();
})();
