class Water extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('water.png', '#1762ad');
		super.onDestroy = function() {}
	}
}