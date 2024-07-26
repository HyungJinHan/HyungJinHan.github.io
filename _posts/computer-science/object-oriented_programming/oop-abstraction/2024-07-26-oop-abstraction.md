---
title: 객체 지향 프로그래밍의 특징 - 추상화 (Abstraction)
description: 객체 지향 프로그래밍의 특징 중 추상화(Abstraction)의 개념 정리
categories: [Computer Science, OOP]
tags: [oop, abstraction] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
private: false # 커스텀해서 만든 것
image-path: /assets/img/computer-science/object-oriented_programming/oop-abstraction # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/object-oriented_programming/oop-abstraction/oop-abstraction_3.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: 추상화(Abstraction)의 예시 이미지
---

> 객체 지향 프로그래밍에 대한 전체적인 내용은 [#객체 지향 프로그래밍이란?][oop]를 참고

## 추상화(Abstraction)의 개념

추상이라는 용어의 사전적 의미를 보면 <ins>사물이나 표상을 어떤 성질, 공통성, 본질에 착안하여 그것을 추출하여 파악하는 것</ins>이라 정의하고 있다.

여기서 핵심이 되는 개념은 <ins>공통성과 본질을 모아 추출</ins>한다는 것이다.

![abstraction_1][abstraction_1]
_예를 들면, 서울의 지하철 노선도는 서울의 지리를 추상화시켜서 보여주는 대표적인 예라고 할 수 있다._

위의 지하철 노선도에서 볼 수 있듯이, 중요한 부분을 강조하기 위해 불필요한 세부 사항들은 제거하고 가장 본질적이고 공통적인 부분만을 추출하여 표현하는 것과 관련이 있다.

같은 맥락에서, 객체 지향 프로그래밍 프로그래밍에서 의미하는 추상화는 <ins>객체의 공통적인 속성과 기능을 추출하여 정의하는 것</ins>을 의미한다.

## 이동 수단 예제

### 이미지로 보기

![abstraction_2][abstraction_2]

위의 예시를 보면, `자동차`와 `오토바이`는 모두 `이동 수단`이며, 모든 이동 수단은 <ins>전진과 후진을 할 수 있다는 공통점</ins>을 가진다.

이것을 대표적인 객체 지향 언어인 `Java` 문법 요소를 사용하여 표현하면, `자동차`와 `오토바이`라는 하위 클래스(`sub-class`)들의 공통적인 기능(전진과 후진)을 추출하여 `이동 수단`이라는 상위 클래스 (`super class`)에 정의한다.

위의 예제에서는 편의상 공통적인 기능(메서드)만 추출했지만, 공통적인 속성(변수)도 추출하여 선언하는 것이 가능하다.

- 예를 들면 바퀴, 연료와 같은 것들을 추출하여 변수로 선언할 수도 있다.

### 코드로 보기

{: .prompt-info}

> `Java`에서는 추상화를 구현할 수 있는 문법 요소로, 추상 클래스(`abstract`)와 인터페이스(`interface`)가 있는데, 이번 예제에서는 가장 빈번하게 사용되는 인터페이스를 사용할 예정이다.

- `Vehicle` 인터페이스

  {: file="Vehicle.java"}

  ```java
  public interface Vehicle {
    public abstract void start();

    void moveForward(); // public abstract 키워드 생략 가능

    void moveBackward();
  }
  ```

  가장 먼저 `자동차`와 `오토바이`의 <ins>공통적인 기능 추출</ins>하여 `이동 수단` 인터페이스에 정의한다.

  컴퓨터 프로그래밍에서 인터페이스란 "서로 다른 두 시스템, 장치, 소프트웨어 따위를 서로 이어주는 부분 또는 그런 접속 장치"라고 정의할 수 있는데, 객체 지향적 설계에 있어서 인터페이스는 어떤 <ins>객체의 역할만을 정의</ins>하여 객체들 간의 관계를 보다 유연하게 연결하는 역할을 담당한다.

  다시 말하자면, 인터페이스에는 추상 메서드나 상수를 통해서 <ins>어떤 객체가 수행해야 하는 핵심적인 역할만을 규정</ins>해두고, <ins>실제적인 구현은 해당 인터페이스를 구현하는 각각의 객체들에서 하도록</ins> 프로그램을 설계하는 것을 의미한다.

- `Car` 클래스

  {: file="Car.java"}

  ```java
  public class Car implements Vehicle { // 이동 수단을 구체화한 자동차 클래스
    @Override
    public void moveForward() {
      System.out.println("🚗 <- <- <- <- <- <- 🚗");
    }

    @Override
    public void moveBackward() {
      System.out.println("🚗 -> -> -> -> -> -> 🚗");
    }
  }
  ```

- `MotorBike` 클래스

  {: file="MotorBike.java"}

  ```java
  public class MotorBike implements Vehicle  { // 이동 수단을 구체화한 오토바이 클래스
    @Override
    public void moveForward() {
      System.out.println("🏍️ <- <- <- <- <- <- 🏍️");
    }

    @Override
    public void moveBackward() {
      System.out.println("🏍️ -> -> -> -> -> -> 🏍️");
    }
  }
  ```

위에서 확인할 수 있듯이, `Vehicle` 인터페이스를 구현한 구현체, `Car`와 `MotorBike` 클래스에서 앞서 우리가 <ins>인터페이스에 정의한 역할을 각각의 클래스의 맥락에 맞게 구현</ins>하고 있다.

즉, 각각 클래스 모두 전진과 후진의 기능을 공통적으로 가기기만, 차는 차의 시동을 걸어야 하고, 오토바이는 오토바이의 시동을 걸어야 하기 때문에 그 구현은 각 클래스에 따라 달라야 한다.

이것을 객체 지향 프로그래밍에서는 <ins>역할과 구현의 분리</ins>라고 하며, 이 부분이 아래에서 살펴 볼 다형성과 함께 유연하고 변경이 용이한 프로그램을 설계하는 데 가장 핵심적인 부분이라고 할 수 있다.

객체 지향 프로그래밍에서는 <ins>보다 유연하고 변경에 열려있는 프로그램을 설계하기 위해 역할과 구현을 분리</ins>하는데, 여기서 역할에 해당하는 부분이 인터페이스를 통해 추상화될 수 있다.

> 다른 특징들 중 하나인 상속에 대해서는 [#객체 지향 프로그래밍의 특징 - 상속 (Inheritance)][oop-inheritance]에서 이어서 설명

## 참고 사이트

> [코드스테이츠 - 객체 지향 프로그래밍의 4가지 특징ㅣ추상화, 상속, 다형성, 캡슐화][ref_site_1]

<!-- 이미지 -->

[abstraction_1]: {{page.image-path}}/oop-abstraction_1.png
[abstraction_2]: {{page.image-path}}/oop-abstraction_2.png

<!-- 블로그 게시글 -->

[oop]: {{site.url}}/posts/oop
[oop-inheritance]: {{site.url}}/posts/oop-inheritance

<!-- 참고 사이트 -->

[ref_site_1]: https://www.codestates.com/blog/content/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%8A%B9%EC%A7%95
