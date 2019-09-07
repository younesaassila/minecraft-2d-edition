const parameters = new URLSearchParams(window.location.search);

//#region World

var worldWidth = 256;
var worldHeight = 128;

var world = new World(worldWidth, worldHeight);

//#endregion

//#region Player

var playerWidth = 1;
var playerHeight = 2;

var playerX = parseInt(Math.random() * (worldWidth - playerWidth));
var playerY = 62;

// Adjusting the y coordinate location by looking for the first suitable spot
// at x coordinate starting from the bottom.
for (var y = 0; y < world.blocks[playerX].length; y++) {
	if (!(typeof world.blocks[playerX][y + 1] == 'undefined')) {
		if ((world.blocks[playerX][y] instanceof Air)
		&& (world.blocks[playerX][y + 1] instanceof Air)) {
			playerY = y;
			break;
		}
	}
}

var player = new Player(playerX, playerY, playerWidth, playerHeight);

//#endregion

//#region Viewfinder

// Get the browser's viewport size.
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var viewfinderWidth = parameters.get('viewfinderWidth') || Math.floor(viewportWidth / 100) * 100;
var viewfinderHeight = parameters.get('viewfinderHeight') || Math.floor(viewportHeight / 100) * 100;
var viewfinderRows = parameters.get('viewfinderRows') || viewfinderHeight / 100;
var viewfinderCols = parameters.get('viewfinderCols') || viewfinderWidth / 100;

var debugMode = parameters.get('debug') === 'true' || false;

if (parameters.get('map') === 'true') {
	// Map Viewfinder
	var viewfinder = new Viewfinder
	(
		viewfinderWidth,
		viewfinderHeight,
		world.blocks[0].length,
		world.blocks.length,
		true,
		debugMode
	);
} else {
	var viewfinder = new Viewfinder
	(
		viewfinderWidth,
		viewfinderHeight,
		viewfinderRows,
		viewfinderCols,
		false,
		debugMode
	);
}

//#endregion

// Disable context menu.
window.oncontextmenu = function () { return false; }

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
