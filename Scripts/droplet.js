var DEFAULT_DROPLET_COLOUR = "rgb(33%, 33%, 33%)";
var Droplet = function(x,y, width, height)
{
  this.Dimensions = {X: x, Y: y, Width: width, Height: height   }
  this.Colour = DEFAULT_DROPLET_COLOUR;
  this.KineticEnergy = 0;

  this.Render = function(context) {
    context.save();

    context.globalAlpha = this.KineticEnergy;
    context.fillStyle = this.Colour;
    context.fillRect(this.Dimensions.X,
                     this.Dimensions.Y,
                     this.Dimensions.Width,
                     this.Dimensions.Height);

    context.restore();
  }

  this.Stimulate = function(energy) {
    this.KineticEnergy = energy;
  }
};
