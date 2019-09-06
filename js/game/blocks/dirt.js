class Dirt extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('dirt.png', '#7d6338');
		super.setHardness(0.5);
	}
}