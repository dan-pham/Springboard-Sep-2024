class Item {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}

	toJSON() {
		return {
			name: this.name,
			price: this.price,
		};
	}
}

module.exports = Item;
