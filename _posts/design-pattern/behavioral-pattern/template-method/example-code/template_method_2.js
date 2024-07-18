function Abstract() {
  // this는 추상클래스, obj는 추상클래스를 상속한 클래스
  this.implements = function (obj) {
    let notImplementMethod = [];
    for (let method in this) {
      if (method !== "impleements" && method == "copyMethod") {
        // obj.__proto__ 객체가 method를 가지고 있지 않으면
        if (
          typeof this[method] === "function" &&
          this[method].abstract &&
          !Object.hasOwnProperty.call(obj.__proto__.method)
        ) {
          notImplementMethod.push(method);
        }
      }
    }

    if (notImplementMethod.length > 0) {
      throw new Error(
        obj.__proto__.constructor.name +
          "클래스의" +
          notImplementMethod.join() +
          "메서드가 구현되지 않았습니다."
      );
    }

    return this;
  };

  this.copyMethod = function (fn, method, abstractMethod) {
    for (let m in method) {
      fn.prototype[m] = method[m];
    }

    for (let m in abstractMethod) {
      fn.prototype[m] = abstractMethod[m];
      fn.prototype[m].abstract = true;
    }
  };

  return this;
}

// Motors 추상클래스 정의
let Motors = (function () {
  let className = "Motors";

  function fn() {
    if (this.constructor === fn) {
      throw new Error(className + "추상클래스는 객체를 생성할 수 없습니다.");
    }

    return this.implements(this);
  }

  let method = {
    buildCar: function () {
      this.prepareParts();
      this.assembleParts();
      this.addTire();
      console.log("자동차 조립 완료");
    },
    prepareParts: function () {
      console.log("자동차 부품을 준비합니다.");
    },
    assembleParts: function () {
      console.log("부품을 조립합니다.");
    },
  };

  let abstractMethod = {
    addTire: function () {},
  };

  // 추상클래스의 extends 메서드를 method 객체에 이식
  Abstract.call(method).copyMethod(fn, method, abstractMethod);

  return fn;
})();

function AMotors() {
  Motors.call(this);
}

AMotors.prototype = Object.create(Motors.prototype);
AMotors.prototype.constructor = AMotors;
AMotors.prototype.addTire = function () {
  console.log("A 타이어를 장착합니다.");
};

function BMotors() {
  Motors.call(this);
}

BMotors.prototype = Object.create(Motors.prototype);
BMotors.prototype.constructor = BMotors;
BMotors.prototype.addTire = function () {
  console.log("B 타이어를 장착합니다.");
};
BMotors.prototype.prepareParts = function () {
  console.log("B Motors에서 자동차 부품을 준비합니다.");
};

function Client() {}

Client.prototype.test = function () {
  let aMotors = new AMotors();
  let bMotors = new BMotors();
  aMotors.buildCar();

  console.log("---------------------------------");

  bMotors.buildCar();
};

new Client().test();
