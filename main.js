// VARIABLES
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('lineWidth');

let isDrawing = false;
let x = 0;
let y = 0;
let currentColor = 'black';
let lineWidth = 1;
let isRect = false;

// FUNCTIONS
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function saveDrawing() {
	const data = canvas.toDataURL('image/png');
	const a = document.createElement('a');
	a.href = data;
	a.download = 'drawing.png';
	a.click();
}

const drawLine = (ctx, x1, y1, x2, y2) => {
	ctx.beginPath();
	ctx.strokeStyle = currentColor;
	ctx.lineWidth = lineWidth;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}

// EVENTS
canvas.addEventListener('mousedown', e => {
	e.preventDefault();
	x = e.offsetX;
	y = e.offsetY;
	isDrawing = true;
});

canvas.addEventListener('mousemove', e => {
	if (isDrawing === true) {
		drawLine(ctx, x, y, e.offsetX, e.offsetY);
		x = e.offsetX;
		y = e.offsetY;
	}
});

canvas.addEventListener('mouseup', e => {
	if (isDrawing === true) {
		drawLine(ctx, x, y, e.offsetX, e.offsetY);
		x = 0;
		y = 0;
		isDrawing = false;
	}
});

input.addEventListener('change', e => {
	lineWidth = e.target.value;
	input.value = lineWidth;
});

document.querySelectorAll('.color-picker').forEach(color => color.addEventListener('click', e => {
	currentColor = e.target.style.backgroundColor;
}));

