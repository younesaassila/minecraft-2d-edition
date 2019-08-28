class Viewfinder {
	constructor(rowCount, columnCount, width, height, world, player, colorful = false) {
		// Variables used for the table creation
		this.rowCount = rowCount;
		this.columnCount = columnCount;

		this.width = width;
		this.height = height;

		// Coordinates of the viewfinder (starting from the bottom left)
		this.x = 0;
		this.y = 0;

		this.world = world;
		this.player = player;
		this.colorful = colorful;

		this.createTable();
		this.draw();
	}

	createTable() {
		this.rows = new Array(this.rowCount);

		var body = document.body,
			tbl  = document.createElement("table");
		tbl.style.width  = this.width.toString() + "px";
		tbl.style.height = this.height.toString() + "px";
		tbl.style.tableLayout = "fixed";
		tbl.style.border = "0px";
		tbl.style.borderCollapse = "collapse";
		
		// Foreach row in the viewfinder
		for (var r = 0; r < this.rowCount; r++) {
			var tr = tbl.insertRow();

			this.rows[r] = new Array(this.columnCount);
			
			// Foreach column of the row in the viewfinder
			for (var c = 0; c < this.columnCount; c++){
				var td = tr.insertCell();
					td.style.border = "0px dotted black"
					td.style.overflow = "hidden";

				this.rows[r][c] = td;
			}
		}
		
		body.appendChild(tbl);
	}

	draw() {
		// Foreach row in the viewfinder
		for (var row = 0; row < this.rows.length; row++) {
			// Foreach column of the row in the viewfinder
			for (var col = 0; col < this.rows[row].length; col++) {
				var cell = this.rows[(this.rowCount - 1) - row][col];

				this.x = this.getCameraPositionX();
				this.y = this.getCameraPositionY();
				
				var x = col + this.x;
				var y = row + this.y;

				if (!(typeof this.world.blocks[x] == 'undefined')
				&& !(typeof this.world.blocks[x][y] == 'undefined')) {
					cell.style.backgroundColor = this.colorful ? this.world.blocks[x][y].color : "#3BB9FF";

					cell.style.width = Math.floor(this.width / this.columnCount);
					cell.style.minWidth = cell.style.width;
					cell.style.maxWidth = cell.style.width;

					cell.style.height = Math.floor(this.height / this.rowCount);
					cell.style.minHeight = cell.style.height;
					cell.style.maxHeight = cell.style.height;

					cell.style.padding = "0";

					if (this.world.blocks[x][y].texture != null && this.colorful != true) {
						this.setTexture(cell, this.world.blocks[x][y].texture);
					}
				}
			}
		}

		// Draw the player
		if (player != null) {
			if ((this.player.x >= this.x) && (this.player.x < this.x + this.columnCount)) {
				if ((this.player.y >= this.y) && (this.player.y < this.y + this.rowCount)) {
					var x = this.player.x - this.x;
					var y = this.player.y - this.y;

					var topCell = this.rows[(this.rowCount - 1) - y - 1][x];
					var bottomCell = this.rows[(this.rowCount - 1) - y][x];
	
					topCell.style.backgroundColor = this.colorful ? this.player.topColor : "#3BB9FF";
					bottomCell.style.backgroundColor = this.colorful ? this.player.bottomColor : "#3BB9FF";

					if ((this.player.topTexture != null)
					&& (this.player.bottomTexture != null)
					&& (this.colorful != true)) {
						this.setTexture(topCell, this.player.topTexture);
						this.setTexture(bottomCell, this.player.bottomTexture);
					}
				}
			}
		}
	}

	setTexture(cell, texture) {
		cell.innerHTML = '';

		var image = document.createElement("img");
		image.src = texture;
		image.style.imageRendering = "pixelated";
		image.style.imageRendering = "crisp-edges";

		image.style.width = this.width / this.columnCount + "px";
		image.style.height = this.height / this.rowCount + "px";

		image.style.padding = "0";
		image.style.margin = "auto";
		image.style.display = "block";
		image.style.position = "relative";
		image.style.left = "0px";
		image.style.top = "0px";

		image.ondragstart = function() { return false; };
		
		cell.appendChild(image);
	}

	getCameraPositionX() {
		// The number of blocks between the player and the side of the screen
		var spacing = Math.floor((this.columnCount - this.player.width) / 3);

		if (this.player != null) {
			// The player is too close to the right of the screen
			if (this.player.x + this.player.width + spacing > (this.x + this.columnCount)) {
				// Is there any more blocks on the right side of the screen?
				if(!(typeof this.world.blocks[this.player.x + this.player.width + spacing - 1] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return this.player.x + this.player.width + spacing - this.columnCount;
				} else {
					return this.x;
				}
			}

			// The player is too close to the left of the screen
			else if (this.player.x - spacing < this.x) {
				// Is there any more blocks on the left side of the screen?
				if(!(typeof this.world.blocks[this.player.x - spacing] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return this.player.x - spacing;
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
		var spacing = Math.floor((this.rowCount - this.player.height) / 3);

		if (this.player != null) {
			// The player is too close to the bottom of the screen
			if (this.player.y - spacing < this.y) {
				// Is there any more blocks on the bottom of the screen?
				if(!(typeof this.world.blocks[this.player.y - spacing] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return this.player.y - spacing;
				} else {
					return this.y;
				}
			}

			// The player is too close to the top of the screen
			else if (this.player.y + this.player.height + spacing > this.y + this.rowCount) {
				// Is there any more blocks on the top of the screen?
				if(!(typeof this.world.blocks[this.player.y + this.player.height + spacing - 1] == 'undefined')) {
					// Yes there is. Get new viewfinder position on the x axis
					return this.player.y + this.player.height + spacing - this.rowCount;
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