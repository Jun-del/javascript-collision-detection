import { randomIntFromRange, randomColor, distance } from "./utils.js";

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
    // ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    this.draw();
  }
}

/**
 * Implementation
 */
let objects;

function init() {
  objects = [];

  for (let i = 0; i < 400; i++) {
    const radius = 10;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = "black";

    // If not the first object
    if (i !== 0) {
      // For objects that are not the first object / already exist
      for (let j = 0; j < objects.length; j++) {
        // If Pythagorean Theorem distance is less than the sum of the two radii
        if (distance(x, y, objects[j].x, objects[j].y) - radius * 2 < 0) {
          x = randomIntFromRange(radius, canvas.width - radius);
          y = randomIntFromRange(radius, canvas.height - radius);

          j = -1;
        }
      }
    }

    objects.push(new Object(x, y, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //   ctx.fillText("HTML CANVAS BOILERPLATE", mouse.x, mouse.y);

  objects.forEach((object) => {
    object.update();
  });
}

init();
animate();
