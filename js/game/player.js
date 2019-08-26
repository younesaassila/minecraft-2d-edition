class Player {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.topColor = "red";
		this.bottomColor = "red";

		this.positionText = document.getElementById("playerPosition");
		this.updatePositionText();
	}

	moveLeft() {
		this.x -= 1;
		this.updatePositionText();
	}

	moveRight() {
		this.x += 1;
		this.updatePositionText();
	}

	jump() {
		this.y += 1;
		this.updatePositionText();
	}

	moveDown() {
		this.y -= 1;
		this.updatePositionText();
	}

	updatePositionText() {
		this.positionText.innerHTML = `Position – X: ${this.x}, Y: ${this.y}`;
	}
}