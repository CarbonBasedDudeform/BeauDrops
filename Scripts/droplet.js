var Droplet = function(x,y, width, height)
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Colour = "rgb(100%, 100%, 100%)";
  this.Red = 0;//100 * Math.random();
  this.Green = 50 * Math.random();
  this.Blue = 100;// * Math.random();
  this.KineticEnergy = 0;
  this.RedWeight = 1;
  this.GreenWeight = 1;
  this.BlueWeight = 1;

  //red, green, blue as percentages
  this.SetColour = function(red, green, blue) {
    this.Colour = "rgb("+red +"%," + green + "%," + blue + "%)";
  }

  this.Update = function () {


    var r = this.Red;// * this.KineticEnergy;// * this.RedWeight;
    var g = this.Green;// * this.KineticEnergy;// * this.GreenWeight;
    var b = this.Blue;// * this.BlueWeight;


    this.SetColour(r,g,b);
  }

  this.Render = function(context) {
    context.globalAlpha = this.KineticEnergy;
    context.fillStyle = this.Colour;
    context.fillRect(this.X,
                     this.Y,
                     this.Width,
                     this.Height);
  }

  this.ResetColour = function (){
    this.Red = 0;
    this.Green = 50;
    this.Blue = 100;
  }

  this.Stimulate = function(energy) {
    this.KineticEnergy = energy;
    function range() {return 0.33;}

    this.RedWeight = Math.random() + range();
    if (this.RedWeight > 1) this.RedWeight = 0.5;
    this.GreenWeight = Math.random() + range();
    if (this.GreenWeight > 1) this.GreenWeight = 0.5;
    this.BlueWeight = Math.random() + range();
    if (this.BlueWeight > 1) this.BlueWeight = 0.5;

    this.Red *= this.RedWeight;
    this.Green *= this.GreenWeight;
    this.Blue *= this.BlueWeight;
  }
};
