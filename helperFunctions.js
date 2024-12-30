function HelperFunctions() {

	//p5.dom click events. Notice that there is no this. at the
	//start we don't need to do that here because the event will
	//be added to the button and doesn't 'belong' to the object

	//event handler for the clear button event. Clears the screen
	select("#clearButton").mouseClicked(function() {
		background("white");// Resets the background colour to white
        toolbox.tools[8].currentShape = [];// Clears the currentShape array in the editable shapes tool
        toolbox.tools[8].removedVertices = [];// Clears the removedVertices array in the editable shapes tool
        
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		loadPixels();
	});

	//event handler for the save image button. saves the canvas to the
	//local file system.
	select("#saveImageButton").mouseClicked(function() {
        saveCanvas("myDrawing", "jpg");
	});
}