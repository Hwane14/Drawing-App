function LineToTool(){
	this.icon = "assets/lineTo.jpg";// Gets image from assets file 
	this.name = "LineTo";// Name of icon

	var startMouseX = -1;// Decalres and intialies startMouseX to -1(this can be any value (it will be changed to the mouse click x position later anyway), as long as its consistent throughout the code to avoid any errors.)
	var startMouseY = -1;// Decalres and intialies startMouseY to -1(this can be any value (it will be changed to the mouse click y position later anyway) and its not being checked so it doesn't have to be consistent throughout the code but its probably better to do so anyway)
	var drawing = false;// Declares and initialises drawing to false

	this.draw = function(){

		if(mouseIsPressed){// Checks if the mouse has been pressed and if it has then it will carry out the actions below otherwise it will jump to the else if statement at the bottom
			if(startMouseX == -1){
				startMouseX = mouseX;// Sets the start x value of the line equal to the x co-ordinate where the mouse is clicked
				startMouseY = mouseY;// Sets the start y value of the line equal to the y co-ordinate where the mouse is clicked
				drawing = true;// Sets drawing equal to true so more than one line can be drawn from a new starting point once the mouse is released and pressed again
				loadPixels();// Ensures that the line previously drawn doesn't disappear when the next line is drawn.
			}

			else{
				updatePixels();// Ensures that only one line is drawn per click and release of the mouse.
                stroke(colourP.selectedColour);
				line(startMouseX, startMouseY, mouseX, mouseY);// Draws a line from the point where the mouse is clicked(initialised above on line 13 and 14) to where it is released.
			}

		}
        
        
        // This block of code below resets both startMouseX and startMouseY to -1 when the mouse isnt being pressed so that it can get new startMouseX and startMouseY values when the user clicks to draw another line. Without this block of code, only one line can be drawn and it will be drawn from the same startMouseX and startMouseY point that the user initially set. Only the last 2 arguments of the line function on [line 21] will change based on where the user clicks.
        
		else if(drawing){// This basically is for if the mouse is not being pressed but drawing = true(this would be after a line has been drawn)then carry out the actions below
			drawing = false;// Everything still works without this line because drawing gets set to true on [line 15] anyway before it is checked again on [line 29] so it makes no difference. I would say its here just for logical reasons as if a line isnt being drawn then drawing should be equal to false
			startMouseX = -1;// This allows the if statement on line 12 to be entered so a new line can be drawn with different start and end positions
			startMouseY = -1;// This line isnt really needed either as startMouseX is the only one being checked on [line 12] so even if it stays as the value it was before it will be changed anyway on [line 14] so the code isnt impacted in any way
		}
	};

    // Removes the line width slider when you choose another tool
    this.unselectTool = function(){
        select(".options").html("");
        strokeWeight(1);// Resets the strokeweight so it won't carry over to the other tools
    };
    
    this.populateOptions = function(){
        // Creates the slider in the index.html file
        select(".options").html(
            "<label for='lineWidthSlider'>Line Width: </label>");
        select(".options").html(
            "<input id = 'lineWidthSlider' name = 'lineWidthInput' type = 'range' value = '1' min = '1' max = '100'>", true);
        
        // Event handler for the slider
        select("#lineWidthSlider").mouseClicked(function(){
            //Value of slider stored in variable and then used in strokeWeight function everytime mouse is pressed on slider(slider dragged)
            var lineWidth = document.getElementById("lineWidthSlider").value;//Stores the value of the slider
            strokeWeight(lineWidth); 
        });
    };

}
