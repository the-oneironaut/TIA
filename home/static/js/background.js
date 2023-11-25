let dots = [];

function setup() {
    let canvas = createCanvas(windowWidth, document.body.scrollHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '0');
    for (let i = 0; i < width * height / 8000; i++) {
        dots.push(new Dot());
    }
}

function draw() {
    background(0);
    for (let i = 0; i < dots.length; i++) {
        dots[i].move();
        dots[i].display();
    }
}

class Dot {
    constructor() {
        this.x = random(width);
        this.y = random(height);
        this.diameter = random(2, 5);
        this.speedX = random(-1, 1);
        this.speedY = random(-1, 1);
    }

    move() {
        let distance = dist(mouseX, mouseY, this.x, this.y);
        if (distance > 100) {
            this.x += this.speedX;
            this.y += this.speedY;
        } else {
            this.x += (mouseX - this.x) / 10;
            this.y += (mouseY - this.y) / 10;
        }
        this.x += random(-0.5, 0.5);
        this.y += random(-0.5, 0.5);
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    display() {
        fill(100);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}