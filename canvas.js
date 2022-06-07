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
//event listener to get the closest shadow's information
document.addEventListener('click', (event) => {
	const rect = canvas2.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	var bdist = [];
	var tdist = [];
	if (event.clientX > rect.left && event.clientX < rect.right && event.clientY > rect.top && event.clientY < rect.bottom){
		console.log(`x:${x} y:${y}\neventX:${event.clientX} eventY:${event.clientY}\nrect.left:${rect.left} rect.top:${rect.top}\nrect.right:${rect.right} rect.bottom:${rect.bottom}`);
		if (bshadows.length >0){
			console.log(true);
			for (let i = 0; i < bshadows.length; i++){
				let dist = ((x - bshadows[i].x)**2 + (y - bshadows[i].y)**2)**.5
				bdist.push(dist)
			}
			//console.log(bdist);
			console.log(Math.min(...bdist));
			console.log(bdist.indexOf(Math.min(...bdist)));
			for (let i = 0; i < tshadows.length; i++){
				let dist = ((x - tshadows[i].x)**2 + (y - tshadows[i].y)**2)**.5
				tdist.push(dist)
			}
			//console.log(tdist);
			console.log(Math.min(...tdist));
			console.log(tdist.indexOf(Math.min(...tdist)));
			if (Math.min(...bdist) < Math.min(...tdist)){
				console.log(bshadows[bdist.indexOf(Math.min(...bdist))]);
			} else if (Math.min(...tdist) < Math.min(...bdist)){
				console.log(tshadows[tdist.indexOf(Math.min(...tdist))]);
			} else {
				console.log(bshadows[bdist.indexOf(Math.min(...bdist))]);
			};
		} else {
			console.log(false)
		}
	}
});


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
		console.log(loaded)
		if (clicked == 1) {
			btn.classList.add("circle");
			btn.innerHTML = "X";
			clicked= clicked*-1;
			bxvalin = document.getElementById("bxval").value;
			console.log(`first x: ${bxvalin}`);
			bxvalin = bxvalin.replace(/[^0-9.-]/gi,'');
			console.log(`After replace x: ${bxvalin}`);
			if (bxvalin == '' || isNaN(parseInt(bxvalin))){
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
			console.log(`first x: ${txvalin}`);
			txvalin = txvalin.replace(/[^0-9.-]/gi,'');
			console.log(`After replace x: ${txvalin}`);
			if (txvalin == '' || isNaN(parseInt(txvalin))){
				txvalin = 0
				console.log(`inside If`)
			};
			txveli = parseInt(txvalin);
			console.log(`after Int parse x: ${txveli}`)
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
				console.log(`first call:${zerosTO}`)
			} else if ((xveli != 0 || yveli != 0 || txveli != 0 || tyveli != 0 ) && idle == 0){
				idle = 1;
				idleTO = setTimeout(AnimateBtn,300000);
				console.log(`idleTO active:${idleTO}`)
			};
		} else if (clicked == -1) {
			bshadows = [];
			tshadows = [];
			if(zeroed == 1){
				zeroed = 0;
				console.log(`second call:${zerosTO}`)
				clearTimeout(zerosTO)
			} else if (idle ==1){
				idle = 0;
				console.log(`idleTO clicked:${idleTO}`)
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
				"x_vel":xveli,
				"y_vel":yveli
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
		"x_vel":xveli,
		"y_vel":yveli
	};
	let tshadow = {
		"id":"t"+tshadows.length,
		"x":txpos,
		"y":typos,
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
