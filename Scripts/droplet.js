var Droplet = function(x,y, width, height)
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Colour = "rgb(100%, 100%, 100%)";
  this.Red = 25 * Math.random();
  this.Green = 50 * Math.random();
  this.Blue = 100 * Math.random();
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

    //if(this.KineticEnergy > 1) this.KineticEnergy = 0.9;
    //if (this.KineticEnergy < 0.1) this.KineticEnergy = 0.1;
  }

  this.Render = function(context) {
    context.globalAlpha = this.KineticEnergy;
    context.fillStyle = this.Colour;
    context.fillRect(this.X,
                     this.Y,
                     this.Width,
                     this.Height);
    context.globalAlpha = 1;
  }

  this.ResetColour = function (){
    this.Red = 25 * Math.random();
    this.Green = 50 * Math.random();
    this.Blue = 100 * Math.random();
  }

  this.Stimulate = function(energy) {
    this.KineticEnergy = energy;
    ResetColour();
  }
};
