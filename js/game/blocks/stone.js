class Stone extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('stone.png', '#7f7f7f');
		super.setHardness(1.5);
	}
}