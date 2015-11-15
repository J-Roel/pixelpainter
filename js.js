var PixelPainter = function() {



	function buildCanvas(x,y){
		if(x > 100){ x = 100; }
		if(x <= 0){ x = 1; }
		if(y > 100){ y = 100; }
		if(y <= 0){ y = 1; }

		nX = parseInt(x);
		nY = parseInt(y);


		console.log('Reticulating Splines');//simcity... loved that game
		for (var i = 1; i <= nX; i++) { //loop through our rows
	    	var divX = document.createElement('div');//Make a div element
	    	for (var j = 1; j <= nY; j++) { //loop through our columns
	        	var divY = document.createElement('div'); //
	        		divY.className = 'pixel';
	        		divX.appendChild(divY);
	   		}
	   		canvas.appendChild(divX);
		}
		newSize = (25*nX) + 10;
		var strSize = newSize.toString() + "px";
		
		canvas.style.width = strSize;
		console.log("Canvas width: " , canvas.style.width, " : " + strSize);


	}
	

	//Define vars - get DOM elements here so we don't have to keep asking for them
	//every time we call a function.
	var curColor = 'rgba(0,0,0,1)'; //default color
	var colorMode = 1; //default mode
	var eraser = false; //set default
	var palette = document.getElementById("palette");// the parent of our color elements
	var divs = document.getElementsByClassName('color'); //all of the color elements
	var canvas = document.getElementById("canvas"); //the parent of our pixels to "draw" on
	var paint  = true;
	var cPalette = [ '#33FFFF','#33FFCC','#33FF99','#33FF66','#33FF33','#33FF00'
					,'#33CCFF','#33CCCC','#33CC99','#33CC66','#33CC33','#33CC00'
					,'#3399FF','#3399CC','#339999','#339966','#339933','#339900'
					,'#3366FF','#3366CC','#336699','#336666','#336633','#336600'
					,'#3333FF','#3333CC','#333399','#333366','#333333','#333300'
					,'#3300FF','#3300CC','#330099','#330066','#330033','#330000'
					,'#00FFFF','#00FFCC','#00FF99','#00FF66','#00FF33','#000000'
					,'#ffffff','#CCCCCC','#DDDDDD'];
	function buildPalette() {
		//Build our color palette
		console.log('Building Palette', cPalette.length);
			for (i = 0; i < cPalette.length; i++) {
				var colorS = document.createElement('span');
				colorS.className = 'color';
				colorS.style.backgroundColor = cPalette[i];
				palette.appendChild(colorS);
	   		}
	}
	function addToPalette(str) {
			var colorS = document.createElement('span');
			colorS.className = 'color';
			colorS.style.backgroundColor = str;
			palette.appendChild(colorS);
	}


	//MOUSE ACTION TO CHANGE THE PIXELS
	function pixelFunk(event) {
		console.log(event);
		if (event.which === 1) {
			
			if(event.target.className === "pixel") //check to see if we clicked on a pixel
			{
				if(eraser) {
					event.target.style.backgroundColor = '';
					event.target.style.border = "1px solid #000";
					event.target.style.borderRadius = "4px";
				} else {
					event.target.style.border = "none";
					event.target.style.borderRadius = "0";
 					event.target.style.backgroundColor = curColor;
 				}
 				

			} else if(event.target.className === "color") //or on a color
			{
				curColor = event.target.style.backgroundColor;
				
				
				for(var i = 0; i < divs.length; i++ ) {
					divs[i].style.border = "none";
					divs[i].style.borderRadius = "50%";
				}
				event.target.style.border = "3px solid #fff";
				event.target.style.borderRadius = "5px";

			}
		}
	};
	window.addEventListener('mousedown', pixelFunk);





	var cPaint = document.getElementById('cMode1');
	cPaint.addEventListener('click', function f() {
			paint = true;
			eraser = false;
	});
	var mRoller = document.getElementById('cMode2');
	cMode2.addEventListener('click', function f() {
			colorMode = 2;
	});

	var mBox = document.getElementById('cMode3');
	mBox.addEventListener('click', function f() {
			colorMode = 3;
	});

	//ERASER
	var cEraser = document.getElementById('cEraser');
	cEraser.addEventListener('click', function f() {
			eraser = true;
			paint = false;
	});

	//MAKE GRID
	var makeGrid = document.getElementById("makeGrid")
	makeGrid.addEventListener('click',function func() {
		var pixelS = document.getElementsByClassName('pixel');
		for(var i = 0; i <= pixelS.length+2; i++) {
			canvas.removeChild(canvas.childNodes[0]);
		}

		var x = document.getElementById('gridx').value;
		var y = document.getElementById('gridy').value;
		buildCanvas(x,y);
	});


	//CUSTOM COLOR
	var customC = document.getElementById('customColor');
	customC.addEventListener('click', function customColor(event) {
		var nC = window.prompt("Enter color: ie: R,G,B,A");
		var str = '';

		str += 'rgba(';
		str += nC;
		str += ")"
		console.log(str);
		curColor = str;
		
		//add this to our palette
		cPalette.push(str);
		addToPalette(str);
	});


	//CLEAR PICTURE
	var cClear = document.getElementById('cClear');
	cClear.addEventListener('click', function customColor(event) {
		var divs = document.getElementsByClassName('pixel');
		console.log(divs.length);
		for(var i = 0; i < divs.length; i++)
		{
			divs[i].style.backgroundColor = 'transparent'
			divs[i].style.border = "1px solid #000";
			divs[i].style.borderRadius = "4px";			

		}
	});


	//TOGGLE GRID
	var customC = document.getElementById('toggleGrid');
	toggleGrid.addEventListener('click', function customColor(event) {
		var divs = document.getElementsByClassName('pixel');
		var chk = divs[0].style.border;
		console.log(chk);
		if(chk == "none")
		{	
			console.log("adding");
			for(i = 0; i < divs.length; i++)
			{
				if(divs[i].style.backgroundColor == '')
				{
					divs[i].style.border = "1px solid #000";
					divs[i].style.borderRadius = "4px";
				}
			}
		} else {	
			console.log("removing");
			for(i = 0; i < divs.length; i++)
			{
					divs[i].style.border = "none";
					divs[i].style.borderRadius = "0";
			}
		}

	});



//BUILDCANVAS 
//takes 3 arguments
// x - width of the canvas
// y - height of the canvas
buildCanvas(100,100);//30 is the default grid size
buildPalette();









}();