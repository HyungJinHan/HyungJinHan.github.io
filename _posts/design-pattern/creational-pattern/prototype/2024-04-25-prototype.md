---
title: 프로토타입 패턴 (Prototype Pattern)
description: 프로토타입 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, Creational Pattern]
tags: [design-pattern, creational-pattern, prototype] # TAG names should always be lowercase
image:
  path: /assets/img/design-pattern/refactoring-guru/prototype.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Prototype Pattern Image
---

### 개념

- 실제 제품을 만들기에 앞서 테스트를 위한 샘플 제품을 만드는데 이때, 샘플 제품을 프로토타입이라고 함

- 객체를 생성하는데 비용이 많이 들고, 비슷한 객체가 이미 있는 경우에 사용되는 생성 패턴 중 하나
  - <ins>**즉, 프로토타입 패턴은 원본 객체를 새로운 객체에 복사하여 필요에 따라 수정하는 메커니즘을 제공**</ins>

### 패턴 구조

![prototype](/assets/img/design-pattern/structure/prototype.png)

### 예제 코드

{: file='prototype.js'}

```js
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
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
