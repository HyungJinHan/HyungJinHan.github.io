---
title: 추상 팩토리 패턴 (Abstract Factory Pattern)
description: 추상 팩토리 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, Creational Pattern]
tags: [design-pattern, creational-pattern, abstract-factory] # TAG names should always be lowercase
image:
  path: /assets/img/refactoring-guru/abstract-factory.png
  alt: Abstract Factory Pattern Image
---

### 개념

- 연관성있는 객체 군이 여러개 있을 경우 이들을 묶어 추상화하고, 어떤 구체적인 상황이 주어지면 팩토리 객체에서 집합으로 묶은 객체 군을 구현화하는 생성 패턴

- 클라이언트에서 특정 객체를 사용할 때 팩토리 클래스만을 참조하여 특정 객체에 대한 구현부를 감추어 역할과 구현을 분리시킬 수 있음

- 즉, 추상 팩토리 패턴의 핵심은 <ins>**제품 "군" 집합**</ins>을 타입 별로 찍어낼 수 있다는 점이 포인트

### 패턴 구조

![abstract_factory](/assets/img/structure/abstract_factory.png)

- `AbstractFactory`

  - 최상위 공장 클래스

  - 여러 개의 제품들을 생성하는 여러 메소드들을 추상화함

- `ConcreteFactory`

  - 서브 공장 클래스들은 타입에 맞는 제품 객체를 반환하도록 메소드들을 재정의함

- `AbstractProduct`

  - 각 타입의 제품들을 추상화한 인터페이스

- `ConcreteProduct (ProductA ~ ProductB)`

  - 각 타입의 제품 구현체들

  - 이들은 팩토리 객체로부터 생성됨

- `Client`

  - 추상화된 인터페이스만을 이용하여 제품을 받기 때문에 구체적인 제품, 공장에 대해서는 모름 (사용만 할 줄 알고 원리는 모름)

> [Abstract Factory VS Factory Method](https://hyungjinhan.github.io/posts/abstract-factory-method/)

### 패턴 예제

#### 버튼 만들기

![abstract_factory_example](/assets/img/example/abstract_factory_example.png)

- [예제 코드 보러가기](https://github.com/HyungJinHan/design_pattern/tree/main/CreationalPattern/AbstractVSFactoryMethod/ButtonExample)

#### 예제 코드

{: file='abstract_factory.js'}

```js
const abstractFactory = (() => {
  let jobs = {};
  return {
    addJob: (job, Character) => {
      if (Character.prototype.attack) {
        // attack 메소드가 있어야만 등록 가능
        jobs[job] = Character;
      }
    },
    create: (job, options) => {
      // 등록한 작업을 바탕으로 실제 객체 생성
      let Character = jobs[job];
      return Character ? new Character(options) : null;
    },
  };
})();

const Emperor = (() => {
  class Emperor {
    constructor(options) {
      this.name = options.name;
    }
    attack(target) {
      console.log(this.name, "attacks", target, "\n");
    }
    proclaim() {
      console.log(this.name, "proclaims emperor", "\n");
    }
  }
  return Emperor;
})();

const Governor = (() => {
  class Governor {
    constructor(options) {
      this.name = options.name;
    }
    attack(target) {
      console.log(this.name, "attacks", target, "\n");
    }
    betray() {
      console.log(this.name, "betrays emperor", "\n");
    }
  }
  return Governor;
})();

const Runner = (() => {
  class Runner {
    constructor(options) {
      this.name = options.name;
    }
    attack() {
      return;
    }
    run() {
      console.log(this.name, "runs", "\n");
    }
  }
  return Runner;
})();

module.exports = { abstractFactory, Emperor, Governor, Runner };
```

{:file='index.js'}

```js
const {
  abstractFactory,
  Emperor,
  Governor,
  Runner,
} = require("./abstract_factory");

abstractFactory.addJob("emperor", Emperor);
abstractFactory.addJob("governor", Governor);
abstractFactory.addJob("runner", Runner);

let emperorInfo = {
  nero: { name: "Nero" },
};
let governorInfo = {
  vindex: { name: "Vindex" },
  galba: { name: "Galba" },
  otho: { name: "Otho" },
  vitellius: { name: "Vitellius" },
  rufus: { name: "Rufus" },
};

const nero = abstractFactory.create("emperor", emperorInfo.nero);
const runner_nero = abstractFactory.create("runner", emperorInfo.nero);
const vindex = abstractFactory.create("governor", governorInfo.vindex);
const galba = abstractFactory.create("governor", governorInfo.galba);
const otho = abstractFactory.create("governor", governorInfo.otho);
const vitellius = abstractFactory.create("governor", governorInfo.vitellius);
const rufus = abstractFactory.create("governor", governorInfo.rufus);

nero.proclaim();
nero.attack("All");

vindex.betray();
vindex.attack(emperorInfo.nero.name);

galba.betray();
galba.attack(emperorInfo.nero.name);

otho.betray();
otho.attack(emperorInfo.nero.name);

vitellius.betray();
vitellius.attack(emperorInfo.nero.name);

rufus.betray();
rufus.attack(emperorInfo.nero.name);

runner_nero.run();
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
