function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
                stroke(colourP.selectedColour);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
    
    // Removes pen width selector when you choose another tool
    this.unselectTool = function(){
        select(".options").html("");
        strokeWeight(1);// Resets the strokeweight so it won't carry over to the other tools
    };
    
    this.populateOptions = function(){
        // Creates the slider in the index.html file
        select(".options").html(
            "<label for='penSizeSlider'>Pen Width: </label>");
        select(".options").html(
            "<input id = 'penSizeSlider' name = 'penSizeInput' type = 'range' value = '1' min = '1' max = '100'>", true);
        
        // Event handler for the slider
        select("#penSizeSlider").mouseClicked(function(){
            //Value of slider stored in variable and then used in strokeWeight function everytime mouse is pressed on slider(slider dragged)
            var penWidth = document.getElementById("penSizeSlider").value;//Stores the value of the slider
            strokeWeight(penWidth); 
        });
    };
}