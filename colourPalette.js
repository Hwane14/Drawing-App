//Displays and handles the colour palette.
function ColourPalette() {
	//a list of web colour strings
	this.colours = [
        "black", "silver", "gray", "white", "maroon", "red", "purple",
		"orange", "pink", "fuchsia", "green", "lime", "olive", "yellow", "navy",
		"blue", "teal", "aqua"
	];
	//make the start colour be black
	this.selectedColour = "black";

	var self = this;

	var colourClick = function() {
		//remove the old border
		var current = select("#" + self.selectedColour + "Swatch");
		current.style("border", "0");

		//get the new colour from the id of the clicked element
		var c = this.id().split("Swatch")[0];// Takes the colour value only and stores it in variable c

		//set the selected colour
		self.selectedColour = c;


		//add a new border to the selected colour
		this.style("border", "2px solid red");
	};

	//load in the colours
	this.loadColours = function() {
		//set the fill and stroke properties to be black at the start of the programme
		//running
		fill(this.colours[0]);
		stroke(this.colours[0]);

		//for each colour create a new div in the html for the colourSwatches
		for (var i = 0; i < this.colours.length; i++) {
			var colourID = this.colours[i] + "Swatch";

			// Add the swatch to the palette and set its background
			// colour to be the colour value.
			var colourSwatch = createDiv();
			colourSwatch.class("colourSwatches");// Adds a class called "colourSwatches" to the div (<div class = "colourSwatches"></div>)

			colourSwatch.id(colourID);// Adds an ID to div so now looks like: <div class = "colourSwatches" id = "colourName+Swatch"></div>

			select(".colourPalette").child(colourSwatch);// Puts colourSwatch, which is a div element, inside the element that has the class "colourPalette"
			select("#" + colourID).style("background-color", this.colours[i]);// Selects each palette and makes its colour match its name
			colourSwatch.mouseClicked(colourClick);// Calls the colourClick function when you choose a colour, selecting it and putting the red border around it(event handler)
		}

		select(".colourSwatches").style("border", "2px solid red");// Puts a red border around the black palette before anything is pressed because its the default colour
	};
	//call the loadColours function now it is declared
	this.loadColours();// Draws palette to screen
}
