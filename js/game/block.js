class Block {
	constructor() {
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
}