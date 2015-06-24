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
  window.setInterval("randomlyStimulate()", 1000);
  //randomlyStimulate();
}

function GameLoop() {
  context.clearRect(0, 0, canvasElement.Width, canvasElement.Height);
  Update();
  Render();
}

function Update() {


  for(var i = 0; i < (25*50); ++i) {
    var sum = 0;
    if (typeof(Grid[i+1]) != 'undefined')
    {
      sum += Grid[i+1].KineticEnergy;
      Grid[i+1].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i-1]) != 'undefined')
    {
      sum += Grid[i-1].KineticEnergy;
      Grid[i-1].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i+25]) != 'undefined')
    {
      sum += Grid[i+25].KineticEnergy;
      Grid[i+25].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i-25]) != 'undefined')
    {
      sum += Grid[i-25].KineticEnergy;
      Grid[i-25].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i+24]) != 'undefined')
    {
      sum += Grid[i+24].KineticEnergy;
      Grid[i+24].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i-24]) != 'undefined')
    {
      sum += Grid[i-24].KineticEnergy;
      Grid[i-24].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i+26]) != 'undefined')
    {
      sum += Grid[i+26].KineticEnergy;
      Grid[i+26].KineticEnergy *= 0.999;
    }

    if (typeof(Grid[i-26]) != 'undefined')
    {
      sum += Grid[i-26].KineticEnergy;
      Grid[i-26].KineticEnergy *= 0.999;
    }

    if (Grid[i].KineticEnergy < (sum/8))
    {
      //console.log(sum / 8);
      Grid[i].KineticEnergy = sum / 8;
    }
  }

  Grid.forEach(function(element) {
    element.KineticEnergy *= 0.99;
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
  var randomIndex = Math.floor(Math.random() * Grid.length);
  var epicentre = Grid[randomIndex];
  epicentre.ResetColour();
  epicentre.Stimulate(100);
}
