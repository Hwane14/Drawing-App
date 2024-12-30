function EditableShapeTool(){
    this.icon = "assets/edit.webp";
    this.name = "editableShape";
    
    var self = this;
    var editMode = false;
    var fillMode = false;
    
    this.currentShape = [];// An array to store the coordinates of the vertices
    this.removedVertices = [];// An array to store the coordinates of the removed vertices
    
    this.draw = function()
    {
        if(mouseIsPressed && this.mousePressOnCanvas(canvasContainer))
        {
            if(!editMode)
            {
                //Pushes x & y coordinates to current shape array everytime the mouse is pressed on the canvas
                this.currentShape.push({
                    x: mouseX,
                    y: mouseY
                });
            }
            else
            {
                //If the distance between any of the points is less than 15, that points' x and y co-ordinates are then set to the mouseX and y position
                for(var i = 0; i < this.currentShape.length; i++)
                {
                    var distance = dist(this.currentShape[i].x, this.currentShape[i].y, mouseX, mouseY);
                    if (distance < 15) 
                    {
                        this.currentShape[i].x = mouseX;
                        this.currentShape[i].y = mouseY;
                    }
                }
            }
        }
        updatePixels();//Ensures only the latest changed line is being kept on the canvas and not all of them
        
        //Sets the fill or stroke based on the fillMode flag
        if(fillMode) 
        {
            fill(colourP.selectedColour);
        }
        else
        {
            stroke(colourP.selectedColour);
        }
        //Draws shape to screen using coordinates stored in currentShape array
        beginShape();
        for(var i = 0; i < this.currentShape.length; i++) 
        {
            vertex(this.currentShape[i].x, this.currentShape[i].y);
            if(editMode)
            {
                //push() and pop() ensure rest of drawing is not affected
                push();
                fill(255, 0, 0);
                ellipse(this.currentShape[i].x, this.currentShape[i].y, 10);//Adds a red circle to each vertice when edit button is pressed
                pop();
            }
        }
        endShape(CLOSE);
    };
    
    
    this.unselectTool = function() 
    {
        select(".options").html("");
        //In the case that the user switches to another tool while in 
        //edit mode the code below performs the same actions as the finish button
        editMode = false;//Prevents the draw function below from redrawing the shape with the red circles(Does not enter if statement on line 44 that draws the red circles) 
        self.draw();//Removes red circles
        //loadPixels();//Saves the plotted points to the canvas
        self.currentShape = [];//Clears array so new shape can be drawn
    };
    
    
    this.populateOptions = function() 
    {
        //Creates HTML elementfor edit button
        select(".options").html(
            "<button class = 'buttons' id = 'editButton'>Edit Shape</button>");
        //Creates HTML element for finish button
        select(".options").html(
            "<button class = 'buttons' id = 'finishButton'>Finish Shape</button>", true);
        //Creates HTML element for colour button(fill & outline)
        select(".options").html(
            "<button class = 'buttons' id = 'colourButton' >Select Fill (Current Mode: Stroke)</button>", true);
        //Creates HTML element for the undo button
        select(".options").html(
            "<button class = 'buttons' id = 'undoButton' >Undo</button>", true);
        //Creates HTML element for the redo button
        select(".options").html(
            "<button class = 'buttons' id = 'redoButton' >Redo</button>", true);
    
        select("#finishButton").mouseClicked(function() {
            //Sets edit mode to false so drawing can begin instantly, without having
            //to switch modes if finish button was pressed straight after editing the previous shape
            editMode = false;
            select("#editButton").html("Edit Shape");
            //Removes red circles
            self.draw();
            //Saves the plotted points to the canvas
            loadPixels();
            //Clears array so new shape can be drawn
            self.currentShape = [];
        });
        
        //Event handler for the edit/add vertices button
        select("#editButton").mouseClicked(function() {
            if(editMode){
                editMode = false;
                select("#editButton").html("Edit Shape");
            }
            else{
                editMode = true;
                select("#editButton").html("Add Vertices");
            }
        });
        
        //Event handler for the select fill/stroke button
        select("#colourButton").mouseClicked(function() {
            if(!fillMode) {
                fillMode = true;
                select("#colourButton").html("Select Stroke (Current Mode: Fill)");
            }
            else{
                fillMode = false;
                select("#colourButton").html("Select Fill (Current Mode: Stroke)");
            }
        });
        
        //Event handler for the undo button
        select("#undoButton").mouseClicked(function() {
            //Length of the currentShape array
            var arrLength = self.currentShape.length;
            
            //Only attempts an undo if length of array currentShape is 1 or more to prevent app from crashing
            if(arrLength == 0)
                {
                    return;
                }
            
            //Removes the last element(vertex coordinates x & y) of the array and
            //stores its value in the removedVertices array to be used in the redo button
            var deletion = self.currentShape.pop();
            
            //Removes any duplicates the removed coordinates have so button
            //doesnt have to be pressed multiple times for a single undo
            for (var i = 0; i < self.currentShape.length; i++)
                {
                    if(self.currentShape[i].x == deletion.x &&
                       self.currentShape[i].y == deletion.y)
                    {
                        //Removes object at index i
                        self.currentShape.splice(i, 1);
                    }
                }
            //Pushes the coordinates of the removed vertex into the removedVertices array
            self.removedVertices.push(deletion);
        });
        
        //Event handler for the redo button
        select("#redoButton").mouseClicked(function() {
            //Length of the removedVertices array
            var arrayLength = self.removedVertices.length;
            
            //Only attempt a push if length of array removedVertices is 1 or more to prevent app from crashing
            if(arrayLength == 0)
                {
                    return;
                }
            //Pushes the last vertex that was removed back into the currentShape array using the arrayLength variable
            self.currentShape.push(self.removedVertices[arrayLength - 1]);
            //Removes newly pushed vertex from removedVertices array(it was in the last index)
            //so that if the redo button is pressed again, the same vertex won't be pushed 
            self.removedVertices.pop();
        });
    };
    
    
    this.mousePressOnCanvas = function(canvas) 
    {
        if(mouseX > canvas.elt.offsetLeft &&
           mouseX < (canvas.elt.offsetLeft + canvas.width) &&
           mouseY > canvas.elt.offsetTop &&
           mouseY < (canvas.elt.offsetTop + canvas.height - 35))
        {
            return true;
        }
        return false;
    };
}