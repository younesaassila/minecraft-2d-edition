class Structure {
	constructor(x, y, structure_blocks, world_blocks) {
		/**
		 * @param x Coordinate origin (X Axis)
		 * @param y Coordinate origin (Y Axis)
		 * @param structure_blocks Blocks from which the structure is composed
		 * Blocks is a two dimensional array used as:
		 * 	[Block Type, ~X, ~Y]
		 */

		this.x = x;
		this.y = y;
		this.structure_blocks = structure_blocks;
		this.world_blocks = world_blocks;

		this.place();
	}

	place() {
		if (this.structure_blocks != null && this.world_blocks != null) {
			for (var i = 0; i < this.structure_blocks.length; i++) {
				var block = this.structure_blocks[i][0];
				var x = this.structure_blocks[i][1];
				var y = this.structure_blocks[i][2];

				if (!(typeof this.world_blocks[this.x + x] == 'undefined')
				&& !(typeof this.world_blocks[this.x + x][this.y + y] == 'undefined')) {
					this.world_blocks[this.x + x][this.y + y] = block;
				} else {
					continue;
				}
			}
		}
	}
}