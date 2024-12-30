function ShapesTool(){
    // Gets image from assets file(Attribution: https://www.flaticon.com/free-icons/geometry)
	this.icon = "assets/shapes.png";
    // Name of icon
	this.name = "shapesTool";
    
    // Binary flag for fill and stroke button
    var fillMode = false;
    var shapeMode = "rect";
    var self = this;
    
    //Decalres and intialies startMouseX to -1(this can be any value (it will be changed to
    //the mouse click x position later anyway), as long as its consistent throughout the code to avoid any errors.)
	var startMouseX = -1;
    //Decalres and intialies startMouseY to -1(this can be any value (it will be changed to 
    //the mouse click y position later anyway) and its not being checked so it doesn't have
    //to be consistent throughout the code but its probably better to do so anyway)
	var startMouseY = -1;
	var drawing = false;// Declares and initialises drawing to false

	this.draw = function()
    {
        if(mouseIsPressed)
        {
            if(startMouseX == -1)
            {
                startMouseX = mouseX;// Sets the start x value of the rectangle equal to the x co-ordinate where the mouse is clicked
				startMouseY = mouseY;// Sets the start y value of the rectangle equal to the y co-ordinate where the mouse is clicked
				drawing = true;// Sets drawing equal to true so more than one rectangle can be drawn from a new starting point once the mouse is released and pressed again
				loadPixels();// Ensures that the rectangle previously drawn doesn't disappear when the next shape is drawn.
			}

            else
            {
                updatePixels();// Ensures that only one rectangle is drawn per click and release of the mouse.
                //When fill mode is true the selected colour is the fill of the rectangle otherwise the selected colour is the stroke of the rectangle
                if(fillMode) {
                    fill(colourP.selectedColour);
                }
                else{
                    stroke(colourP.selectedColour);
                }
                //Draws shape corresponding to string value of shapeMode variable
                if(shapeMode == "rect")
                    {
                        rect(startMouseX, startMouseY, 
                             -startMouseX + mouseX, 
                             -startMouseY + mouseY);
                    }
                else if(shapeMode == "triangle")
                    {
                        if(startMouseX < mouseX)
                        {
                            // Draws the triangle when mouse moves to the right
                            triangle(startMouseX, startMouseY,
                                     mouseX, mouseY,
                                     startMouseX - -(startMouseX - mouseX), mouseY);
                        }
                        else
                        {
                            //Draws the triangle when mouse moves to the left
                            triangle(startMouseX, startMouseY,
                                     mouseX, mouseY,
                                     startMouseX + (startMouseX - mouseX), mouseY);
                        } 
                    }
                else if(shapeMode == "ellipse")
                    {
                        ellipse(startMouseX, startMouseY, (-startMouseX + mouseX) * 2, (-startMouseY + mouseY) * 2);
                    }
            }
        }
        
        
        /* This block of code below resets both startMouseX and startMouseY to -1 when the mouse isnt being pressed so that it can get new startMouseX and startMouseY values when the user clicks to draw another shape. Without this block of code, only one rectangle can be drawn and it will be drawn from the same startMouseX and startMouseY point that the user initially set. Only the last 2 arguments of the rect function on [line 30] will change based on where the user clicks. */
        
        //This basically is for if the mouse is not being pressed but drawing = true
        //(this would be after a shape has been drawn)then carry out the actions below
		else if(drawing)
        {
            // Sets drawing equal to false
			drawing = false;
            //This allows the if statement on line 14 to be entered so a new shape
            //can be drawn with different start and end positions
			startMouseX = -1;
            // This line isnt really needed either as startMouseX is the only one being checked on
            //[line 14] so even if it stays as the value it was before it will be changed anyway on
            //[line 16] so the code isnt impacted in any way
			startMouseY = -1;
		}
	};
    
    this.unselectTool = function() 
    {
        select(".options").html("");
        // Resets the strokeweight so it won't carry over to the other tools
        strokeWeight(1);
    };
    
    this.populateOptions = function() 
    {
        //Creates rectangle button in element with class options in the index.html file
        select(".options").html(
            "<button class = 'buttons' id = 'rectButton' >▢</button>");
        //Creates triangle button in element with class options in the index.html file
        select(".options").html(
            "<button class = 'buttons' id = 'triangleButton' >△</button>", true);
        //Creates ellipse button in element with class options in the index.html file
        select(".options").html(
            "<button class = 'buttons' id = 'ellipseButton' >◯</button>", true);
        //Creates colour button in element with class options in the index.html file
        select(".options").html(
            "<button class = 'buttons' id = 'fillButton' >Select Fill (Current Mode: Stroke)</button>", true);
        // Creates the slider in element with class options in the index.html file
        select(".options").html(
            "<br><br><br><label for='strokeSlider'>Stroke Weight: </label>", true);
        select(".options").html(
            "<input id = 'strokeSlider' name = 'strokeInput' type = 'range' value = '1' min = '1' max = '10'>", true);
        
        
        //Event handler for the colour button
        select("#fillButton").mouseClicked(function() {
            //If fill mode is false, set it to true when the button 
            //is pressed and change the inner html of the input element
            if(!fillMode) {
                fillMode = true;
                select("#fillButton").html("Select Stroke (Current Mode: Fill)");
            }
            //If fill mode is true, set it to false when the button 
            //is pressed and change the inner html of the input element
            else{
                fillMode = false;
                select("#fillButton").html("Select Fill (Current Mode: Stroke)");
            }
        });
        
        // Event handler for the slider
        select("#strokeSlider").mouseClicked(function(){
            //Value of slider stored in variable and then used in strokeWeight
            //function everytime mouse is pressed on slider(slider dragged)
            var strokeW = document.getElementById("strokeSlider").value;//Stores the value of the slider
            strokeWeight(strokeW); 
        });
        
        //Event handler for the rectangle button
        select("#rectButton").mouseClicked(function(){
            shapeMode = "rect"; 
        });
        //Event handler for the rectangle button
        select("#triangleButton").mouseClicked(function(){
            shapeMode = "triangle"; 
        });
        //Event handler for the rectangle button
        select("#ellipseButton").mouseClicked(function(){
            shapeMode = "ellipse";
        });
    };
}
