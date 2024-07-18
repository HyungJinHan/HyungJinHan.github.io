---
title: 팩토리 메서드 패턴 (Factory Method Pattern)
description: 팩토리 메서드 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, Creational Pattern]
tags: [design-pattern, creational-pattern, factory-method] # TAG names should always be lowercase
image:
  path: /assets/img/refactoring-guru/factory-method.png
  alt: Factory Method Pattern Image
---

### 개념

- 인스턴스 생성을 하위 클래스에 위임

- 템플릿 메소드 패턴을 변경한 패턴으로, 인스턴스를 만드는 방법은 상위 클래스에서 결정하고, 인스턴스를 실제로 생성하는 일을 하위 클래스에서 결정

- 구체적인 제품 생성을 공장을 통해서 진행

- 팩토리 패턴은 슈퍼 클래스와 여러 개의 서브 클래스가 있는 상황에서 입력값에 따라서 하나의 서브 클래스를 반환하는 상황일 때 주로 사용

- 클라이언트 클래스는 팩토리 클래스에게 인스턴스를 생성하는 책임을 위임

### 패턴 구조

![factory_method_1](/assets/img/structure/factory_method_1.png)

- `Creator`

  - 최상위 공장 클래스로서, 팩토리 메서드를 추상화하여 서브 클래스로 하여금 구현하도록 함

  - `Product` 클래스를 생성하는 추상 클래스

  - `Creator`는 실제 제품을 생성하는 일을 `ConcreteCreator`의 역할에 대해서 아무것도 모름

- `ConcreteCreator`

  - 구체적인 제품을 만드는 클래스

  - 각 서브 공장 클래스들은 이에 맞는 제품 객체를 반환하도록 생성, 추상 메소드를 재정의함

    - 즉, 제품 객체 하나 당, 그에 걸맞는 생산 공장 객체가 위치됨

- `Product`

  - 제품 구현체를 추상화

  - 생성된 제품(인스턴스)이 가지고 있어야 할 인터페이스(API)를 결정하는 추상 클래스

  - 구체적인 역할은 하위 클래스인 `ConcreteProduct`가 결정함

- `ConcreteProduct`

  - 제품 구현체

  - 구체적인 제품을 나타내는 클래스

> [Abstract Factory VS Factory Method](https://hyungjinhan.github.io/posts/abstract-factory-method/)

### 패턴 예제

#### 버튼 만들기

- [예제 코드 보러가기](https://github.com/HyungJinHan/design_pattern/tree/main/CreationalPattern/AbstractVSFactoryMethod/ButtonExample)

#### 예제 코드

{: file='product.ts'}

```ts
// 제품 객체 추상화 (인터페이스)
interface IProduct {
  setting(): void;
}

// 제품 구현체
class ConcreteProductA implements IProduct {
  setting(): void {}
}

class ConcreteProductB implements IProduct {
  setting(): void {}
}

/* ------------------------------------------------------------ */

class ShipProduct {
  name: string;
  color: string;
  capacity: string;

  constructor(name: string, color: string, capacity: string) {
    this.name = name;
    this.color = color;
    this.capacity = capacity;
  }

  /** @override */
  public toString(): string {
    return `Ship { name: ${this.name}, color: ${this.color}, logo: ${this.capacity} }\n`;
  }
}

class ContainerShip extends ShipProduct {
  constructor(name: string, capacity: string, color: string) {
    super(name, capacity, color);
  }
}

class OilTankerShip extends ShipProduct {
  constructor(name: string, capacity: string, color: string) {
    super(name, capacity, color);
  }
}

/** -------------- Product 확장 -------------- */
class BattleShip extends ShipProduct {
  constructor(name: string, capacity: string, color: string) {
    super(name, capacity, color);
  }
}

export {
  BattleShip,
  ConcreteProductA,
  ConcreteProductB,
  ContainerShip,
  IProduct,
  OilTankerShip,
  ShipProduct,
};
```

{: file='factory.ts'}

```ts
import {
  ConcreteProductA,
  ConcreteProductB,
  ContainerShip,
  IProduct,
  ShipProduct,
} from "./product";

abstract class AbstractFactory {
  // 객체 생성 전처리 / 후처리 메소드(Java의 경우, final로 오버라이딩 방지) 템플릿화
  createOperation(): IProduct {
    let product: IProduct = this.createProduct(); // 서브 클래스에서 구체화한 팩토리 메서드 실행
    product.setting(); // 이 외의 객체 생성에 가미할 로직 실행
    return product; // 제품 객체를 생성 및 추가 설정하고 완성된 제품을 반환
  }

  // 팩토리 메서드 : 구체적인 객체 생성 종류는 각 서브 클래스에 위임
  // protected이기 때문에 외부에 노출이 안됨
  protected abstract createProduct(): IProduct;
}

// 공장 객체 A (ProductA를 생성하여 반환)
class ConcreteFactoryA extends AbstractFactory {
  /** @override */
  public override createProduct(): IProduct {
    return new ConcreteProductA();
  }
}

// 공장 객체 B (ProductB를 생성하여 반환)
class ConcreteFactoryB extends AbstractFactory {
  /** @override */
  public override createProduct(): IProduct {
    return new ConcreteProductB();
  }
}

/* ------------------------------------------------------------ */

abstract class ShipFactory {
  // 객체 생성 전처리 / 후처리 메서드 (상속 불가)
  orderShip(email: string): ShipProduct {
    this.validate(email);

    const ship: ShipProduct = this.createShip(); // 선박 객체 생성

    this.sendEmailTo(email, ship);
    this.shipInfo(ship);

    return ship;
  }

  // 팩토리 메서드
  protected abstract createShip(): ShipProduct;

  private validate(email: string): void {
    if (email === "") {
      throw console.error("이메일을 남겨주세요.");
    }
  }

  private sendEmailTo(email: string, ship: ShipProduct) {
    console.log(
      `${ship.name}이(가) 완성되었다고 ${email}로 메일을 전송했습니다.`
    );
  }

  private shipInfo(ship: ShipProduct) {
    console.log(
      `Ship Information { name: ${ship.name}, color: ${ship.color}, logo: ${ship.capacity} }\n`
    );
  }
}

class ContainerShipFactory extends ShipFactory {
  /** @override */
  protected override createShip(): ShipProduct {
    return new ContainerShip("ContainerShip", "20t", "green");
  }
}
class OilTankerShipFactory extends ShipFactory {
  /** @override */
  protected override createShip(): ShipProduct {
    return new ContainerShip("OilTankerShip", "15t", "blue");
  }
}

/** -------------- Factory 확장 -------------- */
class BattleShipFactory extends ShipFactory {
  /** @override */
  protected override createShip(): ShipProduct {
    return new ContainerShip("BattleShip", "10t", "black");
  }
}

export {
  AbstractFactory,
  BattleShipFactory,
  ConcreteFactoryA,
  ConcreteFactoryB,
  ContainerShipFactory,
  OilTankerShipFactory,
  ShipFactory,
};
```

{: file='client.ts'}

```ts
import {
  AbstractFactory,
  BattleShipFactory,
  ConcreteFactoryA,
  ConcreteFactoryB,
  ContainerShipFactory,
  OilTankerShipFactory,
} from "./factory";
import { ShipProduct } from "./product";

class Client {
  public static main(_args?: string[]): void {
    // 1. 공장 객체 생성 (리스트)
    const factory: AbstractFactory[] = [
      new ConcreteFactoryA(),
      new ConcreteFactoryB(),
    ];

    // 2. 제품 A 생성 (안에서 createProduct()와 생성 후처리 실행)
    const productA = factory[0].createOperation();

    // 3. 제품 A 생성 (안에서 createProduct()와 생성 후처리 실행)
    const productB = factory[1].createOperation();
  }
}

/* ------------------------------------------------------------ */

class ShipClient {
  public static main(_args?: []): void {
    const factory: ShipProduct[] = [
      new ContainerShipFactory().orderShip("han1210_36@naver.com"),
      new OilTankerShipFactory().orderShip("hhj@odn.us"),
      /** -------------- 확장한 Factory 사용 -------------- */
      new BattleShipFactory().orderShip("hhj961210@gmail.com"),
    ];

    factory.map((res) => res);
  }
}

ShipClient.main();
// ContainerShip이(가) 완성되었다고 han1210_36@naver.com로 메일을 전송했습니다.
// Ship Information { name: ContainerShip, color: 20t, logo: green }

// OilTankerShip이(가) 완성되었다고 hhj@odn.us로 메일을 전송했습니다.
// Ship Information { name: OilTankerShip, color: 15t, logo: blue }

// BattleShip이(가) 완성되었다고 hhj961210@gmail.com로 메일을 전송했습니다.
// Ship Information { name: BattleShip, color: 10t, logo: black }
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
