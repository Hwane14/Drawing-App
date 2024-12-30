// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;

function setup() {

	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');// Returns the element that has the ID "content"
	var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);// Creates a canvas with the same dimensions as the content ID in the CSS file
	c.parent("content");// Puts the canvas within the element that has the ID "content"
    
    //create a toolbox for storing the tools
	toolbox = new Toolbox();

	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new MirrorDrawTool());
    toolbox.addTool(new ShapesTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new StarTool());
    toolbox.addTool(new FloodFillTool());
    loadPixels();
    toolbox.addTool(new EditableShapeTool());
	background(255);
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}
