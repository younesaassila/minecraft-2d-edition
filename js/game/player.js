class Player {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;

		this.width = width;
		this.height = height;

		// TODO: Implement notion of velocity

		// Used when 'no texture' mode is enabled
		this.topColor = "red";
		this.bottomColor = "red";
		
		this.topTexture = "images/entities/player/top.png";
		this.bottomTexture = "images/entities/player/bottom.png";

		this.positionText = document.getElementById("playerPosition");
		this.updatePositionText();
	}

	move(x, y) {
		// Move left or right
		if (!(typeof world.blocks[this.x + x] == 'undefined')
		&& !(typeof world.blocks[this.x + x][this.y + 1] == 'undefined')
		&& (world.blocks[this.x + x][this.y] instanceof Air)
		&& (world.blocks[this.x + x][this.y + 1] instanceof Air)) {
			this.updatePosition(this.x + x, this.y);
		}

		// Move up or down
		if (!(typeof world.blocks[this.x][this.y + y] == 'undefined')
		&& !(typeof world.blocks[this.x][this.y + y + (this.height - 1)] == 'undefined')
		&& (world.blocks[this.x][this.y + y] instanceof Air)
		&& (world.blocks[this.x][this.y + y + (this.height - 1)] instanceof Air)) {
			// The player cannot jump when in the air
			if ((y > 0)
			&& !(typeof world.blocks[this.x][this.y - 1] == 'undefined')
			&& (world.blocks[this.x][this.y - 1] instanceof Air)) {
				return;
			}

			this.updatePosition(this.x, this.y + y);
		}
	}

	updatePosition(x, y) {
		this.x = x;
		this.y = y;

		var player = this;
		var gravityForce = -1;

		if (!(typeof world.blocks[this.x][this.y + gravityForce] == 'undefined')
			&& (world.blocks[this.x][this.y + gravityForce] instanceof Air)) {
				window.setTimeout(function() {
					player.gravity(gravityForce);
					viewfinder.draw();
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