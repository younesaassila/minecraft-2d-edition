const splashes = [
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
	"Blocky bois!",
	"Open your eyes...",
	"It's-a-me!",
	"Woohoo!",
	"Writing this on September 6 2019",
	"Howdy?",
	"Happy new year!",
	"10^100 it!",
	"Stack Overflow",
	"This text should appear very long on your screen because of its length being very big!",
	"Playing on my 4K 144Hz monitor!",
	"Whaaat?",
	"Music by C418"
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