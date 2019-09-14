class Block {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.color = '#3BB9FF';
		this.texture = null;
		this.hardness = null;
		this.breakable = false;
		this.replaceable = false;

		// Represents the time the player spent breaking the block (in seconds).
		this.destruction = 0;
		this.destroyStage = -1;
		this.destroyStageTextures = [
			'images/blocks/destroy_stage/destroy_stage_0.png',
			'images/blocks/destroy_stage/destroy_stage_1.png',
			'images/blocks/destroy_stage/destroy_stage_2.png',
			'images/blocks/destroy_stage/destroy_stage_3.png',
			'images/blocks/destroy_stage/destroy_stage_4.png',
			'images/blocks/destroy_stage/destroy_stage_5.png',
			'images/blocks/destroy_stage/destroy_stage_6.png',
			'images/blocks/destroy_stage/destroy_stage_7.png',
			'images/blocks/destroy_stage/destroy_stage_8.png',
			'images/blocks/destroy_stage/destroy_stage_9.png',
		]
	}

	/**
	 * Sets the block's texture to the specified image file.
	 * @param {string} texture The name of the texture file.
	 * @param {string} color The color used if the texture cannot be found.
	 */
	setTexture(texture, color = null) {
		if (typeof texture === 'string') {
			this.texture = `images/blocks/${texture}`;
		}

		if ((color != null)
			&& (typeof color === 'string')) {
			this.color = color;
		}
	}

	/**
	 * Sets the block's hardness value. This value is used to determine
	 * the time necessary to break the block.
	 * @param {number} hardness Hardness value of the block.
	 */
	setHardness(hardness) {
		if (typeof hardness === 'number') {
			this.hardness = hardness;
			this.breakable = true;
		}
	}

	/**
	 * Sets the block's replaceable value. This value is used to set whether
	 * this block can be replaced by another block when the player right clicks.
	 * @param {boolean} replaceable Replaceable value of the block.
	 */
	setReplaceable(replaceable) {
		if (typeof replaceable === 'boolean') {
			this.replaceable = true;
		}
	}

	/**
	 * Returns the block on the left side of this one.
	 */
	getBlock_Left() {
		if (!(typeof world.blocks[this.x - 1] === 'undefined')
		&& !(typeof world.blocks[this.x - 1][this.y] === 'undefined')) {
			return world.blocks[this.x - 1][this.y];
		}

		return null;
	}

	/**
	 * Returns the block over this one.
	 */
	getBlock_Over() {
		if (!(typeof world.blocks[this.x] === 'undefined')
		&& !(typeof world.blocks[this.x][this.y + 1] === 'undefined')) {
			return world.blocks[this.x][this.y + 1];
		}

		return null;
	}

	/**
	 * Returns the block on the right side of this one.
	 */
	getBlock_Right() {
		if (!(typeof world.blocks[this.x + 1] === 'undefined')
		&& !(typeof world.blocks[this.x + 1][this.y] === 'undefined')) {
			return world.blocks[this.x + 1][this.y];
		}

		return null;
	}

	/**
	 * Returns the block under this one.
	 */
	getBlock_Under() {
		if (!(typeof world.blocks[this.x] === 'undefined')
		&& !(typeof world.blocks[this.x][this.y - 1] === 'undefined')) {
			return world.blocks[this.x][this.y - 1];
		}

		return null;
	}


	/**
	 * Returns whether the current block has an adjacent block that is Air or Water.
	 */
	canBeDetroyed() {
		if (!this.breakable) {
			return false;
		}

		var block_Left = this.getBlock_Left();
		var block_Over = this.getBlock_Over();
		var block_Right = this.getBlock_Right();
		var block_Under = this.getBlock_Under();

		if (block_Left != null) {
			if ((block_Left instanceof Air)
			|| (block_Left instanceof Water)) {
				return true;
			}
		}

		if (block_Over != null) {
			if ((block_Over instanceof Air)
			|| (block_Over instanceof Water)) {
				return true;
			}
		}

		if (block_Right != null) {
			if ((block_Right instanceof Air)
			|| (block_Right instanceof Water)) {
				return true;
			}
		}

		if (block_Under != null) {
			if ((block_Under instanceof Air)
			|| (block_Under instanceof Water)) {
				return true;
			}
		}

		// If no adjacent block were found to be of type Air or Water.
		return false;
	}

	/**
	 * Returns whether the current block has an adjacent block that isn't Air nor Water.
	 */
	canBeReplaced() {
		if (!this.replaceable) {
			return false;
		}

		var block_Left = this.getBlock_Left();
		var block_Over = this.getBlock_Over();
		var block_Right = this.getBlock_Right();
		var block_Under = this.getBlock_Under();

		if (block_Left != null) {
			if (!(block_Left instanceof Air)
			&& !(block_Left instanceof Water)) {
				return true;
			}
		}

		if (block_Over != null) {
			if (!(block_Over instanceof Air)
			&& !(block_Over instanceof Water)) {
				return true;
			}
		}

		if (block_Right != null) {
			if (!(block_Right instanceof Air)
			&& !(block_Right instanceof Water)) {
				return true;
			}
		}

		if (block_Under != null) {
			if (!(block_Under instanceof Air)
			&& !(block_Under instanceof Water)) {
				return true;
			}
		}

		// If no adjacent block were found to be another type than Air or Water.
		return false;
	}


	/**
	 * Triggered when the player holds down the mouse's left button to destroy this block.
	 */
	startDestroy() {
		if (this.hardness != null) {
			if (player.creative) {
				this.onDestroy();
				return;
			}

			this.destroyStage = 0;
			destructionBlock = world.blocks[this.x][this.y];
			destructionTimer = setInterval(function() {
				var speed = destructionBlock.hardness * 1.5;
				destructionBlock.destruction += 0.1;
				destructionBlock.destroyStage = parseInt(Math.floor((destructionBlock.destruction / speed) * 10));

				if (destructionBlock.destruction >= speed) {
					destructionBlock.destruction = 0;
					destructionBlock.destroyStage = -1;
					destructionBlock.onDestroy();
					clearInterval(destructionTimer);
				}

				viewfinder.draw();
			}, 100);
		}
	}

	/**
	 * Triggered when this block is destroyed.
	 */
	onDestroy() {
		world.blocks[this.x][this.y] = new Air(this.x, this.y);
		player.move(0, 0);
		viewfinder.draw();
	}

	/**
	 * Triggered when the player releases the mouse's left button before destruction of this block.
	 */
	cancelDestroy() {
		if (this.hardness != null) {
			if (player.creative) {
				return;
			}

			clearInterval(destructionTimer);
			destructionBlock.destruction = 0;
			destructionBlock.destroyStage = -1;

			viewfinder.draw();
		}
	}

	/**
	 * Triggered when the player wants to replace this block with another block.
	 */
	onReplace() {
		world.blocks[this.x][this.y] = new Planks(this.x, this.y);
	}
}
