/**
 * Sets the browser's location to the specified path.
 * @param {string} path 
 */
function goToURL(path) {
	location.href = path;
}

function showOptions() {
	var modal = document.getElementById("options-modal");
	modal.style.display = "block";
}

function hideOptions() {
	var modal = document.getElementById("options-modal");
	modal.style.display = "none";
}

function showAbout() {
	var modal = document.getElementById("about-modal");
	modal.style.display = "block";
}

function hideAbout() {
	var modal = document.getElementById("about-modal");
	modal.style.display = "none";
}

// Background audio management.
var audioSource = document.getElementById("audioSource");
audioSource.volume = 0.5;

// Display a random splash text on the menu screen.
var splash = document.getElementById("splash");
splash.innerHTML = getSplashText();
