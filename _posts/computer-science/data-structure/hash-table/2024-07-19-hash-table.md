---
title: 해시 테이블 (Hash Table)
description: 자료구조 해시 테이블에 대한 정리
categories: [Computer Science, Data Structure]
tags: [computer-science, data-structure, hash-table] # TAG names should always be lowercase
math: true
private: true # 게시 X
image:
  path: /assets/img/computer-science/data-structure/hash-table/hash-table.png
  alt: Hash Table Image
---

## 해시 테이블(Hash Table)의 정의

해시 테이블(Hash Table) 또는 해시 맵(Hash Map)은 <ins>**키를 값에 매핑(`{ Key: Value }`)할 수 있는 구조, 즉 연관 배열(Associative Array)을 구현하는 자료구조**</ins>이다.

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

⚠️ 여기서부터는 작성 예정

## 참고 사이트

> [hysong.log - [자료구조] 해시 테이블(Hash Table)](https://velog.io/@hysong/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%ED%95%B4%EC%8B%9C-%ED%85%8C%EC%9D%B4%EB%B8%94Hash-Table)
>
> [Tawhid Shahrior's Medium - Hash Tables, Hashing and Collision Handling](https://medium.com/codex/hash-tables-hashing-and-collision-handling-8e4629506572)
