import { Bag } from "./composite";
import { Item } from "./leaf";

class Client {
  public static main(_args?: string[]): void {
    // 1. 장비 가방 인스턴스 생성
    const bag_equipment: Bag = new Bag("장비 가방");

    // 2. 아이템 인스턴스 생성
    const armor: Item = new Item("갑옷", 250);
    const sword: Item = new Item("장검", 500);

    // 3. 장비 가방에는 모험에 필요한 장비 아이템만을 추가
    bag_equipment.add(armor);
    bag_equipment.add(sword);

    // 4. 소모품 가방 인스턴스 생성
    const bag_food: Bag = new Bag("소모품 가방");

    // 5. 아이템 인스턴스 생성
    const apple: Item = new Item("사과", 400);
    const banana: Item = new Item("바나나", 130);

    // 6. 소모품 가방에는 음식 아이템만을 추가
    bag_food.add(apple);
    bag_food.add(banana);

    // 7. 장비 가방과 소모품 가방을 담을 인벤토리 가방 인스턴스 생성
    const bag_inventory: Bag = new Bag("인벤토리");

    // 8. 장비 가방과 소모품 가방을 인벤토리 가방에 넣음
    bag_inventory.add(bag_equipment);
    bag_inventory.add(bag_food);

    // ----------------------------------------------------------------- //
    const client: Client = new Client();

    // 장비 가방의 아이템의 가격의 총합
    client.printPrice(bag_equipment);

    // 소모품 가방의 아이템의 가격의 총합
    client.printPrice(bag_food);

    // 장비 가방의 가격 총합 + 소모품 가방의 가격 총합
    client.printPrice(bag_inventory);
  }

  public printPrice(bag: Bag): void {
    const result: number = bag.getPrice();
    console.log(`${bag.getName()}의 아이템 총합 : ${result}골드`);
  }
}

Client.main();
// 장비 가방의 아이템 총합 : 750골드
// 소모품 가방의 아이템 총합 : 530골드
// 인벤토리의 아이템 총합 : 1280골드
