class Sand extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('sand.png', '#f0eaa3');
		super.setHardness(0.5);
	}
}