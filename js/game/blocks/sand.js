class Sand extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('sand.png', '#e3dbb0');
		super.setHardness(0.5);
	}
}