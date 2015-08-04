//html5 vars
var context;
var canvasElement;

//BeauDrops vars
var Grid = [];
var dims = {height: 100, width: 100, length: 100*100};
var gameRefreshRate = 30;
var rainRate = 15; //the interval between raindrops dropping.

//Sets up the environment
function onLoad() {
  canvasElement = document.getElementById("canvas");
  context = canvasElement.getContext("2d");

  Grid = GenerateDropletGrid();

  window.setInterval("GameLoop()",gameRefreshRate);
  window.setInterval("randomlyStimulate()", rainRate);
}

//creates a 2D array of Droplets
function GenerateDropletGrid() {
  var localGrid = [];
  var droplet= {width: 1, height: 1};
  var spacing = {x: 1, y: 1};

  for(var i = 0; i < dims.height; ++i) {
    for (var j = 0; j < dims.width; ++j) {
      localGrid.push(new Droplet(spacing.x*i,spacing.y*j, droplet.width, droplet.height));
    }
  }

  return localGrid;
}

//Updates before Rendering
function GameLoop() {
  Update();
  Render();
}

var AMOUNT_OF_NEIGHBOURS = 8;
function Update() {

  for(var i = 0; i < dims.length; ++i) {
    var NeighboursTotalEnergy = applyLawToNeighbourhood(i);

    var AverageEnergy = NeighboursTotalEnergy/AMOUNT_OF_NEIGHBOURS;
    var LowEnergy = Grid[i].KineticEnergy < AverageEnergy
    if ( LowEnergy ){
      Grid[i].KineticEnergy = AverageEnergy;
    }
  }
}

var decayRate = 0.994; //outside as a minor optimisation
function applyLawToNeighbourhood(centreCellIndex) {
      //applies a law if the cell is valid for it: currently, if the cell exists
      function applyValidLaw(gridCell, law) {
        var CellExists = typeof(gridCell) != 'undefined';
        if ( CellExists ) {
          law(gridCell);
        }
      }

      //laws of this world
      function lawOfDecay(gridCell) { gridCell.KineticEnergy *= decayRate;}
      function incrementTotalEnergy(gridCell) { totalEnergyInNeighbourhood += gridCell.KineticEnergy; }
      var totalEnergyInNeighbourhood = 0;

      //there must be a better way to do this...
      function applyToAllNeighbours(lawFunc) {
        //follows pattern:
        //  =============
        //  | a | b | c |
        //  |---|---|---|
        //  | d | * | e |
        //  |---|---|---|
        //  | f | g | h |
        //  =============
        // where:
        // * = centre cell
        /* a = */ applyValidLaw(Grid[centreCellIndex+1], lawFunc);
        /* b = */ applyValidLaw(Grid[centreCellIndex-1], lawFunc);
        /* c = */ applyValidLaw(Grid[centreCellIndex+dims.width], lawFunc);
        /* d = */ applyValidLaw(Grid[centreCellIndex-dims.width], lawFunc);
        /* e = */ applyValidLaw(Grid[centreCellIndex-dims.width-1], lawFunc);
        /* f = */ applyValidLaw(Grid[centreCellIndex+dims.width-1], lawFunc);
        /* g = */ applyValidLaw(Grid[centreCellIndex+dims.width+1], lawFunc);
        /* h = */ applyValidLaw(Grid[centreCellIndex-dims.width+1], lawFunc);
      }

      applyToAllNeighbours(lawOfDecay);
      applyToAllNeighbours(incrementTotalEnergy);

      return totalEnergyInNeighbourhood;

      //note to self: I should fit the word entropy in here somewhere...
}

//Does what it says on the tin: renders the droplets
function Render() {
  ClearScreen();
  RenderEnergeticDroplets();
  ResetRenderingConditions();
}

var defaultRect = {x: 0, y: 0, height: dims.height, width: dims.width};
//rendering function: clears screen...
function ClearScreen() {
  context.clearRect(defaultRect.x, defaultRect.y, defaultRect.height, defaultRect.width);
}

//renders droplets with Kinetic Energy above a threshold specified within func.
function RenderEnergeticDroplets() {
  var lowEnergyLimit = 0.07;

  Grid.forEach(function (element) {
    var ThereIsEnoughEnergy = element.KineticEnergy > lowEnergyLimit;
    if ( ThereIsEnoughEnergy )  element.Render(context);
  });
}

//resets render state to default eliminating chance of droplets render() leaving side-effects
function ResetRenderingConditions() {
  var defaultAlpha = 0.1;
  context.globalAlpha = defaultAlpha;
  var defaultColour = "rgb(25%, 65%,75%)";
  context.fillStyle = defaultColour;
  context.fillRect(defaultRect.x, defaultRect.y, defaultRect.height, defaultRect.width);
}

//randomly chooses a droplet in [0, |Grid|] and stimulates it
function randomlyStimulate()
{
  var randomIndex = Math.floor(Math.random() * Grid.length);
  var epicentre = Grid[randomIndex];
  epicentre.Stimulate(1);
}
