---
title: 해시 테이블 (Hash Table)
description: 자료 구조 해시 테이블에 대한 정리
categories: [Computer Science, Data Structure]
tags: [computer-science, data-structure, hash-table] # TAG names should always be lowercase
math: true
image:
  path: /assets/img/computer-science/data-structure/hash-table/hash-table.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Hash Table Image
---

## 해시 테이블(Hash Table)의 정의

해시 테이블(Hash Table) 또는 해시 맵(Hash Map)은 <ins>**키를 값에 매핑(`{ Key: Value }`)할 수 있는 구조, 즉 연관 배열(Associative Array)을 구현하는 자료 구조**</ins>이다.

## 해시 함수 (Hash Function)

해시 테이블의 핵심은 해시 함수이다.

해시 함수(Hash Table)란, <ins>**임의 크기 데이터**</ins>를 <ins>**고정 크기 값**</ins>으로 매핑하는 데 사용할 수 있는 단방향 함수이다.

이때, 전자에 해당하는 입력 데이터를 키, 후자에 해당하는 매핑된 값을 해시 또는 해시 값이라고 한다.

정리하면, 해시 함수는 <ins>**키를 해시 값으로 인코딩하는 함수**</ins>라고 할 수 있다.

예를 들어 `[A, B, C]`, `[1, 3, 2, 4, B, C]`, `[A, F, 3, 2, B]`라는 각각 길이가 3, 6, 5인 문자열 키가 있다고 할 때, 각 문자열을 특정 해시 함수를 통과시켜 각각 `A1`, `CB`, `D5`로, 즉, 길이가 2인 문자열 해시 값에 매핑할 수 있다.

이러한 특징들 덕분에 잘 구현된 해시 테이블에서 데이터를 평균적으로 $O(1)$에 조회, 삽입, 삭제할 수 있게 된다.

해시 함수에서 키 값이 조금만 변해도 해시 값이 크게 달라지는데, 이를 암호학에서는 눈사태 효과(Avalanche Effect)라고 일컫는다.

해시 함수는 체크섬(Checksum), 손실 압축, 무작위화 함수(Randomization Function), 암호 등과도 관련이 깊으며, 때로는 서로 혼용되기도 한다.

### 해싱 (Hashing)

![hashing](/assets/img/computer-science/data-structure/hash-table/hashing.png)

위 그림은 해시 함수를 통해 키가 해시 값으로 변환되는 과정을 도식화한 것으로, 이처럼 <ins>**해시 함수를 적용해, 해시 테이블을 인덱싱하는 작업**</ins>을 해싱(Hashing)이라고 한다.

가장 단순하면서도 널리 쓰이는 것은 정수형 해싱 기법인 모듈로 연산을 이용한 나눗셈 방식이다.

$$h(x) = x \ mod \ m$$

$h(x)$는 해시 함수로, 입력 값 $x$에 해시 함수를 적용해 생성된 결과를 뜻하며, $m$은 해시 테이블의 크기이다.

$m$은 일반적으로 충돌 문제를 위해 2의 멱수에 가깝지 않은 소수를 택하는 것이 좋다.

### 좋은 해시 함수의 특징

- 해시 값 충돌의 최소화
- 해시 테이블 전체에 해시 값이 균일하게 분포
- 쉽고 빠른 연산
- 해시 테이블 사용 효율이 높음
- 사용할 키의 모든 정보를 이용하여 해싱

## 해시 충돌 (Hash Collision)

해시 충돌이한, 해시 함수가 서로 다른 두 입력 값에 대해 동일한 출력 값을 내는 상황을 의미한다.

해시 함수가 무한한 입력 데이터로부터 유한한 출력 데이터를 생성하는 경우, 비둘기 집 원리에 의해 해시 충돌 문제는 피할 수 없다.

### 비둘기 집 원리 (Pigeonhole Principle)

![hashing](/assets/img/computer-science/data-structure/hash-table/pigeon.png)

비둘기 집 원리란, $n$개의 아이템을 $m$개의 컨테이너에 넣을 때, $n > m$이라면 적어도 하나의 컨테이너에는 반드시 2개 이상의 아이템이 들어 있다는 원리를 말한다.

### 생일 문제 (Birthday Problem)

해시 함수에서 충돌은 생각보다 쉽게 일어난다.

흔한 예로 생일 문제를 들 수 있다.

생일의 가짓수는 윤년을 제외하면 365개이므로, 여러 사람이 모였을 때 생일이 같은 2명이 존재할 확률은 꽤 낮을 것처럼 보인다.

하지만 실제로는 23명만 모여도 그 확률은 50%를 넘고, 58명이 모이면 99%를 넘어선다.

```ts
function find(p: number): void {
  const percent: number = p / 100;
  const result = Math.ceil(Math.sqrt(2 * 365 * Math.log(1 / (1 - percent))));
  console.log(`${result}명이 모였을 때, ${p}% 확률로 생일이 겹침`);
}

find(10);
// 9명이 모였을 때, 10% 확률로 생일이 겹침

find(50);
// 23명이 모였을 때, 50% 확률로 생일이 겹침

find(90);
// 41명이 모였을 때, 90% 확률로 생일이 겹침

find(99);
// 58명이 모였을 때, 99% 확률로 생일이 겹침
```

> 시간 복잡도 : $O(log \ n)$
>
> 공간 복잡도 : $O(1)$

### 로드 팩터 (Load Factor)

$$load \ factor = {n \over k}$$

로드 팩터란, 해시 테이블에 저장된 데이터 개수 $n$을 버킷의 개수 $k$로 나눈 것이다.

따라서 <ins>**1이면 해시 테이블이 꽉 찬 것이고, 1보다 큰 경우에는 해시 충돌이 발생**</ins>했음을 의미한다.

로드 팩터 비율에 따라서 해시 함수를 재작성해야 할 것인지, 해시 테이블의 크기를 조정해야 할 것인지를 결정할 수 있다.

또한 이 값은 해시 함수가 키들을 잘 분산해주는지를 말하는 효율성 측정에도 사용된다.

가령 `java 10`에서는 `HashMap`의 디폴트 로드 팩터를 `0.75`로 정했으며, <ins>**시간과 공간 비용의 적절한 절충안**</ins>이라고 말한다.

로드 팩터가 `0.75`를 넘어설 경우, 동적 배열처럼 해시 테이블의 공간을 재할당하게 된다.

## 해시 테이블 구현

### 개별 체이닝 (Separate Chaining)

![separate-chaining](/assets/img/computer-science/data-structure/hash-table/separate-chaining.png)

해시 테이블의 기본 방식이기도 한 개별 체이닝은 <ins>**충돌 발생 시, 연결 리스트(`Linked List`)로 연결**</ins>하는 방식이다.

위 그림에서 해시(`index`) `2`에서 `aa`와 충돌한 `cc`는 `aa`의 다음 아이템으로 연결된다.

전통적으로 흔히 해시 테이블이라고 하면 이 방식을 떠올리게 된다.

개별 체이닝의 간단한 원리를 요약하면 다음과 같다.

1. 키의 해시 값 계산
2. 해시 값을 이용해 배열의 인덱스 계산
3. 충돌 시 연결 리스트로 연결

#### 코드 구현

```ts
class HashTableNode {
  public item: number;
  public link: any | null;

  constructor(item: number, link: any | null = null) {
    this.item = item;
    this.link = link;
  }
}

class HashTable {
  private size: number;
  private table: any[];

  constructor() {
    this.size = 3;
    this.table = new Array(this.size).fill(null);
  }

  public printTable(): void {
    this.table.forEach((root, i) => {
      const items: number[] = [];
      let current = root;

      while (current) {
        items.push(current.item);
        current = current.link;
      }

      console.log(`${i} : ${items.join(" → ")}`);
    });
  }

  public add(item: number): void {
    const index = item % this.size;

    if (this.table[index] === null) {
      this.table[index] = new HashTableNode(item);
      return;
    }

    let prev = this.table[index];

    while (prev && prev.link !== null) {
      prev = prev.link;
    }

    if (prev) {
      prev.link = new HashTableNode(item);
    }
  }

  public remove(item: number): void {
    const index = item % this.size;

    if (this.table[index] === null) {
      return;
    }

    let prev = this.table[index];

    if (prev.item === item) {
      this.table[index] = prev.link;
      return;
    }

    while (prev.link !== null) {
      if (prev.link.item === item) {
        prev.link = prev.link.link;
        break;
      }

      prev = prev.link;
    }
  }
}

const ht = new HashTable();

for (let i = 0; i <= 20; i++) {
  ht.add(i);
}

ht.printTable();
```

{: file='output'}

```bash
0 : 0 → 3 → 6 → 9 → 12 → 15 → 18
1 : 1 → 4 → 7 → 10 → 13 → 16 → 19
2 : 2 → 5 → 8 → 11 → 14 → 17 → 20
```

### 오픈 어드레싱 (Open Addressing)

![open-addressing](/assets/img/computer-science/data-structure/hash-table/open-addressing.png)

오픈 어드레싱은 <ins>**충돌 발생 시, 탐사(`Probing`)를 통해 다른 빈 공간으 찾아나서는 방식**</ins>이다.

따라서, 모든 원소가 반드시 자신의 해시 값에 대응하는 주소에 저장된다는 보장이 없다.

위 그림에서 `aa`와 충돌한 `cc`는 빈 공간을 탐사해서 해시(`index`) `3`에 저장된다.

{: .prompt-warning }

> 사실상 데이터를 무한정 저장할 수 있는 체이닝 방식과는 달리, 오픈 어드레싱은 전체 슬롯의 개수 이상 저장할 수 없다.
>
> 따라서 일정 로드 팩터 비율을 넘어서게 되면, 그로스 팩터(Growth Factor)에 따라 더 큰 크기의 버킷을 생성한 후, 여기에 새롭게 복사하는 리해싱(Rehashing)이 일어난다.

#### 선형 탐사 (Linear Probing)

여러가지 오픈 어드레싱 방식 중 가장 간단한 방식인 선형 탐사 방식은 충돌이 발생할 경우, 해당 위치부터 순차적으로 다음 위치를 확인하다가 빈 공간을 발견하면 그 자리에 데이터를 삽입한다.

선형 탐사 방식은 구현이 간단하면서도 전체적인 성능이 좋은 편이다.

그러나, 선형 탐사 활용 시, 해시 테이블에 저장되는 데이터들이 고르게 분표되지 않고 뭉치는 경향이 있다.

<ins>**해시 테이블 여기저기에 연속된 데이터 그룹이 생기는 이러한 현상을 클러스터링(`Clustering`)**</ins>이라고 하는데, 클러스터들이 점점 커지면 주변 클러스터들과 서로 합쳐지기도 한다.

그렇게 되면, 해시 테이블 특정 위치에 데이터가 몰리게 되고, 이는 탐사 시간을 오래 걸리게 하여 해싱 효율을 떨어뜨린다.

#### 코드 구현

```ts
class OpenAddressingHashTable {
  private size: number;
  private table: Array<number | null>;

  constructor() {
    this.size = 4;
    this.table = new Array<number | null>(this.size).fill(null);
  }

  private _probe(item: number, step: number): number {
    let index = item % this.size;
    while (index < this.size) {
      if (this.table[index] === null) {
        return index;
      }
      index += step;
    }
    return -1;
  }

  public printTable(): void {
    this.table.forEach((item, i) => {
      console.log(`${i} : ${item}`);
    });
  }

  public add(item: number): void {
    let index = this._probe(item, 1);
    if (index === -1) {
      index = this._probe(item, -1);
    }
    if (index === -1) {
      return;
    }
    this.table[index] = item;
  }

  public remove(item: number): void {
    const start = item % this.size;
    for (let i = start; i < this.size; i++) {
      if (this.table[i] === item) {
        this.table[i] = null;
      }
    }
    for (let i = 0; i < start; i++) {
      if (this.table[i] === item) {
        this.table[i] = null;
      }
    }
  }
}

const oaht = new OpenAddressingHashTable();

oaht.add(1);
oaht.add(4);
oaht.add(2);
oaht.add(3);
oaht.printTable();
```

{: file='output'}

```bash
0 : 4
1 : 1
2 : 2
3 : 3
```

### 각 언어별 해시 테이블 구현 방식

![load-factor](/assets/img/computer-science/data-structure/hash-table/load-factor.png)

위 그래프에서 볼 수 있듯, 선형 탐사 방식은 해시 테이블이 80% 이상 차게 되면, 즉 로드 팩터가 0.8 이상이 되면 급격한 성능 저하를 발생시킨다.

앞서 언급했듯이 개별 체이닝과는 달리, 로드 팩터 1 이상은 저장할 수 없기도 하다.

해시 테이블의 공간이 찰수록 탐사에 점점 더 오랜 시간이 걸리며, 가득 차게 될 경우, 빈 공간을 찾을 수 없기 때문이다.

따라서 Python이나 Ruby와 같은 모던 언어들은 오픈 어드레싱 방식으로 성능을 높이는 대신, 리해싱의 기준 로드 팩터를 작게 잡아 성능 저하 문제를 해결한다.

각 언어별 해시 테이블의 구현 방식을 정리하면 다음과 같다.

| 언어                | 방식          |
| ------------------- | ------------- |
| C++ (GCC libstdc++) | 개별 체이닝   |
| Java                | 개별 체이닝   |
| Go                  | 개별 체이닝   |
| Ruby                | 오픈 어드레싱 |
| Python              | 오픈 어드레싱 |

### 타입스크립트로 구현한 해시 테이블

```ts
// 1. Hash Table 생성
class HashTable {
  // 1) 해시 테이블 사이즈에 바로 접근할 수 있도록 변수 생성
  // 2) setItem 할 때마다 numItems++되어 table에 들어있는 개수를 그때마다 반영
  // 3) 이 값을 활용하여 table의 길이 대비 현재 들어있는 값의 개수를 연산
  // 4) 특정 수준 이상으로 값이 할당이 되면 table의 길이를 늘림
  table = new Array(3);
  numItems = 0;

  setItem = (key: string, value: string | number) => {
    this.numItems++;

    // table의 원소 개수가 80% 이상 차있는 경우 resize()
    const loadFactor = this.numItems / this.table.length;

    if (loadFactor >= 0.8) this.resize();

    const idx = hashStringToInt(key, this.table.length);

    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  // 만약 배열의 크기를 3에서 6으로 두 배를 했다면, 그보다 큰 소수인 7을 새로운 table의 크기로 설정
  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item: any[]) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  getItem = (key: string) => {
    const idx = hashStringToInt(key, this.table.length);
    // 값이 없는 경우 null
    if (!this.table[idx]) return null;

    // 단순히 전체 table의 index로 접근 = O(1) but array.find를 사용하면 O(n)으로 증가함
    return this.table[idx].find((el: any[]) => el[0] === key)[1];
  };
}

// 2. 해시 함수(Hash Function)가 필요한 이유
function hashStringToInt(s: string, tableSize: number) {
  let hash = 17;

  // return 3; -> 항상 table[3] index 중복 해시 충돌 발생
  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }

  return hash;
}

// 생성자 함수 생성 new HashTable();
const myTable = new HashTable();

myTable.setItem("firstName", "형진");
console.log(myTable.table.length); // 3
console.log(myTable.getItem("firstName")); // 형진

myTable.setItem("lastName", "한");
console.log(myTable.table.length); // 3
console.log(myTable.getItem("lastName")); // 한

myTable.setItem("age", 29);
console.log(myTable.table.length); // 6
console.log(myTable.getItem("age")); // 29

myTable.setItem("birth", "1996-12-10");
console.log(myTable.table.length); // 6
console.log(myTable.getItem("birth")); // 1996-12-10
```

{: file='output'}

```bash
3
형진
3
한
6
29
6
1996-12-10
```

## 참고 사이트

> [hysong.log - [자료 구조] 해시 테이블(Hash Table)](https://velog.io/@hysong/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%ED%95%B4%EC%8B%9C-%ED%85%8C%EC%9D%B4%EB%B8%94Hash-Table)
>
> [나쁘지 않음 - 해시 테이블(Hash table)](https://velog.io/@dltjq2323/%ED%95%B4%EC%8B%9C-%ED%85%8C%EC%9D%B4%EB%B8%94Hash-table)
>
> [AlgoRoot - [알고리즘, 자료 구조] 자바스크립트로 해시테이블(Hash Table) 구현하기 (+개념이해)](https://algoroot.tistory.com/56)
>
> [Tawhid Shahrior's Medium - Hash Tables, Hashing and Collision Handling](https://medium.com/codex/hash-tables-hashing-and-collision-handling-8e4629506572)
