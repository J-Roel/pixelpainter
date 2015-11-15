window.onload = function(){ //program contianer function


	/*
		Pixel Painter - by jroel
	*/
	

	//Define vars - get DOM elements here so we don't have to keep asking for them
	//every time we call a function.
	var curColor = 'rgba(0,0,0,1)'; //default color
	var colorMode = 1; //default mode
	var x = '32'; //default grid width
	var y = '32'; //default grid height
	var eraser = false; //set default
	var palette = document.getElementById("palette");// the parent of our color elements
	var colors = document.getElementsByClassName('color'); //all of the color elements
	var canvas = document.getElementById("canvas"); //the parent of our pixels
	var pixels = document.getElementsByClassName('pixel'); //all of the pixel elements
	var zoom = 25;
	var cPalette = [ '#33FFFF','#33FFCC','#33FF99','#33FF66','#33FF33','#33FF00'
					,'#33CCFF','#33CCCC','#33CC99','#33CC66','#33CC33','#33CC00'
					,'#3399FF','#3399CC','#339999','#339966','#339933','#339900'
					,'#3366FF','#3366CC','#336699','#336666','#336633','#336600'
					,'#3333FF','#3333CC','#333399','#333366','#333333','#333300'
					,'#3300FF','#3300CC','#330099','#330066','#330033','#330000'
					,'#00FFFF','#00FFCC','#00FF99','#00FF66','#00FF33','#000000'
					,'#ffffff','#CCCCCC','#DDDDDD'];
	


	//BUILD CANVAS ----------------------------------------------------------------
	function buildCanvas(x,y){
		if(x > 128){ x = 128; } //check our numbers and hold them in a range.
		if(x <= 0){ x = 4; }
		if(y > 128){ y = 128; }
		if(y <= 0){ y = 4; }

		nX = parseInt(x); //change to numbers so we can use them in the
		nY = parseInt(y); //process below

		console.log('Reticulating Splines');
		for (var i = 1; i <= nX; i++) { //loop through our rows
	    	var divX = document.createElement('div');//Make a div element
	    	for (var j = 1; j <= nY; j++) { //loop through our columns
	        	var divY = document.createElement('div'); // make another div
	        		divY.className = 'pixel'; //change that div's class to pixel
	        		divX.appendChild(divY); //append to our X (aka row)
	   		}
	   		canvas.appendChild(divX); //then append to our canvas
		}

		//Next refactor the width of our canvas to accomodate the new size
		/*
			This should be straightforward, but I am having
			problems forcing the canvas width to a proper size.
			So I push 500 on the end of it so the inline-block so it
			doesn't mess up how the grid sets. A conflict with the width and inline-block.
		*/
		newSize = (zoom*nX) + nX; //zoom is our 'global' setting, * user info from html input		
		var strSize = newSize.toString() + "px"; //set our data to a string and append px to the end
		canvas.style.width = strSize; //finally adjust our canvas width property.
	}

	//MAKE GRID -- our listner function for rebuilding the canvas.-----------------
	var makeGrid = document.getElementById("makeGrid")
	makeGrid.addEventListener('click',function func() {
		for(var i = 0; i <= pixels.length+2; i++) { //loop through pixels
			canvas.removeChild(canvas.childNodes[0]); //delete the pixels
		}

		var x = document.getElementById('gridx').value; //get our values from the inputs
		var y = document.getElementById('gridy').value;
		buildCanvas(x,y); //call buildCanvas function to build the canvas with the new inputs
	});


	//BUILD PALETTE -------------------------------------
	function buildPalette() {
		console.log('Building Palette', cPalette.length);
			for (i = 0; i < cPalette.length; i++) { //loop through our color palette array
				var colorS = document.createElement('div'); //create a new element for our color
				colorS.className = 'color';//assign the class to our element.
				colorS.style.backgroundColor = cPalette[i]; //then color it per our palette.
				palette.appendChild(colorS); //append this to our color container "colorS"
	   		}

	   		var pixels = document.getElementsByClassName('pixel');
	}

	//ADD TO PALETTE--------------------------------------
	// This works in relation to the listener customColor below
	// this function is different than buildPalette... 
	// theres no need to rebuild the palette when are simply adding an element.
	function addToPalette(str) {
			var colorS = document.createElement('div');//build a single div for our new color
			colorS.className = 'color'; //Set it's className
			colorS.style.backgroundColor = str; //str is passed from our customColor listner function
			palette.appendChild(colorS); //Once our new color is setup... append it to our colorS container

	}
	//CUSTOM COLOR
	var customColor = document.getElementById('customColor'); //our listener to customColor
	customColor.addEventListener('click', function customColor(event) {
		var nC = window.prompt("Enter color: ie: R,G,B,A");//TODO, make an input box instead
		
		//Next make up the rgba string we'll pass to our palette so we can setup a color.
		var str = ''; //make sure the string has nothing in it when we make it.
		str += 'rgba('; //we add rgba( to the front of the string.
		str += nC; //add our input from user. TODO: needs validation here.
		str += ")" //add the ending on the string.
		
		curColor = str; //pass the string to our "global" variable curColor for painting
		
		
		cPalette.push(str);//add this to our palette array
		//next we use the addToColor function to add this to our colorS container 
		//The reason I did this, is eventually, you can load color palettes
		//and add various colors by like a color picker, so I broke this up into
		//different functions.
		addToPalette(str); 
	});


	//MOUSE ACTION TO CHANGE THE PIXELS  ---------------------------
	//this is our main action handler. 
	function pixelFunk(event) {
		console.log(event);
		if (event.which === 1) {
			
			if(event.target.className === "pixel") //check to see if we clicked on a pixel
			{
				switch(colorMode)//Switch between our colorMode to determine what action to take
				{
					case 1://Paint
						event.target.style.border = "none";
						event.target.style.borderRadius = "0";
 						event.target.style.backgroundColor = curColor;
 						break;

 					case 5: //Eraser
						event.target.style.backgroundColor = '';
						event.target.style.border = "1px solid #000";
						event.target.style.borderRadius = "4px";
						break;
 				}

			} else if(event.target.className === "color") //if not a pixel...
			{
				curColor = event.target.style.backgroundColor; //simple to get the color
				
				//loop through palette and change our styles to see what
				//we have selected... thanks Alya!

				//First we have to deselect all of the colors
				for(var i = 0; i < colors.length; i++ ) { 
					colors[i].style.border = "none";
					colors[i].style.borderRadius = "50%";
				}

				//Then select the one we clicked on.
				event.target.style.border = "3px solid #fff";
				event.target.style.borderRadius = "5px";
			}
		}
	};
	window.addEventListener('mousedown', pixelFunk);




	//Listener function... changes our colorMode to paint
	var cPaint = document.getElementById('cMode1');
	cPaint.addEventListener('click', function f() {
			colorMode = 1;
	});

	//Listener function... changes our colorMode to Roller
	var mRoller = document.getElementById('cMode2');
	cMode2.addEventListener('click', function f() {
			colorMode = 2;
	});

	//Listner function... changes our colorMode to Erase
	var mBox = document.getElementById('cMode3');
	mBox.addEventListener('click', function f() {
			colorMode = 3;
	});

	//Listner function... changes our colorMode to Erase
	var cEraser = document.getElementById('cEraser');
	cEraser.addEventListener('click', function f() {
			colorMode = 5;
	});


	//CLEAR PICTURE
	//just loops through the canvas elements and changes them back
	//to orginal styles
	var cClear = document.getElementById('cClear');
	cClear.addEventListener('click', function customColor(event) {
		
		for(var i = 0; i < pixels.length; i++)
		{
			pixels[i].style.backgroundColor = '';
			pixels[i].style.border = "1px solid #000";
			pixels[i].style.borderRadius = "4px";			
		}
	});


	//TOGGLE GRID
	//This listener loops through the canvas elements and
	//if an element has a backgroudColor, it passes by it,
	//if it doesn't have a backgroundColor... it removes the border
	var toggleGrid = document.getElementById('toggleGrid');
	toggleGrid.addEventListener('click', function customColor(event) {
		

		var chk ='';
		for(var i = 0; i <= pixels.length;i++) {
			chk = pixels[i].style.border; //get style.border info from pixel
			
			if(chk == "none") //if the pixel border style is set to none we know they are off.
			{	
				console.log("adding"); //So we add them.
					if(pixels[i].style.backgroundColor == '') //check of there's no background
					{	 	
						//don't want to mess with elements that are painted.
						pixels[i].style.border = "1px solid #000"; //add the border
						pixels[i].style.borderRadius = "4px";
					}
			} else {	
				console.log("removing");
					pixels[i].style.border = "none";
					pixels[i].style.borderRadius = "0";
			}
		}

	});

	//ZOOM --------------------------------------------------------------
	//pretty straight forward function.... has break points to zoom in
	//more can be added. Even though I have having problems again with the
	//width functionality of the div element and forcing it to hold the
	//inline-block elements correctly.
	var cZoom = document.getElementById('zoom');
	cZoom.addEventListener('click', function f() {

			
			switch(zoom) {
				case 10: zoom = 10; break;
				case 15: zoom = 25; break;
				case 25: zoom = 35; break;
				case 35: zoom = 45; break;
				case 45: zoom = 55; break;
				case 55: zoom = 15; break;
				default: zoom = 25;
			}
			
			for(var i = 0; i < pixels.length; i++ ) {
				pixels[i].style.width = zoom.toString() + "px";
				pixels[i].style.height = zoom.toString() + "px";
			}

			newSize = (zoom*x)+ x;
			canvas.style.width = newSize.toString() + "px";;
	});



//BUILDCANVAS 
//takes 3 arguments
// x - width of the canvas
// y - height of the canvas
buildCanvas(x,y);//x = width, y = height of canvas per pixel
buildPalette();









}();