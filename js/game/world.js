class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;

		this.generate();
	}

	generate() {
		this.generateTerrain();
		this.generateSurface();
	}

	generateTerrain() {
		this.blocks = new Array(this.width);

		this.generator = new Simple1DNoise();
		this.generator.setAmplitude(0.55);
		this.generator.setScale(0.02);

		for (var x = 0; x < this.width; x++) {
			this.blocks[x] = new Array(this.height);

			// Stone is always generated at y < 52 and cannot generate at y > 100.
			var stoneMinimumHeight = 52;
			var stoneMaximumHeight = 100;

			var generatorValue = this.generator.getVal(x);
			var height = Math.abs(stoneMaximumHeight - stoneMinimumHeight);
			var stoneHeight = stoneMinimumHeight + Math.abs(generatorValue) * height;

			for (var y = 0; y < this.height; y++) {
				if (y == 0) {
					this.blocks[x][y] = new Bedrock();
				} else if (y <= stoneHeight) {
					this.blocks[x][y] = new Stone();
				} else if (y <= 62) {
					this.blocks[x][y] = new Water();
				} else {
					this.blocks[x][y] = new Air();
				}
			}
		}
	}

	// This method expects terrain to have previously been generated.
	generateSurface() {
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				this.generateGrassAndTrees(x, y);
				this.generateSand(x, y);
			}
		}
	}

	generateGrassAndTrees(x, y) {
		if (this.blocks[x][y + 1] != null) {
			if ((this.blocks[x][y + 1] instanceof Air)
			&& !(this.blocks[x][y] instanceof Bedrock)
			&& (this.blocks[x][y] instanceof Stone)) {
				// Generates a block of grass at the surface. 
				this.blocks[x][y] = new Grass();

				// Generates a block of dirt underneath.
				if (this.blocks[x][y - 1] != null) {
					if (!(this.blocks[x][y - 1] instanceof Bedrock)) {
						this.blocks[x][y - 1] = new Dirt();
					}
				}

				// Generates a second block of dirt.
				if (this.blocks[x][y - 2] != null) {
					if (!(this.blocks[x][y - 2] instanceof Bedrock)) {
						this.blocks[x][y - 2] = new Dirt();
					}
				}

				// Generates a third block of dirt using perlin noise.
				if (this.blocks[x][y - 3] != null) {
					var value = this.generator.getVal(x);

					if (value < 0.3) {
						if (!(this.blocks[x][y - 3] instanceof Bedrock)) {
							this.blocks[x][y - 3] = new Dirt();
						}
					}
				}

				var random = Math.random();

				if (x % 5 == 0 && random < 0.1) {
					new Tree(x, y + 1, this.blocks);
				}
			}
		}
	}

	generateSand(x, y) {
		if (this.blocks[x][y + 1] != null) {
			if ((this.blocks[x][y + 1] instanceof Water)
			&& !(this.blocks[x][y] instanceof Bedrock)
			&& (this.blocks[x][y] instanceof Stone)) {
				// Generates a block of grass at the surface. 
				this.blocks[x][y] = new Sand();

				// Generates a block of dirt underneath.
				if (this.blocks[x][y - 1] != null) {
					if (!(this.blocks[x][y - 1] instanceof Bedrock)) {
						this.blocks[x][y - 1] = new Dirt();
					}
				}

				// Generates a third block of dirt using perlin noise.
				if (this.blocks[x][y - 2] != null) {
					var value = this.generator.getVal(x);

					if (value < 0.3) {
						if (!(this.blocks[x][y - 2] instanceof Bedrock)) {
							this.blocks[x][y - 2] = new Dirt();
						}
					}
				}
			}
		}
	}
}