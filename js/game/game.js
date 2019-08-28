// World parameters
var world_width = 256;
var world_height = 128;

var world = new World(world_width, world_height);


// Player paramaters
var player_x = Math.round(Math.random() * 255);
var player_y = 62;

for (var y = 0; y < world.blocks[player_x].length; y++) {
	if (!(typeof world.blocks[player_x][y + 1] == 'undefined')) {
		if ((world.blocks[player_x][y] instanceof Air)
		&& (world.blocks[player_x][y + 1] instanceof Air)) {
			player_y = y;
			break;
		}
	}
}

var player = new Player(player_x, player_y, 1, 2);


// Viewport
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

// Viewfinder parameters
var viewfinder_width = Math.floor(viewportWidth / 100) * 100;
var viewfinder_height = Math.floor(viewportHeight / 100) * 100;
var viewfinder_rows = viewfinder_height / 100;
var viewfinder_cols = viewfinder_width / 100;

var viewfinder = new Viewfinder
(
	viewfinder_rows,
	viewfinder_cols,
	viewfinder_width,
	viewfinder_height,
	world,
	player
);

// Map viewfinder
// var viewfinder = new Viewfinder
// (
// 	world.blocks[0].length,
// 	world.blocks.length,
// 	1400,
// 	700,
// 	world,
// 	player,
// 	true
// );


window.addEventListener("keydown", function (event) {
	if (event.defaultPrevented) {
		// Do nothing if the event was already processed
		return;
	}
	
	switch (event.key) {
	  	case "ArrowDown":
			// Move down
			player.move(0, -1, viewfinder, world);
			viewfinder.draw();
			break;
	  	case "ArrowUp":
			// Move up
			player.move(0, 1, viewfinder, world);
			viewfinder.draw();
			break;
	  	case "ArrowLeft":
			// Move left
			player.move(-1, 0, viewfinder, world);
			viewfinder.draw();
			break;
	  	case "ArrowRight":
			// Move right
			player.move(1, 0, viewfinder, world);
			viewfinder.draw();
			break;
	  	default:
			// Quit when this doesn't handle the key event.
			return;
	}
  
	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
  }, true);