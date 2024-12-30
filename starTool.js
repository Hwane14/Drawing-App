function StarTool(){
	this.icon = "assets/star.webp";// Gets image from assets file 
	this.name = "starTool";// Name of icon

	var startMouseX = -1;// Decalres and intialies startMouseX
	var startMouseY = -1;// Decalres and intialies startMouseY
	var drawing = false;// Declares and initialises drawing to false
    var fillMode = false;
    

	this.draw = function()
    {
		if(mouseIsPressed)
        {
			if(startMouseX == -1)
            {
                startMouseX = mouseX;// Sets the start x value of the shape equal to the x co-ordinate where the mouse is clicked
				startMouseY = mouseY;// Sets the start y value of the shape equal to the y co-ordinate where the mouse is clicked
				drawing = true;// Sets drawing equal to true so more than one shape can be drawn from a new starting point once the mouse is released and pressed again
				loadPixels();// Ensures that the shape previously drawn doesn't disappear when the next shape is drawn.
			}

			else
            {
                //Sets what the colour is for based on the fillMode variable
                if(fillMode) 
                {
                    fill(colourP.selectedColour);
                }
                else
                {
                    stroke(colourP.selectedColour);
                }
				star(mouseX, mouseY, 7.5, 17.5, 5);// Draws star
			}

		}
        
        // This basically is for if the mouse is not being pressed but drawing = true
        //(this would be after a shape has been drawn)then carry out the actions below
		else if(drawing)
        {
            //Everything still works without this line because drawing gets set to true on
            //[line 15] anyway before it is checked again on [line 29] so it makes no difference. 
			drawing = false;
            // This allows the if statement on line 12 to be entered so a new shape can
            //be drawn with different start and end positions
			startMouseX = -1;
            // This line isnt really needed either as startMouseX is the only one being
            //checked on [line 12] so even if it stays as the value it was before it will
            //be changed anyway on [line 14] so the code isnt impacted in any way
			startMouseY = -1;
		}
	};
    
    function star(x, y, innerRadius, outerRadius, npoints)
    {
        var angle = TWO_PI / npoints;// Determines how far through the circle cycle an inner point of the star will be drawn
        var halfAngle = angle / 2.0;// Determines how far through the circle cycle an outer point of the star will be drawn
        beginShape();
        //Runs 5 times for each point of the star(inner and outer(10 points plotted in total))
        //since a starts at 0 and the angle variable is equal to TWO_PI/npoints.
        //So, 0 + (TWO_PI/npoints) * npoints gives you TWO_PI, terminating the for loop
        for (var i = 0; i < TWO_PI; i += angle)
        {
            var outerX = x + cos(i) * outerRadius;
            var outerY = y + sin(i) * outerRadius;
            vertex(outerX, outerY);//Plots outer points of star
            var innerX = x + cos(i + halfAngle) * innerRadius;
            var innerY = y + sin(i + halfAngle) * innerRadius;
            vertex(innerX, innerY);//Plots inner points of star
        }
        endShape(CLOSE);
}
    
    this.unselectTool = function() 
    {
        select(".options").html("");
    };
    
    this.populateOptions = function()
    {
        //Creates the colour button within the element that has the class "options"
        select(".options").html("<button id = 'fillButton' >Select Fill (Current Mode: Stroke)</button>");
        
        //Event handler for the colour button
        select("#fillButton").mouseClicked(function() {
            if(!fillMode) 
            {
                fillMode = true;
                select("#fillButton").html("Select Stroke (Current Mode: Fill)");
            }
            else
            {
                fillMode = false;
                select("#fillButton").html("Select Fill (Current Mode: Stroke)");
            }
        });
    };
}
