const canvas = document.getElementById("myCanvas");

class Ball {
  speed = 2;
  ctx;
  x;
  y;
  radius;
  degree;

  constructor(ctx, x, y, radius, degree) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.degree = degree;
  }

  draw(fillStyle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveBall() {
    let { x, y } = getMovement(this.degree);
    
    let xMovement = x * this.speed;
    let yMovement = y * this.speed;


    if (
      this.x + xMovement > canvas.width - this.radius ||
      this.x + xMovement < this.radius
    ) {
      xMovement = -xMovement;
    }

    if (
      this.y + yMovement > canvas.height - this.radius ||
      this.y + yMovement < this.radius
    ) {
      yMovement = -yMovement;
    }

    this.x += xMovement;
    this.y += yMovement;
  }
}

function init() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const randomNumberOfBalls = getRandomArbitrary(10, 20);

  const balls = [];

  for (let i = 0; i < 1; i++) {
    const randomBallRaidus = getRandomArbitrary(10, 20);
    const randomDegree = getRandomArbitrary(0, 360);
    const randomX = getRandomArbitrary(
      randomBallRaidus,
      canvas.width - randomBallRaidus
    );
    const randomY = getRandomArbitrary(
      randomBallRaidus,
      canvas.height - randomBallRaidus
    );

    const ball = new Ball(ctx, randomX, randomY, randomBallRaidus, randomDegree);
    balls.push(ball);
  }

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball, i) => {
      let color = "black";
      for (let j = 0; j < balls.length; j++) {
        if (i == j) {
          continue;
        }
        const d = Math.sqrt(
          Math.pow(balls[i].x - balls[j].x, 2) +
            Math.pow(balls[i].y - balls[j].y, 2)
        );

        if (balls[i].radius + balls[j].radius > d) {
          color = "red";
          break;
        }
      }
      ball.draw(color);
      ball.moveBall();
    });
  }, 1000 / 60);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function getRandomDistanceToMove() {
//   return getRandomArbitrary(1, 10) % 2 === 0
//     ? getRandomArbitrary(1, 4)
//     : getRandomArbitrary(-4, -1);
// }

function getMovement(degree) {
  let x;
  let y;

  if (degree < 90) {
    x = degree / 90;
    y = (90 - degree) / 90;
  }

  if (degree >= 90 && degree < 180) {
    x = (180 - degree) / 90;
    y = (180 - degree - 90) / 90;
  }

  if (degree >= 180 && degree < 270) {
    x = -(degree % 90) / 90;
    y = -(90 - (degree % 90)) / 90;
  }

  if (degree >= 270 && degree <= 360) {
    x = -(360 - degree) / 90;
    y = -(360 - degree - 90) / 90;
  }

  console.log({x, y})

  return { x, y };
}

init();
