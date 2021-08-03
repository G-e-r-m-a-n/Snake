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

var isAlive = true;


class Snake {
	constructor(x, y) {
		this.body = [];
		this.body.push({x: x, y: y});

		this.dx = 1;
		this.dy = 0;

		this.score = 0;

		this.headImg = snakeRImage;
	}

	changeDirection(event) {
		if (event.code == 'ArrowRight') {
			if ((this.body.length == 1) || (this.body[0].x + 1 != this.body[1].x)) {
				this.dx = 1;
				this.dy = 0;
				this.headImg = snakeRImage;
			}
		} else if (event.code == 'ArrowLeft') {
			if ((this.body.length == 1) || (this.body[0].x - 1 != this.body[1].x)) {
				this.dx = -1;
				this.dy = 0;
				this.headImg = snakeLImage;
			}
		} else if (event.code == 'ArrowUp') {
			if ((this.body.length == 1) || (this.body[0].y - 1 != this.body[1].y)) {
				this.dx = 0;
				this.dy = -1;
				this.headImg = snakeUImage;
			}
		} else if (event.code == 'ArrowDown') {
			if ((this.body.length == 1) || (this.body[0].y + 1 != this.body[1].y)) {
				this.dx = 0;
				this.dy = 1;
				this.headImg = snakeDImage;
			}
		}
	}

	move() {
		var newHead = {x: this.body[0].x + this.dx, y: this.body[0].y + this.dy}
		if (this.isDead(newHead)) {
			isAlive = false;
			gameOver();
		}

		this.body.unshift(newHead);
		if (this.isAte()) {
			this.score += 1;
			newFood();
		} else {
			this.body.pop();			
		}
	}

	draw() {

		ctx.drawImage(this.headImg, this.body[0].x*C_S, this.body[0].y*C_S)
		ctx.fillStyle = "red"//"rgb(59,177,67)"
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

	isDead(newHead) {
		if (this.isWall(newHead)) {
			return true;
		}
		if (this.isTail(newHead)) {
			return true;
		}
		return false;
	}

	isWall(newHead) {
		if ((newHead.x < 1) || (newHead.y < 3) || (newHead.x > 17) || (newHead.y > 17)) {
			return true;
		}
		return false;
	}

	isTail(newHead) {
		for(var i = 0; i < this.body.length-1; i++) {
			if ((newHead.x == this.body[i].x) && (newHead.y == this.body[i].y)) {
				return true;
			}
		}
		return false;
	}
}

function gameOver() {
	ctx.fillStyle = "black"
	ctx.font = "50px Arial";
	ctx.fillText("GAME OVER", 4.75*C_S, 9*C_S);	
	clearInterval(game)

}

function newFood() {
	food.x = Math.floor(Math.random()*17) + 1;
	food.y = Math.floor(Math.random()*15) + 3;
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
	ctx.fillStyle = "white"
	ctx.font = "50px Arial";
	ctx.fillText(player.score, 2.5*C_S, 1.7*C_S);


	ctx.drawImage(foodImage, food.x*C_S, food.y*C_S);

	player.draw();
}

function gameLoop() {
	moveAll();
	if (isAlive) {
		drawAll();
	}
}


function main() {

	init();

	game = setInterval(gameLoop, 300)
}

document.addEventListener("keydown", function chdir(event) {
	player.changeDirection(event);
})

main()