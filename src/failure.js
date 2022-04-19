const canvas = document.getElementById("myCanvas");

class Ball {
  ctx;
  x;
  y;
  radius;
  degree;
  xMovement;
  yMovement;

  constructor(ctx, x, y, radius, degree, xMovement, yMovement) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.degree = degree;
    this.xMovement = xMovement;
    this.yMovement = yMovement;
  }

  draw(fillStyle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveBall() {
    if (
      this.x + this.xMovement > canvas.width - this.radius ||
      this.x + this.xMovement < this.radius
    ) {
      this.xMovement = -this.xMovement;
    }

    if (
      this.y + this.yMovement > canvas.height - this.radius ||
      this.y + this.yMovement < this.radius
    ) {
      this.yMovement = -this.yMovement;
    }

    this.x += this.xMovement;
    this.y += this.yMovement;
  }
}

function init() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const randomNumberOfBalls = getRandomArbitrary(10, 20);

  const balls = [];

  for (let i = 0; i < randomNumberOfBalls; i++) {
    const randomBallSpeed = getRandomArbitrary(3, 6);
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

    const { x, y } = getMovement(randomDegree);
    
    const xMovement = x * randomBallSpeed;
    const yMovement = y * randomBallSpeed;

    const ball = new Ball(ctx, randomX, randomY, randomBallRaidus, 0, xMovement, yMovement);
    balls.push(ball);
  }
  
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball, i) => {
      let color = 'black';
      for (let j = 0; j < balls.length; j++) {
        if (i == j) {
          continue;
        }
        const distance = Math.sqrt(
          Math.pow(balls[i].x - balls[j].x, 2) +
            Math.pow(balls[i].y - balls[j].y, 2)
        );
        
        const isHit = balls[i].radius + balls[j].radius > distance
        if (isHit) {
          color = 'blue';
        }
      }
      ball.draw(color);
      ball.moveBall();
    });
    requestAnimationFrame(draw)
  }
  requestAnimationFrame(draw)
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getMovement(degree) {
  let x;
  let y;

  if (degree < 90) {
    x = degree / 90;
    y = -(90 - degree) / 90;
  }

  if (degree >= 90 && degree < 180) {
    x = (180 - degree) / 90;
    y = (180 - degree - 90) / 90;
  }

  if (degree >= 180 && degree < 270) {
    x = -(degree % 90) / 90;
    y = (90 - (degree % 90)) / 90;
  }

  if (degree >= 270 && degree <= 360) {
    x = -(360 - degree) / 90;
    y = (360 - degree - 90) / 90;
  }

  return { x, y };
}

init()
