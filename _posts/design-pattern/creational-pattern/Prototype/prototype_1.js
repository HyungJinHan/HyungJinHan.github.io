// Prototype Pattern 기본
let vehiclePrototype = {
  init: function (carModel) {
    this.model = carModel;
  },
  getModel: function () {
    console.log(`The model of this vehicle is ${this.model}`);
  },
};

const vehicle = (model) => {
  function F() {}
  F.prototype = vehiclePrototype;

  let f = new F();
  f.init(model);

  return f;
};

let car = vehicle("Tesla Model X");

car.getModel(); // Tesla Model X

// 메소드를 외부에서 Prototype에 지정
class Car {
  constructor(make, model, level, color, warranty) {
    this.make = make;
    this.model = model;
    this.level = level;
    this.color = color;
    this.color = color;
    this.warranty = warranty;
  }
  getInfo() {
    return console.log(
      "----------------------------------------------------\n" +
        `${this.make}, ${this.model}, ${this.level}, ${this.color}, ${this.warranty}`
    );
  }
}

let newCar = new Car("Tesla", "Model X", "Sedan", "White", "5 Year");

Car.prototype.zeroback = function () {
  return console.log("2.9 seconds");
};

newCar.getInfo(); // Tesla, Model X, Sedan, White, 5 Year
newCar.zeroback(); // 2.9 seconds
