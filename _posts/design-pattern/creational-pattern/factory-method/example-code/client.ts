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
