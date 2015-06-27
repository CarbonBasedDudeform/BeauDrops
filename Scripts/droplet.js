var Droplet = function(x,y, width, height)
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Colour = "rgb(33%, 33%, 33%)";
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

  this.Render = function(context) {
    context.globalAlpha = this.KineticEnergy;
    context.fillStyle = this.Colour;
    context.fillRect(this.X,
                     this.Y,
                     this.Width,
                     this.Height);
    context.globalAlpha = 1;
  }

  this.Stimulate = function(energy) {
    this.KineticEnergy = energy;
  }
};
