---
title: 객체 지향 프로그래밍의 특징 - 상속 (Inheritance)
description: 객체 지향 프로그래밍의 특징 중 상속(Inheritance)의 개념 정리
categories: [Computer Science, OOP]
tags: [oop, inheritance] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
done: true # 커스텀해서 만든 것
image-path: /assets/img/computer-science/object-oriented_programming/oop-inheritance # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/object-oriented_programming/oop-inheritance/oop-inheritance_1.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: 상속(Inheritance)의 예시 이미지
---

> 객체 지향 프로그래밍에 대한 전체적인 내용은 [#객체 지향 프로그래밍이란?][oop]를 참고
>
> 이전에 설명한 특징인 추상화에 대해서는 [#객체 지향 프로그래밍의 특징 - 추상화 (Abstraction)][oop-abstraction] 참고

## 상속(Inheritance)의 개념

![inheritance_2][inheritance_2]
_상속이란 <ins>기존의 클래스를 재활용하여 새로운 클래스를 작성하는 문법 요소</ins>를 의미한다._

상속은 클래스 간의 공유될 수 있는 속성과 기능들을 상위 클래스로 추상화 시켜 해당 상위 클래스로부터 확장된 여러 개의 하위 클래스들이 모두 상위 클래스의 속성과 기능들을 간편하게 사용할 수 있도록 한다.

즉, 클래스들 간의 공유하는 속성과 기능들을 반복적으로 정의할 필요 없이 딱 한 번만 정의해두고 간편하게 <ins>재사용</ins>할 수 있어 <ins>반복적인 코드를 최소화하고 공유하는 속성과 기능에 간편하게 접근</ins>하여 사용할 수 있도록 한다.

앞서 설명한 추상화에서 다룬 이동 수단 예제를 약간 변형하여 상속을 이해할 예정이다.

## 이동 수단 예제

### Before

#### 이미지로 보기

![inheritance_3][inheritance_3]

위의 이미지를 보면 `자동차`와 `오토바이`가 있고, 각각의 기능과 속성들이 명시되어 있다.

이 중에서 빨간색으로 표시된 속성과 기능들은 `자동차`와 `오토바이`의 공통적인 부분들이며, 녹색으로 표시된 부분들은 그렇지 않다.

#### 코드로 보기

- `Car` 클래스

  {: file="CarBefore.java"}

  ```java
  public class CarBefore {
    String model;
    String color;
    int wheels;

    // Car 클래스 고유의 속성
    boolean isConvertible;

    void moveForward() {
      System.out.println("앞으로 전진한다.");
    }

    void moveBackward() {
      System.out.println("뒤로 후진한다.");
    }

    // Car 클래스 고유의 기능
    void openWindow() {
      System.out.println("모든 창문을 연다.");
    }
  }
  ```

- `MotorBikeBefore` 클래스

  {: file="MotorBikeBefore.java"}

  ```java
  public class MotorBikeBefore {
    String model;
    String color;
    int wheels;

    // MotorBike 클래스 고유의 속성
    boolean isRaceable;

    void moveForward() {
      System.out.println("앞으로 전진한다.");
    }

    void moveBackward() {
      System.out.println("뒤로 후진한다.");
    }

    // MotorBike 클래스 고유의 기능
    void stuntAction() {
      System.out.println("스턴트 묘기를 보인다.");
    }
  }
  ```

위의 코드와 같이 같은 코드가 반복적으로 정의되고 있다.

좀 더 구체적으로 보자면, 각각의 클래스마다 속성(`model`, `color`, `wheels`)과 기능(`moveForward()`, `moveBackward()`)가 완전히 동일한 코드임에도 불구하고 계속 반복되고 있다는 점을 확인할 수 있다.

또한, 하나의 코드에서 변경 사항이 일어난다면 해당 코드의 변경 사항을 다른 클래스에서도 일일이 수정해줘야 한다는 번거로움이 있다.

그렇다면, 앞서 설명한 추상화와 상속을 활용하여 코드를 재정의해본다면,

### After

#### 이미지로 보기

![inheritance_4][inheritance_4]

위의 이미지와 같이 공통된 부분을 추상화와 상속을 통해 반복적으로 코드를 작성할 필요가 없다.

#### 코드로 보기

- `Vehicle` 클래스

  {: file="VehicleAfter.java"}

  ```java
  // 추상화를 통한 상위 클래스 정의
  public class VehicleAfter {
    String model;
    String color;
    int wheels;

    void moveForward() {
      System.out.println("앞으로 전진한다.");
    }

    void moveBackward() {
      System.out.println("뒤로 후진한다.");
    }
  }
  ```

- `Car` 클래스

  {: file="CarAfter.java"}

  ```java
  public class CarAfter extends VehicleAfter {
    boolean isConvertible;

    void openWindow() {
      System.out.println("모든 창문을 연다.");
    }
  }
  ```

- `MotorBike` 클래스

  {: file="MotorBikeAfter.java"}

  ```java
  public class MotorBikeAfter extends VehicleAfter {
    boolean isRaceable;

    // 메서드 오버라이딩 -> 기능 재정의
    @Override
    void moveForward() {
      System.out.println("앞 바퀴를 들고 전진한다.");
    }

    public void stuntAction() {
      System.out.println("스턴트 묘기를 보인다.");
    }
  }
  ```

- `Main` 실행 클래스

  {: file="Main.java"}

  ```java
  public class Main {
    public static void main(String[] args) {
      // 객체 생성
      CarAfter car = new CarAfter();
      MotorBikeAfter motorBike = new MotorBikeAfter();

      // car 객체의 속성 정의
      car.model = "테슬라";
      car.color = "흰색";

      System.out.println("자동차 색상 : " + car.color + " / 자동차 모델 : " + car.model);
      // 자동차 색상 : 흰색 / 자동차 모델 : 테슬라

      // 객체들의 기능 실행
      car.moveForward(); // 앞으로 전진한다.
      motorBike.moveForward(); // 앞 바퀴를 들고 전진한다.
      motorBike.moveBackward(); // 뒤로 후진한다.
    }
  }
  ```

  위의 코드 예제를 보면, `Car`와 `MotorBike` 클래스의 공통적인 속성과 기능들을 추출(추상화)하여 `Vehicle` 클래스(상위 클래스)에 정의했고, `extends` 키워드를 통해 각각의 하위 클래스로 확장하여 해당 기능과 속성들을 매번 반복적으로 정의해야 하는 번거로움을 제거했다.

  또한, 공통적인 코드의 변경이 있는 경우, 상위 클래스에서 단 한 번의 수정으로 모든 클래스에 변경 사항이 반영될 수 있도록 만들었다.

  `MotorBike` 클래스에서는 상위 클래스의 기능과 속성들을 그대로 사용하지 않고 각각의 클래스의 맥락에 맞게 <ins>메서드 오버라이딩(`Method Overriding`)을 사용하여 내용을 재정의</ins>할 수도 있다.

  이 부분은 앞서 추상화에서 봤던 인터페이스를 통한 구현과 상속을 구분하는 핵심적인 차이 중에 하나라고 할 수 있다.

  즉, 양자 모두 상위 클래스-하위 클래스의 관계를 전제하면서 공통적인 속성과 기능을 공유할 수 있지만, 상속의 경우, <ins>상위 클래스의 속성과 기능들을 하위 클래스에서 그대로 받아 사용하거나 오버라이딩을 통해 선택적으로 재정의하여 사용</ins>할 수 있는 반면, 인터페이스를 통한 구현은 반드시 <ins>인터페이스에 정의된 추상 메서드의 내용이 하위 클래스에서 정의</ins>되어야 한다.

  결론적으로, 상속 관계의 경우 인터페이스를 사용하는 구현에 비해 추상화의 정도가 낮다고 할 수 있다.

  인터페이스가 역할에 해당하는 껍데기만 정의해두고, <ins>하위 클래스에서 구체적인 구현을 하도록 강제</ins>하는 것에 비해, 상속 관계의 경우 상황에 따라 모든 구체적인 내용들을 정의해두고 하위 클래스에서는 그것을 단순히 가져다가 재사용할 수 있다.

## 참고 사이트

> [코드스테이츠 - 객체 지향 프로그래밍의 4가지 특징ㅣ추상화, 상속, 다형성, 캡슐화][ref_site_1]
>
> [j_jhwww.log - OOP (Object Oriented Programming)][ref_site_2]

---

> 다른 특징들 중 하나인 상속에 대해서는 [#객체 지향 프로그래밍의 특징 - 다형성 (Polymorphism)][oop-polymorphism]에서 이어서 설명

<!-- 이미지 -->

[inheritance_1]: {{page.image-path}}/oop-inheritance_1.png
[inheritance_2]: {{page.image-path}}/oop-inheritance_2.png
[inheritance_3]: {{page.image-path}}/oop-inheritance_3.png
[inheritance_4]: {{page.image-path}}/oop-inheritance_4.png

<!-- 블로그 게시글 -->

[oop]: {{site.url}}/posts/oop
[oop-abstraction]: {{site.url}}/posts/oop-abstraction
[oop-polymorphism]: {{site.url}}/posts/oop-polymorphism

<!-- 참고 사이트 -->

[ref_site_1]: https://www.codestates.com/blog/content/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%8A%B9%EC%A7%95
[ref_site_2]: https://velog.io/@j_jhwww/TIL-OOP-Object-Oriented-Programming
