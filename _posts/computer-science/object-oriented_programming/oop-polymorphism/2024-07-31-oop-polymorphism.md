---
title: 객체 지향 프로그래밍의 특징 - 다형성 (Polymorphism)
description: 객체 지향 프로그래밍의 특징 중 다형성(Polymorphism)의 개념 정리
categories: [Computer Science, OOP]
tags: [oop, polymorphism] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
done: true # 커스텀해서 만든 것
image-path: /assets/img/computer-science/object-oriented_programming/oop-polymorphism # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/object-oriented_programming/oop-polymorphism/oop-polymorphism_2.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: 다형성(Polymorphism)의 예시 이미지
---

> 객체 지향 프로그래밍에 대한 전체적인 내용은 [#객체 지향 프로그래밍이란?][oop]를 참고
>
> 이전에 설명한 특징인 상속에 대해서는 [#객체 지향 프로그래밍의 특징 - 상속 (Inheritance)][oop-inheritance] 참고
>
> 추가적으로, 추상화에 대해서는 [#객체 지향 프로그래밍의 특징 - 추상화 (Abstraction)][oop-abstraction] 참고

## 다형성(Polymorphism)의 개념

![image_1][image_1]
_다형성은 객체 지향 프로그래밍의 꽃이라고 할 수 있으며, 상황과 환경에 따라서 달라지는 성질을 의미한다._

다형성(多形性)이란, 한자 그대로 <ins>어떤 객체의 속성이나 기능이 상황에 따라 여러 형태를 가질 수 있는 성질</ins>을 의미한다.

위의 이미지처럼 상황에 따라 남자의 역할이 자식에게는 부모, 회사에서는 팀장, 동호회에서는 리더 등 상황과 환경에 따라 달라지는 것과 비슷하다고 할 수 있다.

즉, <ins>어떤 객체의 속성이나 기능이 그 맥락에 따라 다른 역할을 수행할 수 있는 객체 지향의 특성</ins>을 의미한다.

대표적인 예로 메서드 오버라이딩(`overriding`)과 메서드 오버로딩(`overloading`)이 있다.

{: file="Vehicle.java"}

```java
public interface Vehicle {

  public abstract void start();

  void moveForward(); // public abstract 키워드 생략 가능

  void moveBackward();
}
```

{: file="Car.java"}

```java
public class Car implements Vehicle { // 이동 수단을 구체화한 자동차 클래스
  @Override
  public void start() {
    System.out.println("🚗");
  }

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

위의 코드와 같이 앞서 설명한 추상화에서 본 것처럼 메서드 오버라이딩을 사용하면 같은 이름의 `moveForward()`와 `moveBackward()`를 각각의 클래스의 맥락에 맞게 재정의하여 사용할 수 있다.

즉, <ins>같은 이름의 메서드가 상황에 따라 다른 역할을 수행하는 것</ins>이다.

또한, 하나의 클래스 내에서 같은 이름의 메서드를 여러 개 중복하여 정의하는 것을 의미하는 메서드 오버로딩도 이와 같은 맥락이라고 할 수 있다.

앞서 언급한 메서드 오버라이딩과 메서드 오버로딩도 다형성의 중요한 예시 중에 하나지만, 객체 지향의 맥락에서는 이것보다 더 중요한 다형서으이 정의는 아래와 같다.

{: .prompt-tip}

> 객체 지향 프로그래밍에서 다형성이란, 한 타입의 참조 변수를 통해 여러 타입의 객체를 참조할 수 있도록 만듣 것을 의미한다.
>
> 좀 더 구체적으로, 상위 클래스의 타입의 참조 변수로 하위 클래스의 객체를 참조할 수 있도록 하는 것이다.

위의 정의만 봐서는 이해하기 어려운 부분이 있기 때문에 아래와 같은 예시를 들면,

> 사람이 음식을 먹는다.

위의 문장에서 `음식`은 상황에 따라서 피자 또는 치킨, 햄버거 등 다양한 형태의 음식이 될 수 있다.

또한 `사람` 또한 홍길동 또는 임꺽정 등이 될 수 있다.

즉, `음식`과 `사람`은 그 상황과 맥락에 따라서 모습을 바꿀 수 있는데, 앞서 설명한 다형성의 맥락 또한 마찬가지이다.

## 이동 수단 예제

지금까지 쭉 사용해왔던 `이동 수단`을 다시 예시로 들어보면, `이동 수단`은 `자동차`가 될 수도 있으며, `오토바이`가 될 수도 있다.

다르게 표현하면, `자동차는 자동차이다.`와 `자동차는 이동 수단이다.`라는 두 명제는 모두 참이다.

`오토바이`의 경우도 마찬가지이며, `이동 수단`이라는 범위 안에 `자동차`와 `오토바이`를 하나로 묶을 수 있게 된다.

즉, `이동 수단`은 작은 개념들을 품을 수 있는 포괄적인 개념이라는 의미이다.

{: .prompt-info}

> 정리하자면,
>
> 객체 지향 프로그래밍에서 다형성이란, 앞서 설명한 `이동 수단`과 같은 넓은 범위의 타입,
> 즉 상위 클래스 타입의 참조 변수로 그것과 관계있는 하위 클래스들을 참조할 수 있는 능력이다.

### 결합도가 높은 경우

#### 코드로 보기

> 이전에 [#객체 지향 프로그래밍의 특징 - 상속 (Inheritance)][oop-inheritance] 파트에서 사용한 예제를 통해 진행

{: file="Main.java"}

```java
public class Main {
  public static void main(String[] args) {
    // 원래 사용했던 객체 생성
    Car car_1 = new Car();
    MotorBike motorBike = new MotorBike();

    // 다형성을 활용한 객체 생성 방식
    Vehicle car_2 = new Car();

    // --- 이하 생략 ---
  }
}
```

위의 코드에서 볼 수 있듯, <ins>상위 클래스 타입의 참조 변수로 하위 클래스 객체를 참조하는 것</ins>의 의미를 조금 더 구체적으로 이해할 수 있다.

원래 사용했던 객체 생성 방식은 하위 클래스의 객체를 생성하여 하위 클래스 타입의 참조 변수에 할당했지만, 다형성을 활용한 객체 생성 방식에서는 하위 클래스의 객체를 생성하여 상위 클래스 타입의 참조 변수 `car_2`에 할당해주고 있다.

{: file="Main.java"}

```java
public class Main {
  public static void main(String[] args) {
    // 상위 클래스 타입의 객체 배열 생성
    Vehicle vehicles[] = new Vehicle[2];
    vehicles[0] = new Car();
    vehicles[1] = new MotorBike();

    for (Vehicle vehicle : vehicles) {
      System.out.println(vehicle.getClass()); // 각각의 클래스를 호출해주는 메서드
      // class Car
      // class MotorBike
    }
  }
}
```

다형성을 활용한 방식이 유용한 이유는, 위와 같이 다형성을 활용하면 <ins>여러 종류의 객체를 배열로 다루는 일</ins>이 가능해지기 때문이다.

앞서 작성했던 것 처럼, 상위 클래스 `Vehicle` 타입의 객체 배열을 생성해주면, 이제 해당 타입의 참조 변수는 `Vehicle` 클래스와 상속 관계에 있는 모든 하위 클래스들을 그 안에 담아줄 수 있다.

원래 자바에서 배열의 개념이 하나의 같은 타입으로 이루어져 있는 자료 구조라는 사실을 알고 있다면, 이렇게 다형성을 활용하여 <ins>하나의 타입만으로 여러 가지 타입의 객체를 참조</ins>할 수 있어 보다 유연하게 코드를 작성하는 것이 가능해진다.

추가적으로 `Driver` 클래스를 새롭게 정의해본다면,

{: file="Driver.java"}

```java
public class Driver {
  void drive(Car car) {
    car.moveForward();
    car.moveBackward();
    car.openWindow();
  }

  void drive(MotorBike motorBike) {
    motorBike.moveForward();
    motorBike.moveBackward();
    motorBike.stuntAction();
  }
}
```

위와 같이 정의한 `Driver` 클래스를 사용한 `Main` 클래스의 경우, 아래와 같다.

{: file="Main.java"}

```java
public class Main {
  public static void main(String[] args) {
    Car car = new Car();
    MotorBike motorBike = new MotorBike();
    Driver driver = new Driver();

    driver.drive(car);
    // 앞으로 전진한다.
    // 뒤로 후진한다.
    // 모든 창문을 연다.

    driver.drive(motorBike);
    // 앞 바퀴를 들고 전진한다.
    // 뒤로 후진한다.
    // 스턴트 묘기를 보인다.
  }
}
```

위의 예제와 같이 `Driver` 클래스의 코드는 매우 간단하다.

즉, 매개 변수로 `자동차`나 `오토바이` 객체를 전달받아 운전하는 것이다.

이렇게 하나의 객체가 다른 객체의 속성과 기능에 접근하여 어떤 기능을 사용할 때, 우리는 <ins>"A 클래스는 B 클래스에 의존한다"</ins>라고 표현한다.

#### 이미지로 보기

![image_3][image_3]

위의 이미지와 같이 표현할 수 있다.

`Driver` 클래스가 `Car` 클래스와 `MotorBike` 클래스에 의존하고 있다고 설명할 수 있다.

즉, `Driver` 클래스와 다른 두 개의 클래스가 서로 직접적인 관계를 가지고 있는데, 이러한 상황을 <ins>"객체들 간의 결합도가 높다"</ins>라고 표현한다.

#### 결합도가 높아서 생기는 문제점

객체들 간의 <ins>결합도가 높다은 상태라면 객체 지향적인 설계를 하는 데 매우 불리</ins>하다.

만약에, 지금처럼 `이동 수단`이 두 가지가 아닌, 수 십 또는 수 백개라면 아래의 코드와 같이 똑같은 코드를 반복적으로 작성해야 할 것이다.

{: file="Driver.java"}

```java
public class Driver {
  void drive(Car car) {
    car.moveForward();
    car.moveBackward();
    car.openWindow();
  }

  void drive(MotorBike motorBike) {
    motorBike.moveForward();
    motorBike.moveBackward();
    motorBike.stuntAction();
  }

  void drive(Bus bus) {
    bus.moveForward();
    bus.moveBackward();
  }

  void drive(Train train) {
    train.moveForward();
    train.moveBackward();
  }

  // 기타 엄청나게 반복적인 코드들 ...
}
```

위와 같은 반복적인 문제 뿐만이 아니라, 새로운 상황이 발생해서 `MotorBike`에서 `MotorCycle`로 클래스가 변경되야 하는 경우라면,

{: file="Driver.java"}

```java
public class Driver {
  void drive(Car car) {
    car.moveForward();
    car.moveBackward();
    car.openWindow();
  }

  void drive(MotorCycle motorCycle) {
    motorCycle.moveForward();
    motorCycle.moveBackward();
    motorCycle.stuntAction();
  }
}
```

`Driver` 안에 매개 변수로 전달되는 참조 변수의 타입과 참조 변수를 수정할 수 밖에 없는 상황이 발생한다.

또한 코드가 많아질수록 이 작업은 굉장히 힘들어질 수 밖에 없다.

> 마치 운전자가 운전을 배웠는데, 이동 수단이 바뀔 때마다 새롭게 운전을 배워야 하는 상황과 같다고 할 수 있다.
>
> ex) 테슬라(4륜 승용차) → 테슬라 운전법 / 소나타(4륜 승용차) → 소나타 운전법

### 결합도가 느슨한 경우

위와 같이 결합도가 높아서 생기는 문제점을 객체 지향 프로그래밍의 특성인 추상화, 상속, 그리고 다형성을 활용하여 프로그래밍을 설계할 때 <ins>역할과 구현을 구분</ins>하여 <ins>객체들 간의 직접적인 결합을 피하고, 느슨한 관계 설정</ins>을 통해 보다 <ins>유연하고 변경이 용이한 프로그램 설계</ins>를 가능하게 만들 수 있다.

이 부분이 객체 지향 프로그래밍의 하이라이트이자 핵심이라고 할 수 있다.

#### 코드로 보기

{: file="Vehicle.java"}

```java
// 이동 수단의 역할 정의
public interface Vehicle {
  void moveForward();
  void moveBackward();
}
```

위의 코드와 같이 우선 추상화에서 봤었던 것처럼 `Vehicle` 인터페이스를 통해 이동 수단의 역할을 추상화하고,

{: file="Car.java"}

```java
// 이동 수단 인터페이스를 구현
public class Car implements Vehicle {
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

{: file="MotorBike.java"}

```java
// 이동 수단 인터페이스를 구현
public class MotorBike implements Vehicle {
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

각각 `Car` 클래스와 `MotorBike` 클래스에서 기능들을 구현한다.

여기까지는 앞서 추상화 파트와 동일하다.

{: file="Driver.java"}

```java
public class Driver {
  // 매개 변수로 인터페이스 타입의 참조 변수를 전달
  void drive(Vehicle vehicle) {
    vehicle.moveForward();
    vehicle.moveBackward();
  }
}
```

{: file="Main.java"}

```java
public class Main {
  public static void main(String[] args) {
    Car car = new Car();
    MotorBike motorBike = new MotorBike();
    Driver driver = new Driver();

    driver.drive(car);
    // 🚗 <- <- <- <- <- <- 🚗
    // 🚗 -> -> -> -> -> -> 🚗

    driver.drive(motorBike);
    // 🏍️ <- <- <- <- <- <- 🏍️
    // 🏍️ -> -> -> -> -> -> 🏍️
  }
}
```

여기서 핵심이 되는 부분은 위의 코드인 `Driver` 클래스이다.

<div style="width: 100%; display: flex; justify-content: space-between;">
<div style="width: 48%;">

{: file="DriverBefore.java"}

```java
// Vehicle 인터페이스 적용 전
public class Driver {
  void drive(Car car) {
    car.moveForward();
    car.moveBackward();
    car.openWindow();
  }

  void drive(MotorBike motorBike) {
    motorBike.moveForward();
    motorBike.moveBackward();
    motorBike.stuntAction();
  }

  void drive(Bus bus) {
    bus.moveForward();
    bus.moveBackward();
  }

  void drive(Train train) {
    train.moveForward();
    train.moveBackward();
  }

  // 기타 엄청나게 반복적인 코드들 ...
}
```

</div>

<div style="width: 48%;">

{: file="DriverAfter.java"}

```java
// Vehicle 인터페이스 적용 후
public class Driver {
  // 매개 변수로 인터페이스 타입의 참조 변수를 전달
  void drive(Vehicle vehicle) {
    vehicle.moveForward();
    vehicle.moveBackward();
  }
}
```

</div>
</div>

위와 같이 한눈에 봐도 코드의 중복이 사라지고, 코드가 훨씬 간결해진 것을 확인할 수 있다.

핵심은 `drive()` 메서드로 전달되는 매개 변수의 타입을 상위 클래스인 인터페이스 타입 `Vehicle`로 변경한 것이다.

이제 다형성을 활용하여 작성된 `drive()` 메서드의 매개 변수로 인터페이스를 구현한 객체라면 무엇이든 전달이 될 수 있게 되었다.

마찬가지고 메서드의 수가 많아지고 코드 라인이 길어진다면 그 효과는 더욱 강력할 것이다.

#### 이미지로 보기

![image_4][image_4]

앞서 확인한 결합도가 높은 경우는 `Driver` 클래스가 `Car`와 `MotorBike` 클래스 각각과 직접적으로 연결되어 강한 결합도를 보였지만, 이제는 `Vehicle` 인터페이스를 통해 간접적으로 연결되어 결합도가 낮아졌다.

따라서 `Driver` 클래스는 더 이상 각각의 클래스 내부의 변경이나 다른 객체가 새롭게 교체되는 것을 신경쓰지 않아도 <ins>인터페이스에만 의존하여 수정이 있을 때마다 코드 변경을 하지 않아도 된다.</ins>

![image_5][image_5]
_운전자가 운전하는 법을 매번 새롭게 배우지 않아도 변경된 이동 수단을 이용하는데 아무런 문제가 없다._

해당 목차에서의 설명이 앞서 설명한 추상화와 다형성의 특성을 활용한 역할과 구현의 구분이자, 보다 유연하고 변경이 용이한 소프트웨어 설계를 가능하게 하는 객체 지향 프로그래밍의 꽃이라고 할 수 있다.

하지만, 아직 모든 문제가 해결된 것은 아니다.

#### 의존 관계 주입 (Dependency Injection)

{: file="Main.java"}

```java
public class Main {
  public static void main(String[] args) {
    Car car = new Car();
    MotorBike motorBike = new MotorBike();
    Driver driver = new Driver();

    driver.drive(car);
    // 🚗 <- <- <- <- <- <- 🚗
    // 🚗 -> -> -> -> -> -> 🚗

    driver.drive(motorBike);
    // 🏍️ <- <- <- <- <- <- 🏍️
    // 🏍️ -> -> -> -> -> -> 🏍️
  }
}
```

위의 실행 클래스의 코드를 보면, 여전히 코드에서 객체를 생성할 때 `new Car()`와 `new MotorBike()`처럼 객체에 직접적으로 의존하고 있어서, 해당 객체를 다른 객체ㅗ 변경할 시, 코드의 변경이 불가피하다.

즉, 객체 간의 높은 결합도로 보이는 상황이 다시 발생한 것이다.

`Java`의 경우, 위의 문제를 해결하기 위해 등장한 것이 바로 의존관계 주입(Dependency Injection)이라 부르는 스프링 프레임워크의 핵심적인 개념이다.

## 참고 사이트

> [코드스테이츠 - 객체 지향 프로그래밍의 4가지 특징ㅣ추상화, 상속, 다형성, 캡슐화][ref_site_1]

---

> 다른 특징들 중 하나인 캡슐화에 대해서는 [#객체 지향 프로그래밍의 특징 - 캡슐화 (Encapsulation)][oop-encapsulation]에서 이어서 설명

<!-- 이미지 -->

[image_1]: {{page.image-path}}/oop-polymorphism_1.png
[image_2]: {{page.image-path}}/oop-polymorphism_2.png
[image_3]: {{page.image-path}}/oop-polymorphism_3.png
[image_4]: {{page.image-path}}/oop-polymorphism_4.png
[image_5]: {{page.image-path}}/oop-polymorphism_5.png

<!-- 블로그 게시글 -->

[oop]: {{site.url}}/posts/oop
[oop-abstraction]: {{site.url}}/posts/oop-abstraction
[oop-inheritance]: {{site.url}}/posts/oop-inheritance
[oop-encapsulation]: {{site.url}}/posts/oop-encapsulation

<!-- 참고 사이트 -->

[ref_site_1]: https://www.codestates.com/blog/content/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%8A%B9%EC%A7%95
