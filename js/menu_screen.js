// Background audio management.
var audioSource = document.getElementById("audioSource");
audioSource.volume = 0.5;

// Display a random splash text on the menu screen.
var splash = document.getElementById("splash");
splash.innerHTML = getSplashText();

/**
 * Sets the browser's location to game.html and sends query parameters
 * following the user's selected options.
 */
function play() {
	var mapMode = document.getElementById("options-map-mode").checked;
	var debugMode = document.getElementById("options-debug-mode").checked;

	location.href = `game.html?map=${mapMode}&debug=${debugMode}`;
}

//#region Options modal

function showOptions() {
	var modal = document.getElementById("options-modal");
	modal.style.display = "block";
}

function hideOptions() {
	var modal = document.getElementById("options-modal");
	modal.style.display = "none";
}

//#endregion

//#region About modal

function showAbout() {
	var modal = document.getElementById("about-modal");
	modal.style.display = "block";
}

function hideAbout() {
	var modal = document.getElementById("about-modal");
	modal.style.display = "none";
}

//#endregion
