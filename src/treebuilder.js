let width = window.innerWidth;
let height = window.innerHeight;
let frameRate = 1/40;
let canvas = "";
let ctx = "";
let mouse = {
	x: 0,
	y: 0
};
let data = {};

const initializetree = (d) => {
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;

	data = d;

	document.addEventListener("mousemove", function(e){
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}, false);

	document.addEventListener("resize", resizeCanvas, false);

	frame();
};

const frame = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if(Object.getOwnPropertyNames(data).length > 0){
		drawtree(data, window.innerWidth/2, window.innerHeight/2, -90, 2);
	}

	window.requestAnimationFrame(frame);
};

const resizeCanvas = () => {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
};

const drawtree = (data, x1, y1, angle, depth) => {
	if(data.doc_count && typeof(data.fltr) !== "undefined"){
		let lastangle = 0;
		data.fltr.buckets.map((innerdata) => {
			if(typeof(innerdata.animated) === "undefined"){
				innerdata.animated = {
					x: Math.floor(Math.random() * 10) - 5,
					y: Math.floor(Math.random() * 10) - 5,
					forthx: true,
					forthy: true
				}
			}

			const index = innerdata.doc_count / data.doc_count;
			const BRANCH_LENGTH = 80 * depth;
			const newangle = lastangle + (360 / data.fltr.buckets.length);
			lastangle = newangle;
			const x2 = x1 + (cos(newangle) * depth * BRANCH_LENGTH);
			const y2 = y1 + (sin(newangle) * depth * BRANCH_LENGTH);
			
			if(innerdata.animated.forthx){
				innerdata.animated.x += (index/4);
			} else{
				innerdata.animated.x -= (index/4);
			}
			
			if(innerdata.animated.x > 10){
				innerdata.animated.forthx = false;
			} else if(innerdata.animated.x < -10){
				innerdata.animated.forthx = true;
			}

			if(innerdata.animated.forthy){
				innerdata.animated.y += (index/4);
			} else{
				innerdata.animated.y -= (index/4);
			}
			
			if(innerdata.animated.y > 10){
				innerdata.animated.forthy = false;
			} else if(innerdata.animated.y < -10){
				innerdata.animated.forthy = true;
			}

			drawline( x1, y1, x2, y2, index, depth, innerdata.key + " - " + innerdata.doc_count, innerdata.animated);
			drawtree(innerdata, x2, y2, newangle, depth - 1);
			//drawtree(innerdata, x2, y2, angle);
		});
		
	}
};

const drawline =  (x1, y1, x2, y2, thickness, depth, str, animate) => {
	ctx.strokeStyle = '#ecf0f1';
	const r = 150;
	let fontsize = 10 * depth;

	if(depth === 1){
		x2 += animate.x;
		y2 += animate.y;
	}
	
	if(pointInCircle(mouse.x, mouse.y, x2, y2, r)){

		const angle = Math.atan2(mouse.y - y2, mouse.x - x2);
		const d = Math.sqrt( (mouse.x-x2)*(mouse.x-x2) + (mouse.y-y2)*(mouse.y-y2) );
		x2 += (d-r) * Math.cos(angle);
		y2 += (d-r) * Math.sin(angle);

		fontsize += (r-d)/20;
	}

	if(pointInCircle(mouse.x, mouse.y, x1, y1, r)){

		const angle = Math.atan2(mouse.y - y1, mouse.x - x1);
		const d = Math.sqrt( (x1-mouse.x)*(x1-mouse.x) + (y1-mouse.y)*(y1-mouse.y) );
		x1 += (d-r) * Math.cos(angle);
		y1 += (d-r) * Math.sin(angle);
	}

	ctx.lineWidth = thickness * 0.6;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2, y2);
	ctx.fillStyle = '#ecf0f1';
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x2, y2, 5, 0, 2 * Math.PI, false);
	ctx.closePath();
	ctx.stroke();
	ctx.font = fontsize + "px monospace";
	ctx.fillText(str, x2 + 15, y2 + 3);
};

const cos = angle => Math.cos(deg_to_rad(angle));
const sin = angle => Math.sin(deg_to_rad(angle));
const deg_to_rad = angle => angle * (Math.PI/180.0);
const pointInCircle = (x, y, cx, cy, radius) => {
  const distancesquared = (x - cx) * (x - cx) + (y - cy) * (y - cy);
  return distancesquared <= radius * radius;
};
export {
	initializetree
}