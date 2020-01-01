const splashes = [
	"Now in 2D!",
	"Experience the new dimension!",
	"2D EDITION!",
	"HTML TABLE EDITION!",
	"Blocks everywhere!",
	"Blocky bois!",
	"Minceraft!",
	"Time to mine!",
	"The cake is an unavailable item.",
	"Bim bam boom!",
	"Creeper? Aww man!",
	"Night time is a myth!",
	"Open your eyes...",
	"It's-a-me!",
	"Woohoo!",
	"What's up?",
	"Stack Overflow!",
	"Music by C418!",
	"JavaScript, also known as Java for short...",
	"I don't know why but it works!",
	"It's A Hard-Knock Life!",
	"You're a real gamer!"
]

function getSplashText(index = null) {
	if ((index != null)
	&& (typeof index === 'number')
	&& !(typeof splashes[index] === 'undefined')) {
		return splashes[index];
	} else {
		// Return 'Happy new year!' if the date is January 1st.
		const date = new Date();
		if (date.getDate() == 1 && date.getMonth() == 0) {
			return "Happy new year!";
		}
		// Otherwise, return a random splash text.
		const random = Math.floor(Math.random() * splashes.length);
		return splashes[random];
	}
}
