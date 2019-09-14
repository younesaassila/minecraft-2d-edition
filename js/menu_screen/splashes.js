const splashes = [
	"Now in 2D!",
	"Experience the new dimension!",
	"Steve?",
	"2D EDITION!",
	"Blocks everywhere!",
	"Minceraft!",
	"Time to mine!",
	"The cake is an unavailable item",
	"Pshhh... Boom!",
	"Creeper? Aw man!",
	"Night time is a myth!",
	"Blocky bois!",
	"Open your eyes...",
	"It's-a-me!",
	"Woohoo!",
	"Howdy?",
	"Happy new year!",
	"10^100 it!",
	"Stack Overflow!",
	"This text should appear very big on your screen because of its length being very long!",
	"Playing on my 144Hz monitor!",
	"Whaaat?",
	"Music by C418!",
	"undefined!",
	"JavaScript, also known as Java for short...",
	"I don't know why but it works!",
	"Random Splash Text",
	"It's A Hard-Knock Life!",
	"AZERTY",
	"Compatible with Mozilla Firefox!",
	"You're not a real gamer unless you play on Internet Explorer!"
]

function getSplashText(index = null) {
	if ((index != null)
	&& (typeof index === 'number')
	&& !(typeof splashes[index] === 'undefined')) {
		return splashes[index];
	} else {
		var random = Math.floor(Math.random() * splashes.length);
		return splashes[random];
	}
}