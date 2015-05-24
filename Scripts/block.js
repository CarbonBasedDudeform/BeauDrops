var Block = function(x,y, width, height)
{
  this.X = x;
  this.Y = y;
  this.Width = width;
  this.Height = height;
  this.Colour = "rgb(255, 255, 255)";

  this.SetColour = function(colour) {
    this.Colour = colour;
  }

  this.Render = function(context) {
    context.fillStyle = this.Colour;
    context.fillRect(this.X,
                     this.Y,
                     this.Width,
                     this.Height);
  }
};
