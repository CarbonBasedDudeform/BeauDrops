var Grid = [];
var context;
var canvasElement;

function onLoad() {
  canvasElement = document.getElementById("canvas");
  context = canvasElement.getContext("2d");

  for(var i = 0; i < 50; ++i) {
    for (var j = 0; j < 25; ++j) {
      Grid.push(new Droplet(6*i,6*j, 5, 5));
    }
  }

  window.setInterval("GameLoop()", 30);
}

function GameLoop() {
  context.clearRect(0, 0, canvasElement.Width, canvasElement.Height);
  Update();
  Render();
}

function Update() {
  Grid.forEach(function(element) {
    element.Update();
  });
}

function Render() {
  Grid.forEach(function (element) {
    element.Render(context);
  });
}
