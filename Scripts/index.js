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
  console.log("looping");
  context.clearRect(0, 0, canvasElement.Width, canvasElement.Height);
  //if (Math.random() > 0.1)
  randomlyStimulate();
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

function randomlyStimulate()
{
  var num = Math.floor(Math.random() * Grid.length);
  console.log("Stimulating " + num);
  Grid[num].Stimulate(0.8);
}
