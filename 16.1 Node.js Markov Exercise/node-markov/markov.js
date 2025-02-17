/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== "");
		this.makeChains();
	}

	/** set markov chains:
	 *
	 *  for text of "the cat in the hat", chains will be
	 *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO

		// Create a new Map for chains
		let chains = new Map();

		for (let i = 0; i < this.words.length - 1; i++) {
			let word = this.words[i];
			let nextWord = this.words[i + 1];

			// If the word already exists in the chains, push the nextWord to its list
			if (chains.has(word)) {
				chains.get(word).push(nextWord);
			} else {
				// Otherwise, create a new entry with the nextWord
				chains.set(word, [nextWord]);
			}
		}

		// Add null as a possible next word for the last word to the list
		let lastWord = this.words[this.words.length - 1];
		if (!chains.has(lastWord)) {
			chains.set(lastWord, [null]);
		}

		this.chains = chains;
	}

	/** return random text from chains */

	makeText(numWords = 100) {
		// TODO

		// Start with a random word
		let randomElement = Math.floor(Math.random() * this.words.length);
		let randomWord = this.words[randomElement];
		let currentWord = randomWord;
		let output = [currentWord];

		for (let i = 0; i < numWords - 1; i++) {
			// Get the list of possible next words
			let nextWords = this.chains[currentWord];

			// Pick a random next word
			randomElement = Math.floor(Math.random() * this.words.length);
			let nextWord = this.words[randomElement];

			// If the next word is null, exit
			if (nextWord === null) break;

			// Add the next word to the output
			output.push(nextWord);

			// Move to the next word
			currentWord = nextWord;
		}

		// Join all the words in the output into a single string
		return output.join(" ");
	}
}

module.exports = MarkovMachine;
