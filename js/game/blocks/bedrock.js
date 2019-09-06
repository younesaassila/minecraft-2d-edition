class Bedrock extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('bedrock.png', '#454545');
		super.onDestroy = function() {}
	}
}