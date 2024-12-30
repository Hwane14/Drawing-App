function FloodFillTool() {
    this.icon = "assets/floodFill.png";
    this.name = "fill";
    
    
    this.draw = function() 
    {
        if (mouseIsPressed) 
        {
            //RGBA array of first replaced pixel
            var oldColour = get(mouseX, mouseY);
            //Floor function is used just to avoid floating point values
            floodFill(floor(mouseX), floor(mouseY), oldColour);
        }
    };
    
    function floodFill(x, y, oldColour)
    {
        /*Creating our own stack of coordinates to be coloured*/
        
        var fillCoordinates = [];// Array to store the stack
        
        fillCoordinates.push({x: x, y: y});// Pushes coordinates to the stack
        
        //Keeps running until the stack has no more coordinates
        while(fillCoordinates.length > 0)
            {
                // Stores the last x and y coordinates added to the fillCoordinates array
                var coords = fillCoordinates.pop();
                if (!onCanvas(coords.x, coords.y) || !isPixel(coords.x, coords.y, oldColour))
                {
                    //Jumps to the next iteration of the while loop if the pixel is not on the canvas
                    //or if its colour is not the same as the colour of the initial pixel that 
                    //was pressed, so only desired pixels are coloured
                    continue;
                }
                //Colours the pixel
                setPixel(coords.x, coords.y);
                
                //Pushes neighbouring pixels into stack to be coloured if both 
                //of the conditions are true(does not enter if statement above)
                fillCoordinates.push({x: coords.x + 1, y: coords.y});
                fillCoordinates.push({x: coords.x - 1, y: coords.y});
                fillCoordinates.push({x: coords.x, y: coords.y - 1});
                fillCoordinates.push({x: coords.x, y: coords.y + 1});
            }
    }
    
    function setPixel(x, y) 
    {
        push();
        stroke(colourP.selectedColour);
        point(x, y);
        pop();
    }
    
    function isPixel(x, y, oldColour) 
    {
        // Stores [R, G, B, A] array in ar variable
        var ar = get(x, y);
        
        //Returns true if pixels are the same colour as the colour of the original
        //pixel that was pressed so they can be replaced otherwise returns false
        if (ar[0] == oldColour[0] &&
            ar[1] == oldColour[1] &&
            ar[2] == oldColour[2])
            {
                return true;
            }
        return false;
    }
    
    function onCanvas(x, y) 
    {
        //Returns true if the pixel is on the canvas otherwise it returns false
        if (x >= 0 && x <= canvasContainer.width - 1 &&
            y >= 0 && y <= canvasContainer.height - 1) {
            return true;
        }
        return false;
    }
}