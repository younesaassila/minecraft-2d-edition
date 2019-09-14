class Air extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('air.png');
		super.setReplaceable(true);
	}
}