class Block {
	constructor(texture_name, color = null, hardness = null) {
		// Used when the texture is unavailable
		if (color != null) {
			this.color = color;
		} else {
			this.color = "#3BB9FF";
		}
		
		if (texture_name != null) {
			this.texture = "images/blocks/" + texture_name;
		} else {
			this.texture = null;
		}

		if (hardness != null) {
			this.hardness = hardness;
		} else {
			this.hardness = null;
		}
	}
}