var loaded = 0;
var xveli = 0;
var yveli = 0;
var txveli = 0;
var tyveli = 0;
var idle = 0;
var zeroed = 0;
var zerosTO = -1;
var idleTO = -1;
var bshadows = [];
var tshadows = [];
console.log(loaded)

CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  this.beginPath();
  this.moveTo(x+r, y);
  this.arcTo(x+w, y,   x+w, y+h, r);
  this.arcTo(x+w, y+h, x,   y+h, r);
  this.arcTo(x,   y+h, x,   y,   r);
  this.arcTo(x,   y,   x+w, y,   r);
  this.closePath();
  return this;
}



//event listener to get the closest shadow's information
document.addEventListener('click', (event) => {
	ctx4.clearRect(0,0,canvas2.width,canvas2.height);
	const rect = canvas2.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	var bdist = [];
	var tdist = [];
	if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom){
		console.log(`x:${x} y:${y}\neventX:${event.clientX} eventY:${event.clientY}\nrect.left:${rect.left} rect.top:${rect.top}\nrect.right:${rect.right} rect.bottom:${rect.bottom}`);
		if (bshadows.length >0){
			//console.log(true);
			for (let i = 0; i < bshadows.length; i++){
				let dist = ((x - bshadows[i].x)**2 + (y - bshadows[i].y)**2)**.5
				bdist.push(dist)
			}
			//console.log(bdist);
			//console.log(Math.min(...bdist));
			//console.log(bdist.indexOf(Math.min(...bdist)));
			for (let i = 0; i < tshadows.length; i++){
				let dist = ((x - tshadows[i].x)**2 + (y - tshadows[i].y)**2)**.5
				tdist.push(dist)
			}
			//console.log(tdist);
			//console.log(Math.min(...tdist));
			//console.log(tdist.indexOf(Math.min(...tdist)));
			if (Math.min(...bdist) < Math.min(...tdist)){
				//console.log(bshadows[bdist.indexOf(Math.min(...bdist))]);
				index = bdist.indexOf(Math.min(...bdist));
				//console.log(bshadows[index].x);
				highlight(index,"b");

			} else if (Math.min(...tdist) < Math.min(...bdist)){
				//console.log(tshadows[tdist.indexOf(Math.min(...tdist))]);
				index = tdist.indexOf(Math.min(...tdist));
				highlight(index,"t");
			} else {
				//console.log(bshadows[bdist.indexOf(Math.min(...bdist))]);
				index1 = bdist.indexOf(Math.min(...bdist));
				highlight(index1,"b");
				index2 = tdist.indexOf(Math.min(...tdist));
				highlight(index2,"t");
				display(bshadows,"red","blue","#e75480","#5b92e5",-240,0,index1);
			};
		} else {
			console.log(false)
		}
	}
});

//Highlight and Display
function highlight(index,type){
	//Colors and set reference
	if (type == "b"){
		var xcolor = "#e75480";//Dark Pink
		var ycolor = "#5b92e5";//United Nations Blue
		var totalcolor = "#df73ff";//Heliotrope
		var color1 = "red";//Ball Velocity
		var color2 = "blue";//Thrower Velocity
		var shadows = bshadows;
	} else if (type == "t"){
		var xcolor = "#800000";//Maroon
		var ycolor = "#191970";//Midnight Blue
		var totalcolor = "#663399";//Rebecca Purple
		var color1 = "blue";//Thrower Velocity
		var color2 = "red";//Ball Contribution
		var shadows = tshadows;
	};
	//X Vector
	ctx4.beginPath();
	ctx4.moveTo(shadows[index].x,shadows[index].y);
	ctx4.lineTo(shadows[index].x + 10*shadows[index].x_vel,shadows[index].y);
	ctx4.lineWidth = "3";
	ctx4.strokeStyle = xcolor;
	ctx4.stroke();
	//Y Vector
	ctx4.beginPath();
	ctx4.moveTo(shadows[index].x + 10*shadows[index].x_vel,shadows[index].y);
	ctx4.lineTo(shadows[index].x + 10*shadows[index].x_vel,shadows[index].y + 10*shadows[index].y_vel);
	ctx4.lineWidth = "3";
	ctx4.strokeStyle = ycolor;
	ctx4.stroke();
	//Total Vector
	ctx4.beginPath();
	ctx4.moveTo(shadows[index].x,shadows[index].y);
	ctx4.lineTo(shadows[index].x + 10*shadows[index].x_vel,shadows[index].y + 10*shadows[index].y_vel);
	ctx4.lineWidth = "3";
	ctx4.strokeStyle = totalcolor;
	ctx4.stroke();
	//Ball Shadow highlight
	if (type == "b"){
		ctx4.beginPath();
		ctx4.arc(shadows[index].x, shadows[index].y, 15, 0, Math.PI * 2, false);
		ctx4.fillStyle = "orange";
		ctx4.fill();
		ctx4.lineWidth = "2";
		ctx4.strokeStyle = "darkred";
		ctx4.stroke();
	} else if (type == "t"){
		ctx4.beginPath();
		ctx4.arc(shadows[index].x, shadows[index].y, 15, 0, Math.PI * 2, false);
		ctx4.fillStyle = "green";
		ctx4.fill();
		ctx4.lineWidth = "2";
		ctx4.strokeStyle = "darkblue";
		ctx4.stroke();
	};
	//Rect
	display(shadows,color1,color2,xcolor,ycolor,0,0,index)
}

//Info Discplay Rectangle

function display(shadows,color1,color2,xcolor,ycolor,xshift,yshift,index){
	//Rect
	let width = 230;
	let height = 75;
	let startx = cw - width -10;
	let starty = ch - height -10;
	let radius = 20;
	let offset = 4;
	ctx4.fillStyle = "darkslategrey";
	ctx4.roundRect(startx+offset+xshift,starty+offset+yshift,width,height,radius).fill()
	ctx4.fillStyle = "lightgrey";
	ctx4.strokeStyle = "darkgrey";
	ctx4.lineWidth = "2";
	ctx4.roundRect(startx+xshift,starty+yshift,width,height,radius).fill();
	ctx4.roundRect(startx+xshift,starty+yshift,width,height,radius).stroke();
	//Output X Vel
	ctx4.font = "15px Arial";
	ctx4.fillStyle = "black";
	ctx4.textAlign = "left";
	ctx4.fillText(`Total X Velocity: ${shadows[index].x_vel} = `,cw-width+10+xshift,ch-height+10+yshift,125)
	ctx4.fillStyle = color1;
	ctx4.textAlign = "left";
	ctx4.fillText(`${shadows[index].x_veli} `,cw-width+10+125+xshift,ch-height+10+yshift,20);
	ctx4.fillStyle = "black";
	ctx4.textAlign = "left";
	ctx4.fillText(`+ `,cw-width+10+125+20+xshift,ch-height+10+yshift,15);
	ctx4.fillStyle = color2;
	ctx4.textAlign = "left";
	ctx4.fillText(`${shadows[index].x_vel - shadows[index].x_veli}`,cw-width+10+125+35+xshift,ch-height+10+yshift,20);
	//Output Y Vel
	ctx4.font = "15px Arial";
	ctx4.fillStyle = "black";
	ctx4.textAlign = "left";
	ctx4.fillText(`Total Y Velocity: ${-1*shadows[index].y_vel} = `,cw-width+10+xshift,ch-height+10+20+yshift,125)
	ctx4.fillStyle = color1;
	ctx4.textAlign = "left";
	ctx4.fillText(`${-1*shadows[index].y_veli} `,cw-width+10+125+xshift,ch-height+10+20+yshift,20);
	ctx4.fillStyle = "black";
	ctx4.textAlign = "left";
	ctx4.fillText(`+ `,cw-width+10+125+20+xshift,ch-height+10+20+yshift,15);
	ctx4.fillStyle = color2;
	ctx4.textAlign = "left";
	ctx4.fillText(`${-1*(shadows[index].y_vel - shadows[index].y_veli)}`,cw-width+10+125+35+xshift,ch-height+10+20+yshift,20);
	//Output Total
	ctx4.font = "15px Arial";
	ctx4.fillStyle = "black";
	ctx4.textAlign = "left";
	ctx4.fillText(`Total Speed: ${(Math.round((10*((shadows[index].y_vel)**2 + (shadows[index].x_vel)**2)**.5)))/10} =   `,cw-width+10+xshift,ch-height+10+45+yshift,125)
	ctx4.fillStyle = xcolor;//Color Depends
	ctx4.textAlign = "left";
	ctx4.fillText(`${shadows[index].x_vel}^2 `,cw-width+10+130+xshift,ch-height+10+45+yshift,25);
	ctx4.fillStyle = "black";
	ctx4.textAlign = "left";
	ctx4.fillText(`+ `,cw-width+10+130+25+xshift,ch-height+10+45+yshift,10);
	ctx4.fillStyle = ycolor;//Color Depends
	ctx4.textAlign = "left";
	ctx4.fillText(`${-1*(shadows[index].y_vel)}^2`,cw-width+10+130+35+xshift,ch-height+10+45+yshift,25);
	//Square Root
	ctx4.beginPath();
	ctx4.moveTo(cw-width+10+117+xshift,ch-height+10+45-7+yshift);
	ctx4.lineTo(cw-width+10+119+xshift,ch-height+10+45-10+yshift);
	ctx4.lineTo(cw-width+10+123+xshift,ch-height+10+45+yshift);
	ctx4.lineTo(cw-width+10+123+xshift,ch-height+10+45-15+yshift);
	ctx4.lineTo(cw-width+10+130+60+xshift,ch-height+10+45-15+yshift);
	ctx4.lineWidth = "1";
	ctx4.strokeStyle = "black";
	ctx4.stroke();
};


//Button toggle
	var clicked = 1
	var btn = document.querySelector(".btn");

	function inner(x){
//		console.log(`btn.innerHTML:${btn.innerHTML}`)
//		console.log(`btn classList:${btn.classList}`)
		if (btn.innerHTML == "X" && btn.classList.contains("circle")== false){
			var string = x.toString();
			btn.innerHTML = string;
//			console.log(`did the thing string:${string}`)
//			console.log(`btn classList:${btn.classList}`)
//			console.log(`btn classList.contains(circle):${btn.classList.contains("circle")}`)
		}
	};
	
	function AnimateBtn(){
		var loaded = 1
		//console.log(loaded)
		if (clicked == 1) {
			btn.classList.add("circle");
			btn.innerHTML = "X";
			clicked= clicked*-1;
			bxvalin = document.getElementById("bxval").value;
			//console.log(`first x: ${bxvalin}`);
			bxvalin = bxvalin.replace(/[^0-9.-]/gi,'');
			//console.log(`After replace x: ${bxvalin}`);
			if (bxvalin == '' || isNaN(parseInt(bxvalin))){
				bxvalin = 0
				//console.log(`inside If`)
			};
			xveli = parseInt(bxvalin);
			//console.log(`after Int parse x: ${xveli}`);
			if (xveli > 10 || xveli < -10){
				if (xveli >0){
					xveli = 10
				} else {
					xveli = -10
				}
			};
			document.getElementById("bxval").value = xveli;
			byvalin = document.getElementById("byval").value;
			byvalin = byvalin.replace(/[^0-9.-]/gi,'');
			if (byvalin == '' || isNaN(parseInt(byvalin))){
				byvalin = 0
			};
			yveli = parseInt(byvalin);
			if (yveli > 10 || yveli < -10){
				if (yveli >0){
					yveli = 10
				} else {
					yveli = -10
				}
			};
			document.getElementById("byval").value = yveli;
			yveli = yveli * -1;
			//thrower
			txvalin = document.getElementById("txval").value;
			//console.log(`first x: ${txvalin}`);
			txvalin = txvalin.replace(/[^0-9.-]/gi,'');
			//console.log(`After replace x: ${txvalin}`);
			if (txvalin == '' || isNaN(parseInt(txvalin))){
				txvalin = 0
				//console.log(`inside If`)
			};
			txveli = parseInt(txvalin);
			//console.log(`after Int parse x: ${txveli}`)
			if (txveli > 10 || txveli < -10){
				if (txveli >0){
					txveli = 10
				} else {
					txveli = -10
				}
			};
			document.getElementById("txval").value = txveli;
			tyvalin = document.getElementById("tyval").value;
			tyvalin = tyvalin.replace(/[^0-9.-]/gi,'');
			if (tyvalin == '' || isNaN(parseInt(tyvalin))){
				tyvalin = 0
			};
			tyveli = parseInt(tyvalin)
			if (tyveli > 10 || tyveli < -10){
				if (tyveli >0){
					tyveli = 10
				} else {
					tyveli = -10
				}
			};
			document.getElementById("tyval").value = tyveli;
			tyveli = tyveli * -1;
			ctx2.clearRect(0,0,canvas2.width,canvas2.height);
			createball();
			if (xveli == 0 && yveli == 0 && txveli == 0 && tyveli == 0 && zeroed == 0){
				zeroed = 1;
				zerosTO = setTimeout(AnimateBtn,10000);
				//console.log(`first call:${zerosTO}`)
			} else if ((xveli != 0 || yveli != 0 || txveli != 0 || tyveli != 0 ) && idle == 0){
				idle = 1;
				idleTO = setTimeout(AnimateBtn,300000);
				//console.log(`idleTO active:${idleTO}`)
			};
		} else if (clicked == -1) {
			ctx4.clearRect(0,0,canvas4.width,canvas4.height);
			bshadows = [];
			tshadows = [];
			if(zeroed == 1){
				zeroed = 0;
				//console.log(`second call:${zerosTO}`)
				clearTimeout(zerosTO)
			} else if (idle ==1){
				idle = 0;
				//console.log(`idleTO clicked:${idleTO}`)
				clearTimeout(idleTO)
			}
			btn.classList.remove("circle");
			if(btn.innerHTML != "Start"){
				const myTimeout = setTimeout(inner,500,"Start");
			};
			clicked= clicked*-1;
			cancelAnimationFrame(ballid)
			ctx2.clearRect(0,0,canvas2.width,canvas2.height);
			xvel = 0;
			yvel = 0;
			txvel = 0;
			tyvel = 0;
			//console.log(document.getEventListeners())
			baseball();
		}
	};






//canvas background
var canvas = document.getElementById("graph");
var ch = window.innerHeight*.75
var cw = window.innerWidth - 20
var img = document.getElementById("Logo")
console.log(canvas);
canvas.width= cw;
canvas.height= ch;

var ctx = canvas.getContext('2d');


//background
ctx.fillStyle = "rgba(110,110,110,0.5)";
ctx.fillRect(0, 0, cw, ch);

//x bars

for (let i =0; i<10; i++) {
ctx.beginPath();
ctx.moveTo(0, (ch/10)*i);
ctx.lineTo(cw, (ch/10)*i);
ctx.strokeStyle = "lightgrey";
ctx.stroke();
};

//y bars

for (let i =0; i<10; i++) {
ctx.beginPath();
ctx.moveTo((cw/10)*i,0);
ctx.lineTo((cw/10)*i,ch);
ctx.strokeStyle = "lightgrey";
ctx.stroke();
};

//x - axis
ctx.beginPath();
ctx.moveTo(0, ch * 0.5);
ctx.lineTo(cw, ch * 0.5);
ctx.lineWidth = "2";
ctx.strokeStyle = "rgba(110,110,110,1)";
ctx.stroke();

//y - axis
ctx.beginPath();
ctx.moveTo(cw * 0.5, 0);
ctx.lineTo(cw * 0.5, ch);
ctx.strokeStyle = "rgba(110,110,110,1)";
ctx.stroke();

//Layer 1

var canvas2 = document.getElementById("ball");
console.log(canvas2);
canvas2.width= cw;
canvas2.height= ch;

var ctx2 = canvas2.getContext('2d');

//ball
function baseball(){
	//thrower
	ctx2.beginPath();
	ctx2.arc(cw * 0.5, ch * 0.5, 15, 0, Math.PI * 2, false);
	ctx2.fillStyle = "blue";
	ctx2.fill();
	ctx2.lineWidth = "2";
	ctx2.strokeStyle = "darkblue";
	ctx2.stroke();
	//ball
	ctx2.beginPath();
	ctx2.arc(cw * 0.5, ch * 0.5, 15, 0, Math.PI * 2, false);
	ctx2.fillStyle = "red";
	ctx2.fill();
	ctx2.lineWidth = "2";
	ctx2.strokeStyle = "darkred";
	ctx2.stroke();
}

if (loaded == 0) {
baseball()
}

//ball velocity
var xvel = xveli;
var yvel = yveli;
var txvel = txveli;
var tyvel = tyveli;

var ballid;

//ball function
function createball(){
	ballid = requestAnimationFrame(createball);
	ctx2.clearRect(0,0,canvas2.width,canvas2.height);
	//pos
	var txpos = cw * 0.5 + txvel;
	var typos = ch * 0.5 + tyvel;
	var bxpos = cw * 0.5 + xvel + txvel;
	var bypos = ch * 0.5 + yvel + tyvel;
	//distance line
	ctx2.beginPath();
	ctx2.moveTo(bxpos,bypos);
	ctx2.lineTo(txpos,typos);
	ctx2.strokeStyle = "rgba(255,255,0,.8)";
	ctx2.stroke();
	//thrower
	ctx2.beginPath();
	ctx2.arc(txpos, typos, 15, 0, Math.PI * 2, false);
	ctx2.fillStyle = "blue";
	ctx2.fill();
	ctx2.lineWidth = "2";
	ctx2.strokeStyle = "darkblue";
	ctx2.stroke();
	//ball
	ctx2.beginPath();
	ctx2.arc(bxpos, bypos, 15, 0, Math.PI * 2, false);
	ctx2.fillStyle = "red";
	ctx2.fill();
	ctx2.lineWidth = "2";
	ctx2.strokeStyle = "darkred";
	ctx2.stroke();
	xvel += xveli;
	yvel += yveli;
	txvel += txveli;
	tyvel += tyveli;
	if (bxpos > cw || bxpos < 0 || bypos > ch || bypos < 0 || txpos > cw || txpos <0 || typos > ch || typos <0) {
		cancelAnimationFrame(ballid);
		for (let i = 0; i < 5; i++){
			//thrower
			ctx2.beginPath();
			var txshadow = cw * 0.5 + -1*i*(cw * 0.5 - txpos)/5;
			var tyshadow = ch * 0.5 + -1*i*(ch * 0.5 - typos)/5;
			console.log(`txshadow :${txshadow} tyshadow:${tyshadow}`)
			ctx2.arc(txshadow, tyshadow, 15, 0, Math.PI * 2, false);
			ctx2.fillStyle = "rgba(0,0,255,.25)";
			ctx2.fill();
			ctx2.lineWidth = "2";
			ctx2.strokeStyle = "rgba(0,0,255,.5)";
			ctx2.stroke();
			let tshadow = {
				"id":"t"+i,
				"x":txshadow,
				"y":tyshadow,
				"x_veli":txveli,
				"y_veli":tyveli,
				"x_vel":txveli,
				"y_vel":tyveli
			}
			tshadows.push(tshadow)
			//ball
			ctx2.beginPath();
			var bxshadow = cw * 0.5 + -1*i*(cw * 0.5 - bxpos)/5;
			var byshadow = ch * 0.5 + -1*i*(ch * 0.5 - bypos)/5;
			console.log(`bxshadow :${bxshadow} byshadow:${byshadow}`)
			ctx2.arc(bxshadow, byshadow, 15, 0, Math.PI * 2, false);
			ctx2.fillStyle = "rgba(255,0,0,.25)";
			ctx2.fill();
			ctx2.lineWidth = "2";
			ctx2.strokeStyle = "rgba(255,0,0,.5)";
			ctx2.stroke();
			let bshadow = {
				"id":"b"+i,
				"x":bxshadow,
				"y":byshadow,
				"x_veli":xveli,
				"y_veli":yveli,
				"x_vel":xveli+txveli,
				"y_vel":yveli+tyveli
			}
			bshadows.push(bshadow)
			//distance line
			ctx2.beginPath();
			ctx2.moveTo(bxshadow,byshadow);
			ctx2.lineTo(txshadow,tyshadow);
			ctx2.strokeStyle = "rgba(255,255,0,.25)";
			ctx2.stroke();
		}
	//adding final shadows
	let bshadow = {
		"id":"b"+bshadows.length,
		"x":bxpos,
		"y":bypos,
		"x_veli":xveli,
		"y_veli":yveli,
		"x_vel":xveli+txveli,
		"y_vel":yveli+tyveli
	};
	let tshadow = {
		"id":"t"+tshadows.length,
		"x":txpos,
		"y":typos,
		"x_veli":txveli,
		"y_veli":tyveli,
		"x_vel":txveli,
		"y_vel":tyveli
	};
	bshadows.push(bshadow);
	tshadows.push(tshadow);
	console.log(bshadows);
	console.log(tshadows);
	}

}

//Layer 2

var canvas3 = document.getElementById("A+");
console.log(canvas3);
canvas3.width= cw;
canvas3.height= ch;

var ctx3 = canvas3.getContext('2d');

//logo
ctx3.drawImage(img,10,10,cw*.05,cw*.05);


//Layer 3 - Selector
var canvas4 = document.getElementById("select");
console.log(canvas4);
canvas4.width= cw;
canvas4.height= ch;

var ctx4 = canvas4.getContext('2d');