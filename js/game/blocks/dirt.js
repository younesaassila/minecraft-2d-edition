class Dirt extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('dirt.png', '#79553a');
		super.setHardness(0.5);
	}
}