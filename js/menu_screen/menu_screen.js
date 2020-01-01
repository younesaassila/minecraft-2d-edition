//#region Play background music

// Gets the audio element from the document and sets the available audio tracks.
const audioSource = document.getElementById("audio");
const tracks = [
	"audio/menu_screen/beginning2.mp3",
	"audio/menu_screen/mutation.mp3"
]

// Create an audio manager and play a random track.
var audioManager = new AudioManager(audioSource, tracks);
audioManager.setVolume(0.5);
audioManager.setLoop(true);
audioManager.play();

//#endregion

//#region Display a random splash text on the menu screen.

var splash = document.getElementById("splash");
splash.innerHTML = getSplashText();

//#endregion

// Starts the game by changing the browser's location and sending query parameters.
function play() {
	var mapMode = document.getElementById("options-map-mode").checked;
	var creativeMode = document.getElementById("options-creative-mode").checked;
	var debugMode = document.getElementById("options-debug-mode").checked;

	location.href = `game.html?map=${mapMode}&creative=${creativeMode}&debug=${debugMode}`;
}

//#region Options's Modal view

function showOptions() {
	var modal = document.getElementById("options-modal");
	modal.style.display = "block";
}

function hideOptions() {
	var modal = document.getElementById("options-modal");
	modal.style.display = "none";
}

//#endregion

//#region About's Modal view

function showAbout() {
	var modal = document.getElementById("about-modal");
	modal.style.display = "block";
}

function hideAbout() {
	var modal = document.getElementById("about-modal");
	modal.style.display = "none";
}

//#endregion

// Update version text.
let version = document.querySelector("#version");
version.innerHTML = "Version 1.0/dev";

// Update copyright information.
let copyright = document.querySelector("#copyright");
copyright.innerHTML = `© ${new Date().getFullYear()} Younes Aassila. Not affiliated with Mojang AB or Microsoft Inc.`;
