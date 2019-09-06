class Tree extends Structure {
	constructor(x, y, world_blocks) {
		var structure_blocks = [
			// 1st row
			[new Leaves(x - 2, y + 2), -2, 2],
			[new Leaves(x - 2, y + 3), -2, 3],
			// 2nd row
			[new Leaves(x - 1, y + 2), -1, 2],
			[new Leaves(x - 1, y + 3), -1, 3],
			[new Leaves(x - 1, y + 4), -1, 4],
			[new Leaves(x - 1, y + 5), -1, 5],
			// 3rd row
			[new Log(x, y + 0), 0, 0],
			[new Log(x, y + 1), 0, 1],
			[new Log(x, y + 2), 0, 2],
			[new Log(x, y + 3), 0, 3],
			[new Leaves(x, y + 4), 0, 4],
			[new Leaves(x, y + 5), 0, 5],
			// 4th row
			[new Leaves(x + 1, y + 2), 1, 2],
			[new Leaves(x + 1, y + 3), 1, 3],
			[new Leaves(x + 1, y + 4), 1, 4],
			[new Leaves(x + 1, y + 5), 1, 5],
			// 5th row
			[new Leaves(x + 2, y + 2), 2, 2],
			[new Leaves(x + 2, y + 3), 2, 3]
		]

		super(x, y, structure_blocks, world_blocks);
	}
}