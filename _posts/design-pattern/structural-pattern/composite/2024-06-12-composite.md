---
title: 복합체 패턴 (Composite Pattern)
description: 복합체 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, Structural Pattern]
tags: [design-pattern, creational-pattern, composite] # TAG names should always be lowercase
image:
  path: /assets/img/refactoring-guru/composite.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Composite Pattern Image
---

## Composite Pattern

### 개념

- 복합 객체(`Composite`)와 단일 객체(`Leaf`)를 동일한 컴포넌트로 취급하여, 클라이언트에게 이 둘을 구분하지 않고 동일한 인터페이스를 사용하도록 하는 구조 패턴

  - 정리하자면, 복합체 패턴은 그릇과 내용물을 동일시해서 재귀적인 구조를 만들기 위한 디자인 패턴이라고 말할 수 있음

- 복합체 패턴은 전체-부분의 관계를 갖는 객체들 사이의 관계를 트리 계층 구조로 정의해야 할 때 유용함

  - 윈도우나 리눅스의 <ins>**파일 시스템 구조**</ins>를 떠올려보면 쉽게 이해할 수 있음

  - 디렉토리 개념의 예시 이미지

    ![composite_example](/assets/img/example/composite_example.png)

    - 폴더(디렉토리) 안에는 파일이 들어있을 수도 있고, 파일을 담은 또 다른 폴더도 들어있을 수 있음

    - 이를 복합적으로 담을 수 있다고 해서 `Composite` 객체라고 불림

    - 반면, 파일은 단일 객체이기 때문에 이를 `Leaf` 객체라고 불림

      - 즉, `Leaf`는 자식이 없음

### 패턴 구조

![composite](/assets/img/structure/composite.png)

- `Component`

  - `Leaf`와 `Composite`를 묶는 공통적인 상위 인터페이스

- `Composite`

  - 복합 객체로서, `Leaf` 역할이나 `Composite` 역할을 넣어 관리하는 역할

  - `Component` 구현체들을 내부 리스트로 관리함

  - `add`와 `remove` 메소드는 내부 리스트에 단일 / 복합 객체를 저장

  - `Component` 인터페이스의 구현 메서드인 `operation`은 복합 객체에서 호출되면 재귀하여, 추가 단일 객체를 저장한 하위 복합 객체를 순회하게 됨

- `Leaf`

  - 단일 객체로서 단순하게 내용물을 표시하는 역할

  - `Component` 인터페이스의 구현 메서드인 `operation`은 단일 객체에서 호출되면 적절한 값만 반환

- `Client`

  - 클라이언트는 `Component`를 참조하여 단일 / 복합 객체를 하나의 객체로서 다룸

### 예제 코드

#### 폴더 구조 예제

{: file='folder_example/component.ts'}

```ts
/** Component 인터페이스 */
interface Node {
  // 계층 트리 출력
  // print(): void;
  print(str: string): void;

  // 파일/폴더 용량 얻기
  getSize(): number;
}

export { Node };
```

{: file='folder_example/composite.ts'}

```ts
import { Node } from "./component";

/** Composite 객체 */
class Folder implements Node {
  private name: string; // 폴더 이름
  private list: Node[];

  constructor(name: string) {
    this.name = name;
    this.list = [];
  }

  // 리스트에 폴더, 파일 추가
  public add(node: Node): void {
    this.list.push(node);
  }

  public print(str: string): void {
    const size = this.getSize(); // 폴더가 담고 있는 모든 파일에 대한 용량 합산

    console.log(`${str} 📂 ${this.name} (${size}KB)`);

    for (const node of this.list) {
      // Folder 일 경우 재귀 동작
      node.print(str + "   "); // 인자로 공백문자를 할당하여 indent 처리
    }
  }

  // 각 파일의 용량(KB) 구하기
  public getSize(): number {
    let sum = 0;

    for (const node of this.list) {
      sum += node.getSize(); // print 로직과 똑같이 재귀 동작
    }

    return sum;
  }
}

export { Folder };
```

{: file='folder_example/leaf.ts'}

```ts
import { Node } from "./component";

/** Leaf 객체 */
class File implements Node {
  private name: string; // 파일 이름
  private size: number; // 파일 사이즈

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  public print(str: string): void {
    console.log(`${str} 📄 ${this.name} (${this.size}KB)`);
  }

  public getSize(): number {
    return this.size;
  }
}

export { File };
```

{: file='folder_example/client.ts'}

```ts
import { Folder } from "./composite";
import { File } from "./leaf";

class Client {
  public static main(_args?: []): void {
    const root: Folder = new Folder("root");

    const file_1: File = new File("file_1", 10);

    const sub_1: Folder = new Folder("sub_1");
    const sub_2: Folder = new Folder("sub_2");

    root.add(sub_1);
    root.add(file_1);
    root.add(sub_2);

    const file_1_1: File = new File("file_1_1", 10);
    const file_1_2: File = new File("file_1_2", 10);

    sub_1.add(file_1_1);
    sub_1.add(file_1_2);

    const file_2_1: File = new File("file_2_1", 10);

    sub_2.add(file_2_1);

    // 전체 dir 출력
    root.print("");
  }
}

Client.main();
// 📂 root (40KB)
//    📂 sub_1 (20KB)
//       📄 file_1_1 (10KB)
//       📄 file_1_2 (10KB)
//    📄 file_1 (10KB)
//    📂 sub_2 (10KB)
//       📄 file_2_1 (10KB)
```

#### 아이템 가방 예제

{: file='item_example/component.ts'}

```ts
/** Component 인터페이스 */
interface IItemComponent {
  getPrice(): number;
  getName(): string;
}

export { IItemComponent };
```

{: file='item_example/composite.ts'}

```ts
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
```

{: file='item_example/leaf.ts'}

```ts
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
```

{: file='item_example/client.ts'}

```ts
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
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
