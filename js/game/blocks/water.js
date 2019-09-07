class Water extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('water.png', '#1762ad');
		super.onDestroy = function() {}
		super.onReplace = function() {
			world.blocks[this.x][this.y] = new Dirt(this.x, this.y);
		}
	}
}