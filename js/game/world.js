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

		this.bedrockGenerator = new Simple1DNoise();
		this.bedrockGenerator.setAmplitude(0.8);
		this.bedrockGenerator.setScale(0.25);

		this.stoneGenerator = new Simple1DNoise();
		this.stoneGenerator.setAmplitude(0.55);
		this.stoneGenerator.setScale(0.02);

		for (var x = 0; x < this.width; x++) {
			this.blocks[x] = new Array(this.height);

			// Bedrock is always generated at y = 0 and cannot generate at y > 5.
			var bedrockMinimumHeight = 1;
			var bedrockMaximumHeight = 5;

			// Stone is always generated at y < 52 and cannot generate at y > 100.
			var stoneMinimumHeight = 52;
			var stoneMaximumHeight = 100;

			var bedrockGeneratorValue = this.bedrockGenerator.getVal(x);
			var stoneGeneratorValue = this.stoneGenerator.getVal(x);

			var bedrockGenerationHeight = Math.abs(bedrockMaximumHeight - bedrockMinimumHeight);
			var bedrockHeight = bedrockMinimumHeight + Math.abs(bedrockGeneratorValue) * bedrockGenerationHeight;

			var stoneGenerationHeight = Math.abs(stoneMaximumHeight - stoneMinimumHeight);
			var stoneHeight = stoneMinimumHeight + Math.abs(stoneGeneratorValue) * stoneGenerationHeight;

			for (var y = 0; y < this.height; y++) {
				if (y <= bedrockHeight) {
					this.blocks[x][y] = new Bedrock(x, y);
				} else if (y <= stoneHeight) {
					this.blocks[x][y] = new Stone(x, y);
				} else if (y <= 61) {
					this.blocks[x][y] = new Water(x, y);
				} else {
					this.blocks[x][y] = new Air(x, y);
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
				this.blocks[x][y] = new Grass(x, y);

				// Generates a block of dirt underneath.
				if (this.blocks[x][y - 1] != null) {
					if (!(this.blocks[x][y - 1] instanceof Bedrock)) {
						this.blocks[x][y - 1] = new Dirt(x, y - 1);
					}
				}

				// Generates a second block of dirt.
				if (this.blocks[x][y - 2] != null) {
					if (!(this.blocks[x][y - 2] instanceof Bedrock)) {
						this.blocks[x][y - 2] = new Dirt(x, y - 2);
					}
				}

				// Generates a third block of dirt using perlin noise.
				if (this.blocks[x][y - 3] != null) {
					var value = this.stoneGenerator.getVal(x);

					if (value < 0.3) {
						if (!(this.blocks[x][y - 3] instanceof Bedrock)) {
							this.blocks[x][y - 3] = new Dirt(x, y - 3);
						}
					}
				}

				var random = Math.random();

				if (x % 5 == 0 && random < 0.15) {
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
				// Generates a block of sand at the surface under water. 
				this.blocks[x][y] = new Sand(x, y);

				// Generates a block of dirt underneath.
				if (this.blocks[x][y - 1] != null) {
					if (!(this.blocks[x][y - 1] instanceof Bedrock)) {
						this.blocks[x][y - 1] = new Dirt(x, y - 1);
					}
				}

				// Generates a third block of dirt using perlin noise.
				if (this.blocks[x][y - 2] != null) {
					var value = this.stoneGenerator.getVal(x);

					if (value < 0.3) {
						if (!(this.blocks[x][y - 2] instanceof Bedrock)) {
							this.blocks[x][y - 2] = new Dirt(x, y - 2);
						}
					}
				}
			}
		}
	}
}