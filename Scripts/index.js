var Grid = [];
var context;
var canvasElement;
var height = 100;
var width = 100;
var dropletX = 1;
var dropletY = 1;

function onLoad() {
  canvasElement = document.getElementById("canvas");
  context = canvasElement.getContext("2d");

  for(var i = 0; i < height; ++i) {
    for (var j = 0; j < width; ++j) {
      Grid.push(new Droplet(dropletX*i,dropletY*j, dropletX, dropletY));
    }
  }

  window.setInterval("GameLoop()", 30);
  window.setInterval("randomlyStimulate()", 15);
}

function GameLoop() {
  Update();
  Render();
}

var length=(width*height);
function Update() {

  for(var i = 0; i < length; ++i) {
    var sum = 0;

    function applyLaw(gridCell) {
      if (typeof(gridCell) != 'undefined')
      {
        sum += gridCell.KineticEnergy;
        gridCell.KineticEnergy *= 0.996;
      }
    }

    applyLaw(Grid[i+1]);
    applyLaw(Grid[i-1]);
    applyLaw(Grid[i+width]);
    applyLaw(Grid[i-width]);
    applyLaw(Grid[i+width-1]);
    applyLaw(Grid[i-width-1]);
    applyLaw(Grid[i+width+1]);
    applyLaw(Grid[i-width+1]);

    if (Grid[i].KineticEnergy < sum/8){
      Grid[i].KineticEnergy = sum/8;
    }
  }
}

function Render() {
  context.clearRect(0,0,height,width);

  Grid.forEach(function (element) {
    if (element.KineticEnergy > 0.1)  element.Render(context);
  });

  context.globalAlpha = 0.1;
  context.fillStyle = "rgb(25%, 65%,75%)";
  context.fillRect(0,0, height, width);
}

function randomlyStimulate()
{
  var randomIndex = Math.floor(Math.random() * Grid.length);
  var epicentre = Grid[randomIndex];
  epicentre.Stimulate(1);
}
