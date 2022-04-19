"use strict";
const canvas = document.getElementById("myCanvas");
class Ball {
    constructor(ctx, x, y, radius, degree, speed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.degree = degree;
        this.speed = speed;
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
        const recalculateDegree = () => {
            xMovement = getMovement(this.degree).x * this.speed;
            yMovement = getMovement(this.degree).y * this.speed;
        };
        // 오른쪽 벽
        // 30 -> 330
        // 45 -> 315
        // 160 -> 200
        if (this.x + xMovement > canvas.width - this.radius) {
            this.degree = 360 - this.degree;
            recalculateDegree();
        }
        // 왼쪽벽
        // 315 -> 45
        if (this.x + xMovement < this.radius) {
            this.degree = 360 - this.degree;
            recalculateDegree();
        }
        // 위족 벽
        // 20 -> 160
        // 340 -> 200
        if (this.y + yMovement > canvas.height - this.radius) {
            this.degree = 180 - this.degree;
            if (this.degree >= 270) {
                this.degree = 180 + (360 - this.degree);
            }
            recalculateDegree();
        }
        // 아래쪽 벽
        if (this.y + yMovement < this.radius) {
            this.degree = this.degree + 180;
            recalculateDegree();
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
    for (let i = 0; i < randomNumberOfBalls; i++) {
        const randomBallSpeed = getRandomArbitrary(3, 6);
        const randomBallRaidus = getRandomArbitrary(10, 20);
        const randomDegree = getRandomArbitrary(0, 360);
        const randomX = getRandomArbitrary(randomBallRaidus, canvas.width - randomBallRaidus);
        const randomY = getRandomArbitrary(randomBallRaidus, canvas.height - randomBallRaidus);
        const ball = new Ball(ctx, randomX, randomY, randomBallRaidus, randomDegree, randomBallSpeed);
        balls.push(ball);
    }
    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach((ball, i) => {
            let color = "black";
            let angle;
            for (let j = 0; j < balls.length; j++) {
                if (i == j) {
                    continue;
                }
                const deltaX = balls[i].x - balls[j].x;
                const deltaY = balls[i].y - balls[j].y;
                const distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
                const isHit = balls[i].radius + balls[j].radius > distance;
                if (isHit) {
                    color = "blue";
                    angle = Math.acos(deltaX / distance);
                    if (deltaY > 0) {
                        angle = Math.PI + (Math.PI - angle);
                    }
                    balls[i].degree = angle;
                }
            }
            ball.draw(color);
            ball.moveBall();
            if (angle != null) {
                balls[i].degree = angle;
            }
        });
        requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
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
    else if (degree >= 90 && degree < 180) {
        x = (180 - degree) / 90;
        y = (180 - degree - 90) / 90;
    }
    else if (degree >= 180 && degree < 270) {
        x = -(degree % 90) / 90;
        y = (90 - (degree % 90)) / 90;
    }
    else if (degree >= 270 && degree <= 360) {
        x = -(360 - degree) / 90;
        y = (360 - degree - 90) / 90;
    }
    else {
        console.log(`잘못된 각도 입니다. ${degree}`);
        x = 0;
        y = 0;
    }
    return { x, y };
}
init();
