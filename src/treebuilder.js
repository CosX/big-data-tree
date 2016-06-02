let width = window.innerWidth;
let height = window.innerHeight;
let frameRate = 1/40;
let canvas = "";
let ctx = "";
let depth = 0;

const initializetree = (data) => {
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	window.addEventListener('resize', resizeCanvas, false);

	drawtree(data, 800, 800, -90);
};

const resizeCanvas = () => {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	ctx.shadowBlur = 50; 
};

const drawtree = (data, x1, y1, angle) => {
	depth++;
	if(data.doc_count && typeof(data.fltr) !== "undefined"){
		data.fltr.buckets.map((innerdata) => {
			const BRANCH_LENGTH = innerdata.doc_count;
			let newangle = angle + BRANCH_LENGTH;
			if (BRANCH_LENGTH % 2){
				newangle = angle - BRANCH_LENGTH;
			}
			
			const x2 = x1 + (cos(newangle) * depth * BRANCH_LENGTH);
			const y2 = y1 + (sin(newangle) * depth * BRANCH_LENGTH);
			
			drawline( x1, y1, x2, y2);
			drawtree(innerdata, x2, y2, newangle);
			//drawtree(innerdata, x2, y2, angle);
		});
		
	}
};

const drawline =  (x1, y1, x2, y2) => {
	ctx.fillStyle   = '#000';
	
	ctx.lineWidth =  1.5;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	ctx.stroke();
};

const cos = angle => Math.cos(deg_to_rad(angle));
const sin = angle => Math.sin(deg_to_rad(angle));
const deg_to_rad = angle => angle*(Math.PI/180.0);
const random = (min, max) => {
	return min + Math.floor(Math.random()*(max+1-min));
};

export {
	initializetree
}