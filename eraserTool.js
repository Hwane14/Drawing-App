function EraserTool(){
	//set an icon and a name for the object
	this.icon = "assets/eraser.png";
	this.name = "eraser";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function()
    {
        if(mouseIsPressed)
        {
            //check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1)
            {
                previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else
            {
                stroke(255);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else
        {
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
    
    //Removes eraser width selector when you choose another tool and
    //removes the white stroke so the colour in other tools is that of
    //the selected colour
    this.unselectTool = function()
    {
        select(".options").html("");
        noStroke();
        strokeWeight(1);
    };
    
    this.populateOptions = function()
    {
        // Creates the selector in the element that has the class "options" in the index.html file
        select(".options").html(
            "<label for='eraserSizeSlider'>Eraser Width: </label>");
        select(".options").html(
            "<input id = 'eraserSizeSlider' type = 'range' value = '1' min = '1' max = '100'>", true);
        
        //Event handler for the slider
        select("#eraserSizeSlider").mouseClicked(function(){
            //Value of slider stored in variable and then used in strokeWeight
            //function everytime mouse is pressed on slider(slider dragged)
            var eraserWidth = document.getElementById("eraserSizeSlider").value;
            strokeWeight(eraserWidth);
        });
    };
}