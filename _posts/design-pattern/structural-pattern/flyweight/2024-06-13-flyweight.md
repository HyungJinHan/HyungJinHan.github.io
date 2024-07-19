---
title: 경량 패턴 (Flyweight Pattern)
description: 경량 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, 4. Structural Pattern]
tags: [design-pattern, creational-pattern, flyweight] # TAG names should always be lowercase
image:
  path: /assets/img/refactoring-guru/flyweight.png
  alt: Flyweight Pattern Image
---

### 개념

- 재사용 가능한 객체 인스턴스를 공유시켜 메모리 사용량을 최소화하는 패턴

- 간단히 말하면 캐시(`Cache`) 개념을 코드로 패턴화 한 것

  - 자주 변화하는 속성(extrinsic)과 변화하지 않는 속성(intrinsic)을 분리하고 변하지 않는 속성을 캐시하여 재사용해 메모리 사용을 줄이는 방식

  - 그래서 동일하거나 유사한 객체들 사이에 가능한 많은 데이터를 서로 공유하여 사용하도록 하여 최적화를 노리는 경량 패턴이라고도 불림

  > `Intrinsic` & `Extrinsic`
  >
  > - `Intrinsic` (<ins>**공유할 수 있는 객체**</ins>)
  >
  >   - "고유한, 본질적인"이라는 의미를 가지며, 본직적인 상태란 인스턴스가 어떠한 상황에서도 변하지 않는 정보를 말함
  >
  >   - 그래서 값이 고정되어 있기에 충분히 언제 어디서 공유해도 문제가 없음
  >
  > - `Extrinsic` (<ins>**공유할 수 없는 객체**</ins>)
  >
  >   - "외적인, 비본질적인"이라는 의미를 가지며, 인스턴스를 두는 장소나 상황에 따라서 변화하는 정보를 말함
  >
  >   - 그래서 값이 언제 어디서 변화할지 모르기 때문에 이를 캐시해서 공유할 수 없음

- 객체를 일일히 생성한 것과 객체를 공유 상태로 만든 것에 대한 메모리 무게 차이

### 패턴 구조

![flyweight](/assets/img/structure/flyweight.png)

- `Flyweight`

  - 경량 객체를 묶는 인터페이스

- `ConcreteFlyweight`

  - 공유 가능한 재사용되는 객체 (intrinsic state) -> 변화하지 않는 속성

- `UnsharedConcreteFlyweight`

  - 공유 불가능한 객체 (extrinsic state) -> 자주 변화하는 속성

- `FlyweightFactory`

  - 경량 객체를 만드는 공장 역할과 캐시 역할을 겸비하는 `Flyweight` 객체 관리 클래스

  - `GetFlyweight()` 메서드는 팩토리 메서드 역할을 한다고 보면 됨

  - 만일 객체가 메모리에 존재하면 그대로 가져와 반환(캐싱)하고, 없다면 새로 생성해 반환

- `Client`

  - `Client`는 `FlyweightFactory`를 통해 `Flyweight` 타입의 객체를 얻어 사용

### 예제 코드

#### 경량 패턴 적용 전 코드

{: file='before/memory.ts'}

```ts
export class Memory {
  public static size: number = 0; // 메모리 사용량

  public static print_memory(): void {
    console.log("총 메모리 사용량 : " + Memory.size + "MB" + "\n");
  }
}
```

{: file='before/tree.ts'}

```ts
import { Memory } from "./memory";

export class BeforeTree {
  objSize: number = 100; // 100MB
  type: string; // 나무 종류
  mesh: object; // 메쉬
  texture: object; // 나무 껍질 + 잎사귀 텍스쳐

  // 위치 변수
  position_x: number;
  position_y: number;

  constructor(
    type: string,
    mesh: object,
    texture: object,
    position_x: number,
    position_y: number
  ) {
    this.type = type;
    this.mesh = mesh;
    this.texture = texture;
    this.position_x = position_x;
    this.position_y = position_y;

    // 나무 객체를 생성하였으니 메모리 사용 크기 증가
    Memory.size += this.objSize;
  }
}
```

{: file='before/terrain.ts'}

```ts
import { BeforeTree } from "./tree";

export class BeforeTerrain {
  // 지형 타일 크기
  static CANVAS_SIZE: number = 10000;

  // 나무 렌더링
  public render(
    type: string,
    mesh: object,
    texture: object,
    _position_x: number,
    _position_y: number
  ): void {
    // 나무를 지형에 생성
    const tree = new BeforeTree(
      type,
      mesh,
      texture,
      Math.random() * BeforeTerrain.CANVAS_SIZE,
      Math.random() * BeforeTerrain.CANVAS_SIZE
    );

    console.log(
      "x: " +
        tree.position_x +
        " y: " +
        tree.position_y +
        " 위치에 " +
        type +
        " 나무 생성 완료"
    );
  }
}
```

{: file='before/client.ts'}

```ts
import { Memory } from "./memory";
import { BeforeTerrain } from "./terrain";

export class BeforeClient {
  public static main(_args?: string[]): void {
    // 지형 생성
    const terrain = new BeforeTerrain();

    // 지형에 Oak 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Oak", // type
        new Object(), // mesh
        new Object(), // texture
        Math.random() * BeforeTerrain.CANVAS_SIZE, // position_x
        Math.random() * BeforeTerrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Acacia 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Acacia", // type
        new Object(), // mesh
        new Object(), // texture
        Math.random() * BeforeTerrain.CANVAS_SIZE, // position_x
        Math.random() * BeforeTerrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Jungle 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Jungle", // type
        new Object(), // mesh
        new Object(), // texture
        Math.random() * BeforeTerrain.CANVAS_SIZE, // position_x
        Math.random() * BeforeTerrain.CANVAS_SIZE // position_y
      );
    }

    Memory.print_memory();
  }
}
```

#### 경량 패턴 적용 후 코드

{: file='after/flyweight_memory.ts'}

```ts
export class Memory {
  public static size: number = 0; // 메모리 사용량

  public static print_memory(): void {
    console.log("총 메모리 사용량 : " + Memory.size + "MB" + "\n");
  }
}
```

{: file='after/flyweight_concrete.ts'}

```ts
import { Memory } from "./flyweight_memory";

/**
 * Concrete Flyweight
 */
export class TreeModel {
  // 메쉬, 텍스쳐 총 사이즈
  objSize = 90; // 90MB
  type: string; // 나무 종류
  mesh: object; // 메쉬
  texture: object; // 나무 껍질 + 잎사귀 텍스쳐

  constructor(type: string, mesh: object, texture: object) {
    this.type = type;
    this.mesh = mesh;
    this.texture = texture;

    // 나무 객체를 생성하였으니 메모리 사용 크기 증가
    Memory.size += this.objSize;
  }
}
```

{: file='after/flyweight_factory.ts'}

```ts
import { TreeModel } from "./flyweight_concrete";

/**
 * Flyweight Factory
 */
export class TreeModelFactory {
  // Flyweight Pool - TreeModel 객체들을 Map으로 등록하여 캐싱
  private static cache = new Map<string, TreeModel>();

  // static factory method
  public static getInstance(key: string): TreeModel {
    // 만약 캐시 되어 있다면,
    if (TreeModelFactory.cache.has(key)) {
      return TreeModelFactory.cache.get(key) as TreeModel; // 그대로 가져와 반환
    } else {
      // 캐시 되어있지 않으면 나무 모델 객체를 새로 생성하고 반환
      const model = new TreeModel(key, new Object(), new Object());

      console.log("=== 나무 모델 객체 새로 생성 완료 ===");

      TreeModelFactory.cache.set(key, model);

      return model;
    }
  }
}
```

{: file='after/flyweight_unshared_concrete.ts'}

```ts
import { TreeModel } from "./flyweight_concrete";
import { Memory } from "./flyweight_memory";

/**
 * Unshared Concrete Flyweight
 */
export class Tree {
  // 좌표 값과 나무 모델 참조 객체 크기를 합친 사이즈
  objSize = 10; // 10MB

  // 위치 변수
  position_x: number;
  position_y: number;

  // 나무 모델
  model: TreeModel;

  constructor(model: TreeModel, position_x: number, position_y: number) {
    this.model = model;
    this.position_x = position_x;
    this.position_y = position_y;

    // 나무 객체를 생성하였으니 메모리 사용 크기 증가
    Memory.size += this.objSize;
  }
}
```

{: file='after/flyweight_terrain.ts'}

```ts
import { TreeModelFactory } from "./flyweight_factory";
import { Tree } from "./flyweight_unshared_concrete";

export class Terrain {
  // 지형 타일 크기
  static CANVAS_SIZE: number = 10000;

  // 나무 렌더링
  public render(type: string, position_x: number, position_y: number): void {
    // 1. 캐시되어 있는 나무 모델 객체 가져오기
    const model = TreeModelFactory.getInstance(type);

    // 2. 재사용한 나무 모델 객체와 변화하는 속성인 좌표 값으로 나무 생성
    const tree = new Tree(model, position_x, position_y);

    console.log(
      "x: " +
        tree.position_x +
        " y: " +
        tree.position_y +
        " 위치에 " +
        type +
        " 나무 생성 완료"
    );
  }
}
```

{: file='after/flyweight_client.ts'}

```ts
import { Memory } from "./flyweight_memory";
import { Terrain } from "./flyweight_terrain";

export class Client {
  public static main(_args?: string[]): void {
    // 지형 생성
    const terrain = new Terrain();

    // 지형에 Oak 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Oak", // type
        Math.random() * Terrain.CANVAS_SIZE, // position_x
        Math.random() * Terrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Acacia 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Acacia", // type
        Math.random() * Terrain.CANVAS_SIZE, // position_x
        Math.random() * Terrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Jungle 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Jungle", // type
        Math.random() * Terrain.CANVAS_SIZE, // position_x
        Math.random() * Terrain.CANVAS_SIZE // position_y
      );
    }

    Memory.print_memory();
  }
}
```

#### 출력 결과

{: file="execute_client"}

```ts
import { Client } from "./after/flyweight_client";
import { BeforeClient } from "./before/client";

BeforeClient.main();
// x: 9065.842342887978 y: 1011.329899917146 위치에 Oak 나무 생성 완료
// x: 8101.131607060823 y: 9409.354744995466 위치에 Oak 나무 생성 완료
// x: 2909.0642351863316 y: 5593.374329290226 위치에 Oak 나무 생성 완료
// x: 5136.914306245595 y: 8590.446610944817 위치에 Oak 나무 생성 완료
// x: 1446.0649837157314 y: 6773.494291516853 위치에 Oak 나무 생성 완료
// x: 3996.7435437060694 y: 9070.085525047807 위치에 Acacia 나무 생성 완료
// x: 2712.602719730484 y: 1137.2995014402077 위치에 Acacia 나무 생성 완료
// x: 6376.661986630401 y: 775.431018204844 위치에 Acacia 나무 생성 완료
// x: 448.1128594488748 y: 6313.660880020049 위치에 Acacia 나무 생성 완료
// x: 822.36553395999 y: 2446.62997492618 위치에 Acacia 나무 생성 완료
// x: 4558.192739569893 y: 9917.41916921661 위치에 Jungle 나무 생성 완료
// x: 7799.029421897061 y: 9330.383081252816 위치에 Jungle 나무 생성 완료
// x: 162.0281320785688 y: 754.9106790861138 위치에 Jungle 나무 생성 완료
// x: 1687.588688498214 y: 481.9343540922283 위치에 Jungle 나무 생성 완료
// x: 7240.916066255259 y: 4798.594031274077 위치에 Jungle 나무 생성 완료
// 총 메모리 사용량 : 1500MB ⭐️

Client.main();
// === 나무 모델 객체 새로 생성 완료 ===
// x: 2633.3314223971115 y: 5099.839844034362 위치에 Oak 나무 생성 완료
// x: 4361.821032621547 y: 2472.6162218406243 위치에 Oak 나무 생성 완료
// x: 4418.517525885705 y: 9951.134219621934 위치에 Oak 나무 생성 완료
// x: 984.1592171048563 y: 8019.1816891050685 위치에 Oak 나무 생성 완료
// x: 6219.430320425791 y: 7212.363383149667 위치에 Oak 나무 생성 완료
// === 나무 모델 객체 새로 생성 완료 ===
// x: 4216.846583418333 y: 2388.2578986138815 위치에 Acacia 나무 생성 완료
// x: 3469.201392140364 y: 2607.66882066956 위치에 Acacia 나무 생성 완료
// x: 2946.273467439644 y: 4104.665968215991 위치에 Acacia 나무 생성 완료
// x: 8553.383315730136 y: 2034.5062388182077 위치에 Acacia 나무 생성 완료
// x: 6347.725747075905 y: 4502.577659759426 위치에 Acacia 나무 생성 완료
// === 나무 모델 객체 새로 생성 완료 ===
// x: 8736.873932320015 y: 2818.899027849138 위치에 Jungle 나무 생성 완료
// x: 4421.734692043186 y: 4172.795209040046 위치에 Jungle 나무 생성 완료
// x: 9228.914937157484 y: 5751.144986911503 위치에 Jungle 나무 생성 완료
// x: 2142.283067509878 y: 1323.7637470256857 위치에 Jungle 나무 생성 완료
// x: 2910.2317882044335 y: 4874.301066940363 위치에 Jungle 나무 생성 완료
// 총 메모리 사용량 : 420MB ⭐️
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
