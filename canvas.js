var loaded = 0;
var xveli = 0;
var yveli = 0;
var txveli = 0;
var tyveli = 0;
console.log(loaded)



//Button toggle
	var clicked = 1
	var btn = document.querySelector(".btn");

	function inner(x){
		var string = x.toString()
		btn.innerHTML = string
	}

	function AnimateBtn(){
		var loaded = 1
		console.log(loaded)
		if (clicked == 1) {
			btn.classList.add("circle");
			btn.innerHTML = "X";
			clicked= clicked*-1;
			//ball input
			bxvalin = document.getElementById("bxval").value;
			console.log(`first x: ${bxvalin}`);
			bxvalin = bxvalin.replace(/[^0-9.-]/gi,'');
			console.log(`After replace x: ${bxvalin}`);
			if (bxvalin == ''){
				bxvalin = 0
				console.log(`inside If`)
			};
			xveli = parseInt(bxvalin);
			console.log(`after Int parse x: ${xveli}`);
			if (xveli > 10 || xveli < -10){
				if (xveli >0){
					xveli = 10
				} else {
					xveli = -10
				};
			};
			document.getElementById("bxval").value = xveli;
			byvalin = document.getElementById("byval").value;
			byvalin = byvalin.replace(/[^0-9.-]/gi,'');
			if (byvalin == ''){
				byvalin = 0
			};
			yveli = parseInt(byvalin);
			if (yveli > 10 || yveli < -10){
				if (yveli >0){
					yveli = 10
				} else {
					yveli = -10
				};
			};
			document.getElementById("byval").value = yveli;
			yveli = yveli * -1;
			//thrower input
			txvalin = document.getElementById("txval").value
			console.log(`first x: ${txvalin}`)
			txvalin = txvalin.replace(/[^0-9.-]/gi,'')
			console.log(`After replace x: ${txvalin}`)
			if (txvalin == ''){
				txvalin = 0
				console.log(`inside If`)
			}
			txveli = parseInt(txvalin)
			console.log(`after Int parse x: ${txveli}`)
			if (txveli > 10 || txveli < -10){
				if (txveli >0){
					txveli = 10
				} else {
					txveli = -10
				}
			}
			document.getElementById("txval").value = txveli
			tyvalin = document.getElementById("tyval").value
			tyvalin = tyvalin.replace(/[^0-9.-]/gi,'')
			if (tyvalin == ''){
				tyvalin = 0
			}
			tyveli = parseInt(tyvalin)
			if (tyveli > 10 || tyveli < -10){
				if (tyveli >0){
					tyveli = 10
				} else {
					tyveli = -10
				}
			}
			document.getElementById("tyval").value = tyveli
			tyveli = tyveli * -1
			ctx2.clearRect(0,0,canvas2.width,canvas2.height);
			createball();
		} else if (clicked == -1) {
			btn.classList.remove("circle");
			const myTimeout = setTimeout(inner("Start"),1000)
			/*btn.innerHTML = "Start";*/
			clicked= clicked*-1;
			cancelAnimationFrame(ballid)
			ctx2.clearRect(0,0,canvas2.width,canvas2.height);
			xvel = 0
			yvel = 0
			txvel = 0
			tyvel = 0
			baseball()
		}
	}






//canvas background
var canvas = document.getElementById("graph");
var ch = window.innerHeight*.80
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
/*var ch = window.innerHeight*.80
var cw = window.innerWidth - 20
var img = document.getElementById("Logo")
*/
console.log(canvas2);
canvas2.width= cw;
canvas2.height= ch;

var ctx2 = canvas2.getContext('2d');

//ball
function baseball(){
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
	ctx2.beginPath();
	xpos = cw * 0.5 + xvel +txvel
	ypos = ch * 0.5 + yvel + tyvel
	ctx2.arc( xpos, ypos, 15, 0, Math.PI * 2, false);
	ctx2.fillStyle = "red";
	ctx2.fill();
	ctx2.lineWidth = "2";
	ctx2.strokeStyle = "darkred";
	ctx2.stroke();
	xvel += xveli;
	yvel += yveli;
	txvel += txveli;
	tyvel += tyveli;
	if (xpos > cw || xpos < 0 || ypos > ch || ypos <0){
		cancelAnimationFrame(ballid)
		console.log(`x final:${xpos},y final:${ypos}`)
		for (let k=0; k<5;k++){
			ctx2.beginPath();
			xshadow = cw*0.5 + -1*k*(cw*0.5-xpos)/5;
			yshadow = ch*0.5 + -1*k*(ch*0.5-ypos)/5;
			console.log(`xshadow:${xshadow} yshadow:${yshadow}`)
			ctx2.arc(xshadow,yshadow,15,0,Math.PI*2,false);
			ctx2.fillStyle = 'rgba(255,0,0,.25)';
			ctx2.fill();
			ctx2.lineWidth = "2";
			ctx2.strokeStyle = 'rgba(255,0,0,.5)';
			ctx2.stroke();
		}
		console.log("cancel")
	};
//	console.log(loaded)
}

//Layer 2

var canvas3 = document.getElementById("A+");
/*
var ch = window.innerHeight*.80
var cw = window.innerWidth - 20
var img = document.getElementById("Logo")
*/
console.log(canvas3);
canvas3.width= cw;
canvas3.height= ch;

var ctx3 = canvas3.getContext('2d');

//logo
ctx3.drawImage(img,10,10,cw*.05,cw*.05);