class Stone extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('stone.png', '#a3a3a3');
		super.setHardness(1.5);
	}
}