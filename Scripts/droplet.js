var Droplet = function(x,y, width, height)
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Colour = "rgb(100%, 100%, 100%)";
  this.Red = 100;
  this.Green = 100;
  this.Blue = 100;
  this.KineticEnergy = 1;
  this.RedWeight = 1;
  this.GreenWeight = 1;
  this.BlueWeight = 1;

  //red, green, blue as percentages
  this.SetColour = function(red, green, blue) {
    this.Colour = "rgb("+red +"%," + green + "%," + blue + "%)";
  }

  this.Update = function () {
    this.Red *= this.KineticEnergy * this.RedWeight;
    this.Green *= this.KineticEnergy * this.GreenWeight;
    this.Blue *= this.KineticEnergy * this.BlueWeight;

    this.SetColour(this.Red,
              this.Green,
              this.Blue);

    this.KineticEnergy *= Math.random() * (1.0 - 0.999) + 0.999;
  }

  this.Render = function(context) {
    context.fillStyle = this.Colour;
    context.fillRect(this.X,
                     this.Y,
                     this.Width,
                     this.Height);
  }

  this.Stimulate = function(energy) {
    this.Red = 100;
    this.Green = 100;
    this.Blue = 100;
    
    this.KineticEnergy += energy;
    function range() {return (0.6 - 0.333) + 0.333;}

    this.RedWeight = Math.random() * range();
    this.GreenWeight = Math.random() * range();
    this.BlueWeight = Math.random() * range();
  }
};
