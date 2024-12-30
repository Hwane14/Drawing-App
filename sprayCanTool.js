function SprayCanTool()
{
    this.name = "sprayCanTool";
    this.icon = "assets/sprayCan.jpg";
    this.points = 13;
    this.spread = 10;
    var self = this;
    this.draw = function()
    {
        if(mouseIsPressed)
        {
            for(var i = 0; i < this.points; i++)
            {
                stroke(colourP.selectedColour);
                point(random(mouseX - this.spread, mouseX + this.spread), 
                      random(mouseY - this.spread, mouseY + this.spread));
            }
        }
    };
}