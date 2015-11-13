var PixelPainter = function() {



	function buildCanvas(x,y){
		console.log('Reticulating Splines');
		var canvas = document.getElementById("canvas");
		for (var i = 1; i <= x; i++) {
	    	var divX = document.createElement('div');
	    	for (var j = 1; j <= y; j++) {
	        	var divY = document.createElement('div');
	        		divY.className = 'pixel';
	        		divX.appendChild(divY);
	   		}
	   		canvas.appendChild(divX);
		}


	}
	

	//Define vars
	var curColor = 'rgba(0,0,0,1)'; //default color
	var colorMode = 1; //default mode
	var eraser = false;
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
			var palette = document.getElementById("palette");
			for (var i = 0; i < cPalette.length; i++) {
				var colorS = document.createElement('span');
				colorS.className = 'color';
				colorS.style.background = cPalette[i];
				palette.appendChild(colorS);
	   		}
	}


	//MOUSE ACTION TO CHANGE THE PIXELS
	function pixelFunk(event) {
		console.log(event);
		if (event.which === 1) {
			
			if(eraser) {
					event.target.style.background = 'transparent'
					event.target.style.border = "1px solid #000";
					event.target.style.borderRadius = "4px";
			} else if (paint){

				if(event.target.className === "pixel") 
				{
					event.target.style.border = "none";
					event.target.style.borderRadius = "0";
	 				event.target.style.background = curColor;
				} else if(event.target.className === "color")
				{
					curColor = event.target.style.backgroundColor;
					
					var divs = document.getElementsByClassName('color');
					for(var i = 0; i < divs.length; i++ ) {
						divs[i].style.border = "none";
						divs[i].style.borderRadius = "0";
					}
					event.target.style.border = "1px solid #000";
					event.target.style.borderRadius = "10px";
				}
			}
		}
	};




	window.addEventListener('click', pixelFunk);

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




	//CUSTOM COLOR
	var customC = document.getElementById('customColor');
	customC.addEventListener('click', function customColor(event) {
		var nC = window.prompt("Enter color: ie: R,G,B,A");
		var str = '';

		str += 'rgba(';
		str += nC;
		str += ")"
		console.log(nC);
		curColor = str;
	});


	//CLEAR PICTURE
	var cClear = document.getElementById('cClear');
	cClear.addEventListener('click', function customColor(event) {
		var divs = document.getElementsByClassName('pixel');
		console.log(divs.length);
		for(var i = 0; i < divs.length; i++)
		{
			divs[i].style.background = 'transparent'
			divs[i].style.border = "1px solid #000";
			divs[i].style.borderRadius = "4px";			

		}
	});


	//TOGGLE GRID
	var customC = document.getElementById('toggleGrid');
	toggleGrid.addEventListener('click', function customColor(event) {
		var divs = document.getElementsByClassName('pixel');
		var chk = divs[0].style.border;//check an initial pixel to see if grid is active
		console.log(chk);
		if(chk == "none")
		{	
			for(i = 0; i < divs.length; i++)
			{
				if(divs[i].style.border != 'transparent')
				{
					divs[i].style.border = "1px solid #000";
					divs[i].style.borderRadius = "4px";
				}
			}
		} else {	
			for(i = 0; i < divs.length; i++)
			{
				if(divs[i].style.border != 'transparent')
				{
					divs[i].style.border = "none";
					divs[i].style.borderRadius = "0";
				}
			}
		}

	});



//BUILDCANVAS 
//takes 3 arguments
// x - width of the canvas
// y - height of the canvas
buildCanvas(20,25);
buildPalette();

}();