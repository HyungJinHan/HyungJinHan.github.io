import { IItemComponent } from "./component";

/** Leaf 객체 */
class Item implements IItemComponent {
  name: string; // 아이템 이름
  price: number; // 아이템 가격

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getPrice(): number {
    return this.price;
  }

  public getName(): string {
    return this.name;
  }
}

export { Item };
