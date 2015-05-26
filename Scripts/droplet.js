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

  //red, green, blue as percentages
  this.SetColour = function(red, green, blue) {
    this.Colour = "rgb("+red +"%," + green + "%," + blue + "%)";
  }

  this.Update = function () {
    this.Red *= this.KineticEnergy;
    this.Green *= this.KineticEnergy;
    this.Blue *= this.KineticEnergy;

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
    this.KineticEnergy += energy;
  }
};
