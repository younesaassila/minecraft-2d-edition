const structure_blocks = [
	// 1st row
	[new Leaves(), -2, 2],
	[new Leaves(), -2, 3],
	// 2nd row
	[new Leaves(), -1, 2],
	[new Leaves(), -1, 3],
	[new Leaves(), -1, 4],
	[new Leaves(), -1, 5],
	// 3rd row
	[new Log(), 0, 0],
	[new Log(), 0, 1],
	[new Log(), 0, 2],
	[new Log(), 0, 3],
	[new Leaves(), 0, 4],
	[new Leaves(), 0, 5],
	// 4th row
	[new Leaves(), 1, 2],
	[new Leaves(), 1, 3],
	[new Leaves(), 1, 4],
	[new Leaves(), 1, 5],
	// 5th row
	[new Leaves(), 2, 2],
	[new Leaves(), 2, 3]
]

class Tree extends Structure {
	constructor(x, y, world_blocks) {
		super(x, y, structure_blocks, world_blocks);
	}
}