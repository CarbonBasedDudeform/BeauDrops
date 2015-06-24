var Droplet = function(x,y, width, height)
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Colour = "rgb(100%, 100%, 100%)";
  this.Red = 0;
  this.Green = 0;
  this.Blue = 0;
  this.KineticEnergy = 0;
  this.RedWeight = 1;
  this.GreenWeight = 1;
  this.BlueWeight = 1;

  //red, green, blue as percentages
  this.SetColour = function(red, green, blue) {
    this.Colour = "rgb("+red +"%," + green + "%," + blue + "%)";
  }

  this.neighbours = [];
  this.AddNeighbour = function(neighbour) {
      if (typeof(neighbour) == 'undefined') return;

      this.neighbours.push(neighbour);
  }

  this.Update = function () {
    this.Red = this.KineticEnergy;// * this.RedWeight;
    this.Green = this.KineticEnergy;// * this.GreenWeight;
    this.Blue = this.KineticEnergy;// * this.BlueWeight;

    this.SetColour(this.Red,
              this.Green,
              this.Blue);

  /*  var sum = 0;

    this.neighbours.forEach(function(cur) {
        sum += cur.KineticEnergy;
        cur.KineticEnergy *= 0.999999;
    });

    sum /= this.neighbours.length;

    this.KineticEnergy = sum;
    this.KineticEnergy *= 0.999999;
    */
  }

  this.Render = function(context) {
    context.fillStyle = this.Colour;
    context.fillRect(this.X,
                     this.Y,
                     this.Width,
                     this.Height);
  }

  this.ResetColour = function (){
    this.Red = 100;
    this.Green = 100;
    this.Blue = 100;
  }

  this.Stimulate = function(energy) {
    this.KineticEnergy += energy;
    function range() {return 0.666;}

    this.RedWeight = Math.random() + range();
    if (this.RedWeight > 1) this.RedWeight = 1;
    this.GreenWeight = Math.random() + range();
    if (this.GreenWeight > 1) this.GreenWeight = 1;
    this.BlueWeight = Math.random() + range();
    if (this.BlueWeight > 1) this.BlueWeight = 1;
  }
};
