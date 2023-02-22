class Item {
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
		this.isLegendary = false;
		this.isBetterWhenOdler = false;
		this.isConjured = false;
		this.expireSpeed = 1;
	}

	checkName() {
		if (this.name.includes('Backstage', 0) || this.name.includes('Aged Brie', 0)) {
			this.isBetterWhenOdler = true;
		} else if (this.name.includes('Sulfuras', 0)) {
			this.isLegendary = true;
		} else if (this.name.includes('Conjured', 0)) {
			this.isConjured = true;
			this.expireSpeed = 2;
		}
	}

	qualityExceeded() {
		if (this.quality >= 50 || this.quality <= 0) {
			if (this.quality > 50) this.quality = 50;
			if (this.quality < 0) this.quality = 0;
		}
	}

	isExpired() {
		if (this.sellIn <= 0) {
			if (this.isBetterWhenOdler) {
				this.quality = 0;
			} else {
				this.expireSpeed = 2;

				if (this.isConjured) this.expireSpeed = 4;

				this.quality -= this.expireSpeed;
				this.qualityExceeded();
			}
			this.sellIn--;
			return true;
		}
		return false;
	}

	dailyCount() {
		if (this.isLegendary) {
			return;
		}

		if (this.isExpired()) return;

		if (this.isBetterWhenOdler) {
			if (this.sellIn <= 10 && this.sellIn > 5) {
				this.quality += 2;
			} else if (this.sellIn <= 5) {
				this.quality += 3;
			} else this.quality++;
		} else {
			this.quality -= this.expireSpeed;
		}
		this.qualityExceeded();
		this.sellIn--;
	}
}

class Shop {
	constructor(items = []) {
		this.items = items;
	}

	updateQuality() {
		this.items.forEach((product) => {
				product.checkName();
				product.dailyCount();
				});

		return this.items;
	}
}

module.exports = {
	Item,
	Shop,
};
