class Air extends Block {
	constructor(x, y) {
		super(x, y);
		super.setTexture('air.png');
		super.onDestroy = function() {}
		super.onReplace = function() {
			world.blocks[this.x][this.y] = new Dirt(this.x, this.y);
		}
	}
}