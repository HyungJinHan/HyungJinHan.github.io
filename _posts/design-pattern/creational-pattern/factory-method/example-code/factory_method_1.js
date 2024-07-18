/**
 *
 * @param {number} price
 * @returns
 */
const pricMaker = (price) => {
  const commaPrice = price
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  return `${commaPrice}₩`;
};

class FriedChicken {
  constructor() {
    const price = 18000;
    const taste = "바삭한 맛";
    const favorite = "⭐️⭐️⭐️⭐️";

    this.price = () => {
      console.log("-------------------------");
      console.log(`가격 : ${pricMaker(price)}`);
    };
    this.taste = () => {
      console.log(`맛 : ${taste}`);
    };
    this.favorite = () => {
      console.log(`인기도 : ${favorite}`);
      console.log("-------------------------");
    };
  }
}

class SeasonedSpicyChicken {
  constructor() {
    const price = 20000;
    const taste = "약간 매운 맛";
    const favorite = "⭐️⭐️⭐️";

    this.price = () => {
      console.log("-------------------------");
      console.log(`가격 : ${pricMaker(price)}`);
    };
    this.taste = () => {
      console.log(`맛 : ${taste}`);
    };
    this.favorite = () => {
      console.log(`인기도 : ${favorite}`);
      console.log("-------------------------");
    };
  }
}

class HoneycomboChicken {
  constructor() {
    const price = 23000;
    const taste = "달달한 맛";
    const favorite = "⭐️⭐️⭐️⭐️⭐️";

    this.price = () => {
      console.log("-------------------------");
      console.log(`가격 : ${pricMaker(price)}`);
    };
    this.taste = () => {
      console.log(`맛 : ${taste}`);
    };
    this.favorite = () => {
      console.log(`인기도 : ${favorite}`);
      console.log("-------------------------");
    };
  }
}

class ChickenFactory {
  constructor() {
    /**
     *
     * @param {string} type - 후라이드, 양념, 허니콤보
     * @returns
     */
    this.createChicken = (type) => {
      switch (type) {
        case "후라이드":
          return new FriedChicken();
        case "양념":
          return new SeasonedSpicyChicken();
        case "허니콤보":
          return new HoneycomboChicken();
        default:
          return new FriedChicken();
      }
    };
  }
}

/**
 *
 * @param {string} chickenType - 후라이드, 양념, 허니콤보
 */
const chicken_info = (chickenType) => {
  const chicken_info = new ChickenFactory();

  chicken_info.createChicken(chickenType).price();
  chicken_info.createChicken(chickenType).taste();
  chicken_info.createChicken(chickenType).favorite();
};

const chickenType = "양념";

chicken_info(chickenType);
