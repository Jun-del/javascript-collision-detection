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
  event.preventDefault();
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
    this.velocity = {
      // Random value between -0.5 and 0.5
      // x: Math.random() - 0.5,
      // y: Math.random() - 0.5,
      x: Math.random() + 1,
      y: Math.random() + 1,
    };

    this.radius = radius;
    this.color = color;
    this.mass = 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    // ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update(objects) {
    this.draw();

    // Loop through all the circles in the array
    for (let i = 0; i < objects.length; i++) {
      // Skip the current object in the loop if it is the same object
      if (this === objects[i]) continue;

      // If the distance between the two circles (objects) is less than the sum of the two radii, they are colliding
      if (
        distance(this.x, this.y, objects[i].x, objects[i].y) - this.radius * 2 <
        0
      ) {
        resolveCollision(this, objects[i]);
      }
    }

    // If the circles collide with the border, reverse the velocity
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.velocity.y = -this.velocity.y;
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

/**
 * Implementation
 */
let objects;

function init() {
  objects = [];

  for (let i = 0; i < 10; i++) {
    const radius = 100;
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);
    const color = "black";

    // If not the first object
    if (i !== 0) {
      // For objects that are not the first object / already exist
      for (let j = 0; j < objects.length; j++) {
        // Check if the new circle is colliding with any other cirlces
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
    object.update(objects);
  });
}

init();
animate();
