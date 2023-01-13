import {
	randomIntFromRange,
	randomColor,
	distance,
	rotate,
	resolveCollision,
} from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener("resize", () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

// Objects
class Object {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update() {
		this.draw();
	}
}

// Implementation
let objects;
function init() {
	objects = [];

	for (let i = 0; i < 400; i++) {
		// objects.push()
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);

	// Background
	ctx.fillStyle = "#1A1A23";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Red Rectangle
	ctx.fillStyle = "#E86262";
	ctx.fillRect(mouse.x, mouse.y, 100, 100);

	// Blue Rectangle
	ctx.fillStyle = "#92ABEA";
	ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);

	// ctx.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);

	// objects.forEach(object => {
	//  object.update()
	// })
}

init();
animate();
