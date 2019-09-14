class Water extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('water.png', '#4268f5');
		super.setReplaceable(true);
	}
}