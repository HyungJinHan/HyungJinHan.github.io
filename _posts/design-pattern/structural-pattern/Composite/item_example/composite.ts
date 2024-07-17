import { IItemComponent } from "./component";

/** Composite 객체 */
class Bag implements IItemComponent {
  // 아이템들과 서브 가방 모두를 저장하기 위해 인터페이스 타입 리스트로 관리
  components: IItemComponent[] = new Array<IItemComponent>();
  name: string; // 가방 이름

  constructor(name: string) {
    this.name = name;
  }

  // 리스트에 아이템 & 가방 추가
  public add(item: IItemComponent): void {
    this.components.push(item);
  }

  // 현재 가방의 내용물을 반환
  public getComponents(): IItemComponent[] {
    return this.components;
  }

  public getPrice(): number {
    let sum: number = 0;

    for (const component of this.components) {
      // 만일 리스트에서 가져온 요소가 Item이면 정수값을 받고, Bag이면 "재귀 함수" 동작 ⭐️
      sum += component.getPrice(); // 자기 자신 호출 (재귀)
    }

    return sum;
  }

  public getName(): string {
    return this.name;
  }
}

export { Bag };
