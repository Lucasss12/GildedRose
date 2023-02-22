const { Shop, Item } = require('../src/gilded_rose.js');

describe("Gilded Rose", function () {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = Number(process.argv[2]) || 2;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      gildedRose.items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("la méthode updateQuality", function () {
    it("doit diminuer la valeur sellIn des articles normaux de 1 chaque jour", function () {
      const items = [new Item("Article normal", 5, 10)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(4);
    });

    it("doit diminuer la valeur quality des articles normaux de 1 chaque jour avant la date de péremption", function () {
      const items = [new Item("Article normal", 5, 10)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].quality).toBe(9);
    });

    it("doit diminuer la valeur quality des articles normaux de 2 chaque jour après la date de péremption", function () {
      const items = [new Item("Article normal", 0, 10)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    });

    it("ne doit pas diminuer la qualité des articles normaux en dessous de 0", function () {
      const items = [new Item("Article normal", 5, 0)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it("doit augmenter la valeur quality d'Aged Brie de 1 chaque jour avant la date de péremption", function () {
      const items = [new Item("Aged Brie", 5, 10)];
      const gildedRose = new Shop(items);
    });

    it("la qualité de Sulfuras ne doit pas se modifier", function() {
      const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
      const gildedRose = new Shop(items);
      gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });
  });

  });