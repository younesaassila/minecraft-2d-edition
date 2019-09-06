class Grass extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('grass.png', '#00c264');
		super.setHardness(0.6);
	}
}