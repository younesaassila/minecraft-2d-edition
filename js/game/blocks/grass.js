class Grass extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('grass.png', '#76b64c');
		super.setHardness(0.6);
	}
}