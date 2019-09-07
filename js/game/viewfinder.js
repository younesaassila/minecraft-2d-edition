class Viewfinder {
	/**
	 * Constructor of the Viewfinder class.
	 * @param {number} width The width of the table.
	 * @param {number} height The height of the table.
	 * @param {number} rows The number of rows the table should countain.
	 * @param {number} cols The number of columns the table should countain.
	 * @param {boolean} noTexture If true, the blocks' texture will not be loaded.
	 * @param {boolean} debugMode If true, sets the border width of table cells
	 * to 1 pixel and logs debug information to the console.
	 */
	constructor(width, height, rows, cols, noTexture = false, debugMode = false) {
		this.width = width;
		this.height = height;
		this.rows = rows;
		this.cols = cols;
		this.noTexture = noTexture;
		this.debugMode = debugMode;

		this.x = player.x < (0 + cols) ? 0 : player.x > (world.width - cols) ? (world.width - cols) : 0;
		this.y = player.y < (0 + rows) ? 0 : player.y > (world.height - rows) ? (world.height - rows) : 0;

		this.createTable();
		this.draw();
	}

	createTable() {
		var body = document.body;

		var table = document.createElement("table");
		table.style.width  = `${this.width.toString()}px`;
		table.style.height = `${this.height.toString()}px`;
		table.style.border = "0px";
		table.style.borderCollapse = "collapse";
		table.style.tableLayout = "fixed";
		
		this.cells = new Array(this.rows);
		
		// Foreach row in the viewfinder
		for (var row = 0; row < this.rows; row++) {
			var tr = table.insertRow();

			this.cells[row] = new Array(this.cols);
			
			// Foreach column of the row in the viewfinder
			for (var col = 0; col < this.cols; col++){
				var td = tr.insertCell();
					td.style.border = this.debugMode ? "1px dotted black" : "0px";
					td.style.overflow = "hidden";

					td.style.width = Math.floor(this.width / this.cols);
					td.style.minWidth = td.style.width;
					td.style.maxWidth = td.style.width;

					td.style.height = Math.floor(this.height / this.rows);
					td.style.minHeight = td.style.height;
					td.style.maxHeight = td.style.height;

					td.style.padding = "0";

				this.cells[row][col] = td;
			}
		}
		
		body.appendChild(table);
	}

	draw() {
		// Foreach row in the viewfinder
		for (var row = 0; row < this.cells.length; row++) {
			// Foreach column of the row in the viewfinder
			for (var col = 0; col < this.cells[row].length; col++) {
				var cell = this.cells[(this.rows - 1) - row][col];

				this.x = this.getCameraPositionX();
				this.y = this.getCameraPositionY();
				
				// Block coordinates
				var x = col + this.x;
				var y = row + this.y;

				if (!(typeof world.blocks[x] == 'undefined')
				&& !(typeof world.blocks[x][y] == 'undefined')) {
					var block = world.blocks[x][y];

					cell.x = block.x;
					cell.y = block.y;

					this.setBlock(cell, block);
				}
			}
		}

		// Draw the player
		if (player != null) {
			if ((player.x >= this.x) && (player.x < this.x + this.cols)) {
				if ((player.y >= this.y) && (player.y < this.y + this.rows)) {
					var x = player.x - this.x;
					var y = player.y - this.y;

					var topCell = this.cells[(this.rows - 1) - y - 1][x];
					var bottomCell = this.cells[(this.rows - 1) - y][x];
	
					topCell.style.backgroundColor = this.noTexture ? player.topColor : "#3BB9FF";
					bottomCell.style.backgroundColor = this.noTexture ? player.bottomColor : "#3BB9FF";

					if ((player.topTexture != null)
					&& (player.bottomTexture != null)
					&& (this.noTexture != true)) {
						this.setTexture(topCell, player.topTexture);
						this.setTexture(bottomCell, player.bottomTexture);
					}
				}
			}
		}
	}

	setBlock(cell, block) {
		cell.style.backgroundColor = this.noTexture ? block.color : '#3BB9FF';

		if ((block.texture != null) && !(this.noTexture)) {
			this.setTexture(cell, block.texture);
		}
	}

	setTexture(cell, texture) {
		cell.innerHTML = this.debugMode ? `X: ${cell.x} Y: ${cell.y}` : '';
		
		var image = document.createElement("img");
		image.src = texture;
		image.style.imageRendering = "pixelated";
		image.style.imageRendering = "crisp-edges";

		image.style.width = this.width / this.cols + "px";
		image.style.height = this.height / this.rows + "px";

		image.style.padding = "0";
		image.style.margin = "auto";
		image.style.display = "block";
		image.style.position = "relative";
		image.style.left = "0px";
		image.style.top = "0px";

		image.ondragstart = function() { return false; };

		image.addEventListener('mousedown', e => {
			// Left click: detroy block
			if (e.button === 0) {
				var cell = image.parentNode;
				world.blocks[cell.x][cell.y].onDestroy();

				this.draw();
			}
			// Right click: place block
			else if (e.button === 2) {
				var cell = image.parentNode;
				world.blocks[cell.x][cell.y].onReplace();

				this.draw();
			}
		  });
		
		cell.appendChild(image);
	}

	getCameraPositionX() {
		// The number of blocks between the player and the side of the screen
		var spacing = Math.floor((this.cols - player.width) / 3);

		if (player != null) {
			// The player is too close to the right of the screen
			if (player.x + player.width + spacing > (this.x + this.cols)) {
				// Is there any more blocks on the right side of the screen?
				if(!(typeof world.blocks[player.x + player.width + spacing - 1] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return player.x + player.width + spacing - this.cols;
				} else {
					return this.x;
				}
			}

			// The player is too close to the left of the screen
			else if (player.x - spacing < this.x) {
				// Is there any more blocks on the left side of the screen?
				if(!(typeof world.blocks[player.x - spacing] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return player.x - spacing;
				} else {
					return this.x;
				}
			}

			// The player is neither too close to left nor to the right
			else {
				return this.x;
			}
		} else {
			return this.x;
		}
	}

	getCameraPositionY() {
		// The number of blocks between the player and the side of the screen
		var spacing = Math.floor((this.rows - player.height) / 3);

		if (player != null) {
			// The player is too close to the bottom of the screen
			if (player.y - spacing < this.y) {
				// Is there any more blocks on the bottom of the screen?
				if(!(typeof world.blocks[player.y - spacing] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return player.y - spacing;
				} else {
					return this.y;
				}
			}

			// The player is too close to the top of the screen
			else if (player.y + player.height + spacing > this.y + this.rows) {
				// Is there any more blocks on the top of the screen?
				if(!(typeof world.blocks[player.y + player.height + spacing - 1] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return player.y + player.height + spacing - this.rows;
				} else {
					return this.y;
				}
			}

			// The player is neither too close to left nor to the right
			else {
				return this.y;
			}
		} else {
			return this.x;
		}
	}
}