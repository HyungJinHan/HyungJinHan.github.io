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
