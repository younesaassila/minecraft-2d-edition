var audioSource = document.getElementById("audioSource");
audioSource.volume = 0.5;

function goToURL(path) {
	location.href = path;
}

const subtitles = [
	"Now in 2D!",
	"Experience the new dimension!",
	"Steve?",
	"2D EDITION!",
	"Perlin Noise Certified!",
	"Made by Younes!",
	"Blocks everywhere!",
	"Hi, how may I help you?",
	"Minecraft DD!",
	"Minceraft!",
	"Time to mine!",
	"The cake is an unavailable item",
	"Pshhh... Boom!",
	"Creeper? Aw man!",
	"Night time is a myth!",
	"undefined"
]

var subtitle = document.getElementById("subtitle");
var randomNumber = parseInt(Math.round(Math.random() * (subtitles.length - 1)));
subtitle.innerHTML = subtitles[randomNumber];