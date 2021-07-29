const canvas = document.getElementById('field');
const ctx = canvas.getContext('2d');

const groundImage = new Image();
groundImage.src = "img/background.png"
const foodImage = new Image();
foodImage.src = "img/food.png"

const snakeLImage = new Image();
snakeLImage.src = "img/snakeL.png"
const snakeUImage = new Image();
snakeUImage.src = "img/snakeU.png"
const snakeRImage = new Image();
snakeRImage.src = "img/snakeR.png"
const snakeDImage = new Image();
snakeDImage.src = "img/snakeD.png"

const C_S = 32;

var player;

var food = {x: 3, y: 4};




class Snake {
	constructor(x, y) {
		this.body = [];
		this.body.push({x: x, y: y});

		this.dx = 1;
		this.dy = 0;

		this.headImg = snakeRImage;
	}

	changeDirection(event) {
		if (event.code == 'ArrowRight') {
			this.dx = 1;
			this.dy = 0;
			this.headImg = snakeRImage;
		} else if (event.code == 'ArrowLeft') {
			this.dx = -1;
			this.dy = 0;
			this.headImg = snakeLImage;
		} else if (event.code == 'ArrowUp') {
			this.dx = 0;
			this.dy = -1;
			this.headImg = snakeUImage;
		} else if (event.code == 'ArrowDown') {
			this.dx = 0;
			this.dy = 1;
			this.headImg = snakeDImage;
		}
	}

	move() {
		var newHead = {x: this.body[0].x + this.dx, y: this.body[0].y + this.dy}
		this.body.unshift(newHead);
		if (this.isAte()) {
			newFood();
		} else {
			this.body.pop();			
		}
	}

	draw() {

		ctx.drawImage(this.headImg, this.body[0].x*C_S, this.body[0].y*C_S)
		ctx.fillStyle = "blue"
		for (var i = 1; i < this.body.length; i++) {

			ctx.fillRect(this.body[i].x*C_S, this.body[i].y*C_S, C_S, C_S)
		}
	}

	isAte() {
		if ((this.body[0].x == food.x) && (this.body[0].y == food.y)) {
			return true;
		}
		return false;
	}
}



function newFood() {
	food.x = Math.floor(Math.random()*19);
	food.y = Math.floor(Math.random()*19);
}



function init() {
	player = new Snake(1, 9);
	newFood();
}

function moveAll() {
	player.move();
}

function drawAll() {
	ctx.drawImage(groundImage, 0, 0);

	ctx.drawImage(foodImage, food.x*C_S, food.y*C_S);

	player.draw();
}

function gameLoop() {
	moveAll();
	drawAll();
}


function main() {

	init();

	game = setInterval(gameLoop, 300)
}

document.addEventListener("keydown", function chdir(event) {
	player.changeDirection(event);
})

main()