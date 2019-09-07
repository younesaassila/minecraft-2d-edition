class AudioManager {
	constructor(audioSource, tracks) {
		this.audioSource = audioSource;
		this.tracks = tracks;

		this.volume = 1.0;
		this.loop = false;
	}

	/**
	 * Sets the volume of the given audio source.
	 * @param {number} volume Number from 0 to 1.
	 */
	setVolume(volume) {
		if ((volume != null)
		&& (typeof volume === 'number')
		&& (volume >= 0)
		&& (volume <= 1.0)) {
			this.volume = volume;
		}
	}

	/**
	 * Sets whether the audio should loop or not (false by default).
	 * @param {boolean} loop Boolean value.
	 */
	setLoop(loop) {
		if ((loop != null)
		&& (typeof loop === 'boolean')) {
			this.loop = loop;
		}
	}

	/**
	 * Returns a random track from the given tracks.
	 */
	getTrack() {
		var random = Math.floor(Math.random() * this.tracks.length);
		return this.tracks[random];
	}

	/**
	 * Plays a random track from the given tracks.
	 */
	play() {
		var source = this.getTrack();
		
		this.audioSource.setAttribute('src', source)
		this.audioSource.volume = this.volume;
		this.audioSource.loop = this.loop;
		this.audioSource.load();
		this.audioSource.play();
	}
}
