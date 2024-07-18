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
