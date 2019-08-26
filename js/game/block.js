class Block {
	constructor(texture_name, color = "#3BB9FF") {
		// Used when the texture is unavailable
		this.color = color;
		
		if (texture_name != null) {
			this.texture = "images/blocks/" + texture_name;
		} else {
			this.texture = null;
		}
	}
}