var Grid = [];
var context;
var canvasElement;
var height = 100;
var width = 50;
var dropletX = 0.5;
var dropletY = 0.5;

function onLoad() {
  canvasElement = document.getElementById("canvas");
  context = canvasElement.getContext("2d");

  for(var i = 0; i < height; ++i) {
    for (var j = 0; j < width; ++j) {
      Grid.push(new Droplet(dropletX*i,dropletY*j, dropletX, dropletY));
    }
  }

  Grid.forEach(function(element) {
    element.Update();
  });

  window.setInterval("GameLoop()", 30);
  window.setInterval("randomlyStimulate()", 300);
}

function GameLoop() {
  Update();
  Render();
}

var length=(width*height);
function Update() {
  for(var i = 0; i < length; ++i) {
    var sum = 0;
    var r = 0;
    var g = 0;
    var b = 0;

    function applyLaw(gridCell) {
      if (typeof(gridCell) != 'undefined')
      {
        sum += gridCell.KineticEnergy;
        gridCell.KineticEnergy *= 0.996;
        r += gridCell.Red;
        g += gridCell.Green;
        b += gridCell.Blue;
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

    if (Grid[i].KineticEnergy <= (sum/8))
    {
      //console.log(sum / 8);
      Grid[i].KineticEnergy = sum / 8;
    }

    if (Grid[i].Red > r/8) {
      //Grid[i].Red = r/8;
    }

    if (Grid[i].Green > g/8)
    {
      //Grid[i].Green = g/8;
    }

    if (Grid[i].Blue > 0 )
    {
      //Grid[i].Blue = b/8;
    }

    Grid[i].Update();
  }
}

function Render() {
  Grid.forEach(function (element) {
    element.Render(context);
  });
}

function randomlyStimulate()
{
  var randomIndex = Math.floor(Math.random() * Grid.length);
  var epicentre = Grid[randomIndex];
  epicentre.ResetColour();
  epicentre.Stimulate(1.75);
}
