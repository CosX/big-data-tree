let width = window.innerWidth;
let height = window.innerHeight;
let frameRate = 1/40;
let canvas = "";
let ctx = "";

const initializetree = (data) => {
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;

	drawtree(data, window.innerWidth/2, window.innerHeight/2, -90, 2);
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
			const index = innerdata.doc_count / data.doc_count;
			const BRANCH_LENGTH = 80 * depth;// + (innerdata.doc_count / data.doc_count) * 50;
			const newangle = lastangle + (360 / data.fltr.buckets.length) //((index * 180) -90);
			lastangle = newangle;
			const x2 = x1 + (cos(newangle) * depth * BRANCH_LENGTH);
			const y2 = y1 + (sin(newangle) * depth * BRANCH_LENGTH);
			
			drawline( x1, y1, x2, y2, index, depth, innerdata.key + " - " + innerdata.doc_count);
			drawtree(innerdata, x2, y2, newangle, depth - 1);
			//drawtree(innerdata, x2, y2, angle);
		});
		
	}
};

const drawline =  (x1, y1, x2, y2, thickness, depth, str) => {
	ctx.strokeStyle = '#ecf0f1';
	
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
	const fontsize = 10 * depth;
	ctx.font = fontsize + "px monospace";
	ctx.fillText(str, x2 + 15, y2 + 3);
};

const cos = angle => Math.cos(deg_to_rad(angle));
const sin = angle => Math.sin(deg_to_rad(angle));
const deg_to_rad = angle => angle * (Math.PI/180.0);

export {
	initializetree
}