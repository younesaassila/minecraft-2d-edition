class Block {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.color = '#3BB9FF';
		this.texture = null;
		this.hardness = null;
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
		}
	}

	/**
	 * Triggered when the player wants to destroy this block.
	 */
	onDestroy(eventArgs = null) {
		// By default, a detroyed block is replaced by air.
		if (eventArgs != null) {
			if (this.hardness != null) {
				// TODO: Check for item in hand with event args.
				var speed = this.hardness * 1.5;
			}
		}

		world.blocks[this.x][this.y] = new Air(this.x, this.y);
	}

	/**
	 * Triggered when the player wants to replace this block with another block.
	 */
	onReplace() {
		/**
		 * By default, this method is empty as most block wouldn't allow replacement.
		 * 
		 * In order to allow block replacement on a certain type of block,
		 * please overwrite this method in the appropriate extended class.
		 * 
		 * I.e.: super.onReplace = function() {}
		 */
	}
}
