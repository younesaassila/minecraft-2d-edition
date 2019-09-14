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
		// Sets the viewfinder x and y coordinates.
		this.x = this.getViewfinderPositionX();
		this.y = this.getViewfinderPositionY();

		// Foreach row in the viewfinder
		for (var row = 0; row < this.cells.length; row++) {
			// Foreach column of the row in the viewfinder
			for (var col = 0; col < this.cells[row].length; col++) {
				var cell = this.cells[(this.rows - 1) - row][col];

				// Calculate block coordinates.
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

		// Draw the player.
		this.drawPlayer();
	}

	drawPlayer() {
		if (player != null) {
			if ((player.x >= this.x) && (player.x < this.x + this.cols)) {
				if ((player.y >= this.y) && (player.y < this.y + this.rows)) {
					var x = player.x - this.x;
					var y = player.y - this.y;

					var topCell = this.cells[(this.rows - 1) - y - 1][x];
					var bottomCell = this.cells[(this.rows - 1) - y][x];
	
					topCell.style.backgroundColor = this.noTexture ? player.color : "#3BB9FF";
					bottomCell.style.backgroundColor = this.noTexture ? player.color : "#3BB9FF";

					if ((player.topTexture != null)
					&& (player.bottomTexture != null)
					&& (this.noTexture != true)) {
						this.setTexture(topCell, player.topTexture, false);
						this.setTexture(bottomCell, player.bottomTexture, false);
					}
				}
			}
		}
	}

	/**
	 * Sets the background color of the cell and calls a function to set the texture.
	 * @param {*} cell 
	 * @param {*} block 
	 */
	setBlock(cell, block) {
		cell.style.backgroundColor = this.noTexture ? block.color : '#3BB9FF';

		if ((block.texture != null) && !(this.noTexture)) {
			var interactable = false;

			if ((block.canBeDetroyed() || block.canBeReplaced())
			&& (block.x >= player.x - player.xRange && block.x <= player.x + player.xRange)
			&& (block.y >= player.y - player.yRange && block.y <= player.y + player.yRange)) {
				interactable = true;
			}

			if (player.creative) {
				interactable = true;
			}

			this.setTexture(cell, block.texture, interactable);

			if (block.destroyStage >= 0) {
				this.setDestroyStageTexture(cell, block);
			}
		}
	}

	/**
	 * Appends an image to the cell corresponding to the given block's texture.
	 * @param {*} cell The cell that should contain the block's texture.
	 * @param {*} texture The path of the texture file.
	 * @param {*} interactable Defines if the player can interact with the block.
	 */
	setTexture(cell, texture, interactable = false) {
		cell.innerHTML = this.debugMode ? `X: ${cell.x} Y: ${cell.y}, ${interactable}` : '';

		// Element used for destroy stage images positioning.
		var position = document.createElement("div");
		position.className = "div-destroy-stage-position";
		position.id = `${cell.x}-${cell.y}-destroy-stage-position`;
		
		// Image used to display the block's texture.
		var image = document.createElement("img");
		image.src = texture;
		image.style.imageRendering = "crisp-edges";

		image.style.width = this.width / this.cols + "px";
		image.style.height = this.height / this.rows + "px";

		image.style.position = "relative";
		image.style.padding = "0";
		image.style.margin = "auto";
		image.style.left = "0px";
		image.style.top = "0px";
		
		image.style.display = "block";
		
		image.ondragstart = function() { return false; };

		/*	If the block is in reach of the player and can be interacted with,
			set its class in order to show an outline when the player hovers
			the image with its mouse.
		*/
		if (interactable) {
			image.className = "img-interactable";

			image.addEventListener('mousedown', e => {
				// Detect a left click on the image, to break a block.
				if (e.button === 0) {
					var cell = image.parentNode;
					world.blocks[cell.x][cell.y].startDestroy();
				}

				// Detect a right click on the image, to replace a block.
				else if (e.button === 2) {
					var cell = image.parentNode;
					world.blocks[cell.x][cell.y].onReplace();
	
					this.draw();
				}
			});

			image.addEventListener('mouseup', e => {
				// When the player releases the left button, cancel the block's destruction.
				if (e.button === 0) {
					var cell = image.parentNode;
					world.blocks[cell.x][cell.y].cancelDestroy();
				}
			});
		}

		cell.appendChild(position);
		cell.appendChild(image);
	}

	/**
	 * Displays a destroy stage texture on top of the block's texture.
	 * @param {*} cell The table cell containing the texture.
	 * @param {*} block The desired block.
	 */
	setDestroyStageTexture(cell, block) {
		var position = document.getElementById(`${cell.x}-${cell.y}-destroy-stage-position`);

		// Current destroy stage image.
		var image = document.createElement('img');
		image.className = 'img-destroy-stage';
		image.src = `images/blocks/destroy_stage/destroy_stage_${block.destroyStage}.png`;
		image.style.width = `${this.width / this.cols}px`;
		image.style.height = `${this.height / this.rows}px`;
		image.style.imageRendering = 'crisp-edges';

		image.addEventListener('mouseup', e => {
			// When the player releases the left button, cancel the block's destruction.
			if (e.button === 0) {
				var cell = image.parentNode.parentNode;
				world.blocks[cell.x][cell.y].cancelDestroy();
			}
		});

		position.appendChild(image);
	}


	getViewfinderPositionX() {
		// The number of blocks between the player and the side of the screen
		var spacing = Math.floor((this.cols - player.width) / 3);

		if (player != null) {
			// The player is too close to the right of the screen
			if (player.x + player.width + spacing > (this.x + this.cols)) {
				// Is there any more blocks on the right side of the screen?
				if(!(typeof world.blocks[player.x + player.width + spacing - 1] === 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return player.x + player.width + spacing - this.cols;
				} else {
					return this.x;
				}
			}

			// The player is too close to the left of the screen
			else if (player.x - spacing < this.x) {
				// Is there any more blocks on the left side of the screen?
				if(!(typeof world.blocks[player.x - spacing] === 'undefined')) {
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

	getViewfinderPositionY() {
		// The number of blocks between the player and the side of the screen
		var spacing = Math.floor((this.rows - player.height) / 3);

		if (player != null) {
			// The player is too close to the bottom of the screen
			if (player.y - spacing < this.y) {
				// Is there any more blocks on the bottom of the screen?
				if(!(typeof world.blocks[player.y - spacing] === 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return player.y - spacing;
				} else {
					return this.y;
				}
			}

			// The player is too close to the top of the screen
			else if (player.y + player.height + spacing > this.y + this.rows) {
				// Is there any more blocks on the top of the screen?
				if(!(typeof world.blocks[player.y + player.height + spacing - 1] === 'undefined')) {
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