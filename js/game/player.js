class Player {
	constructor(x, y, width, height, creative = false) {
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		this.creative = creative;

		this.xRange = 4;
		this.yRange = 3;

		// TODO: Implement notion of velocity

		// Used when noTexture mode is enabled.
		this.color = "red";
		
		this.topTexture = "images/entities/player/top.png";
		this.bottomTexture = "images/entities/player/bottom.png";

		this.positionText = document.getElementById("playerPosition");
		this.updatePositionText();
	}

	/**
	 * If set to true, gravity will be disabled for the player allowing
	 * it to fly in the air.
	 * @param {boolean} creative 
	 */
	setCreative(creative) {
		if (typeof creative === 'boolean') {
			this.creative = creative;
		}
	}

	move(x, y) {
		// Move left or right
		if (!(typeof world.blocks[this.x + x] === 'undefined')
		&& !(typeof world.blocks[this.x + x][this.y + 1] === 'undefined')
		&& (world.blocks[this.x + x][this.y] instanceof Air)
		&& (world.blocks[this.x + x][this.y + 1] instanceof Air)) {
			this.updatePosition(this.x + x, this.y);
		}

		// Move up or down
		if (!(typeof world.blocks[this.x][this.y + y] === 'undefined')
		&& !(typeof world.blocks[this.x][this.y + y + (this.height - 1)] === 'undefined')
		&& (world.blocks[this.x][this.y + y] instanceof Air)
		&& (world.blocks[this.x][this.y + y + (this.height - 1)] instanceof Air)) {
			// The player cannot jump when in the air in survival mode.
			if ((y > 0)
			&& !(typeof world.blocks[this.x][this.y - 1] == 'undefined')
			&& (world.blocks[this.x][this.y - 1] instanceof Air)
			&& !(this.creative)) {
				return;
			}

			this.updatePosition(this.x, this.y + y);
		}
	}

	updatePosition(x, y) {
		this.x = x;
		this.y = y;

		var gravityForce = -1;

		if (!(player.creative)
		&& !(typeof world.blocks[this.x] === 'undefined')
		&& !(typeof world.blocks[this.x][this.y + gravityForce] === 'undefined')
		&& (world.blocks[this.x][this.y + gravityForce] instanceof Air)) {
			window.setTimeout(function() {
				player.gravity(gravityForce);
			}, 400);
		}

		this.updatePositionText();
	}

	gravity(force) {
		if (!(typeof world.blocks[this.x][this.y + force] == 'undefined')
			&& (world.blocks[this.x][this.y + force] instanceof Air)) {
				this.updatePosition(this.x, this.y + force);
			}
	}

	updatePositionText() {
		this.positionText.innerHTML = `Position: ${this.x}, ${this.y}`;
	}
}