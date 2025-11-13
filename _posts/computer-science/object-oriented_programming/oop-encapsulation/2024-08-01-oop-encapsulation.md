---
title: 객체 지향 프로그래밍의 특징 - 캡슐화 (Encapsulation)
description: 객체 지향 프로그래밍의 특징 중 캡슐화(Encapsulation)의 개념 정리
categories: [Computer Science, OOP]
tags: [oop, encapsulation] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
done: true # 커스텀해서 만든 것
image-path: /assets/img/computer-science/object-oriented_programming/oop-encapsulation # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/object-oriented_programming/oop-encapsulation/oop-encapsulation_3.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: 캡슐화(Polymorphism)의 예시 이미지
---

> 객체 지향 프로그래밍에 대한 전체적인 내용은 [#객체 지향 프로그래밍이란?][oop]를 참고
>
> 이전에 설명한 특징인 다형성에 대해서는 [#객체 지향 프로그래밍의 특징 - 다형성 (Polymorphism)][oop-polymorphism] 참고
>
> 추가적으로, 추상화에 대해서는 [#객체 지향 프로그래밍의 특징 - 추상화 (Abstraction)][oop-abstraction] 게시글을,
> 상속에 대해서는 [#객체 지향 프로그래밍의 특징 - 상속 (Inheritance)][oop-inheritance] 게시글을 참고

## 캡슐화(Encapsulation)의 개념

캡슐화란, 클래스 안에 <ins>서로 연관있는 속성과 기능들을 하나의 캡슐(Capsule)로 만들어 데이터를 외부로부터 보호하는 것</ins>을 말한다.

위의 그림처럼 서로 관련있는 데이터와 이를 처리할 수 있는 기능들을 한 곳에 모아 관리하는 것이다.

객체 지향 프로그래밍에서 이렇게 캡슐화를 하는 이유는 크게 두 가지이다.

- 데이터 보호 (Data Protection)
  : 외부로부터 클래스에 정의된 속성과 기능들을 보호
- 데이터 은닉 (Data Hiding)
  : 내부의 동작을 감추고 외부에는 필요한 부분만을 노출

![image_1][image_1]

우리가 아플 때 한 번씩 먹게 되는 캡슐 약을 떠올려보면, 우리는 캡슐 안에 어떤 색의 내용물이 있는지, 또 어떤 성분의 약이 들어있는지 알 수 없다.

또한, 그 안의 내용물은 캡슐을 통해 외부로부터 오염되지 않고 안전하게 보호된다.

OOP의 캡슐화도 이와 같다고 할 수 있다.

즉, 외부로부터 클래스에 정의된 속성과 기능들을 보호하고, <ins>필요한 부분만 외부로 노출</ins>될 수 있도록하여 <ins>각 객체 고유의 독립성과 책임 영역을 안전하게 지키고자 하는 목적</ins>이 있다.

어떻게 이러한 목적을 달성할 수 있는가?

대표적인 객체 지향 프로그래밍 언어인 `Java`의 경우, 캡슐화를 구현하기 위한 방법으로 크게 두 가지가 존재한다.

## 캡슐화 구현 - 접근 제어자(Access Modifiers)

먼저 접근 제어자(`Access Modifiers`)를 활용하는 것이다.

접근 제어자는 클래스 또는 클래스의 내부의 멤버들에 사용되어, 해당 <ins>클래스나 멤버들을 외부에서 접근하지 못하도록 접근을 제한하는 역할</ins>을 한다.

실생활의 예시를 보면,

![image_2][image_2]
_Public(공중화장실), Protected(호텔 화장실), Private(집 화장실)_

위의 이미지는 접근 제어자를 실생활에서 쉽게 접할 수 있는 화잘실을 예시로 표현한 것이다.

모두에게 열려있는 공중화장실, 특정한 멤버쉽을 가진 사람들에게만 열려있는 호텔 화장실, 그리고 자신만 사용할 수 있는 집 개인 화장실은 각각의 다른 접근 범위를 가진다고 할 수 있다.

접근 제어자도 같은 개념이라고 생각하면 쉽다.

`Java`에는 `public`, `default`, `protected`, `private` 총 4가지 종류의 접근 제어자가 있는데, 위 화장실의 예제처럼 오른쪽으로 갈수록 더 좁은 접근 범위를 가진다.

따라서, 어떤 소프트웨어 프로그램을 설계할 때, 위의 접근 제어자를 활용하면 어떤 클래스나 그 멤버에 대한 접근 범위를 설정할 수 있어 데이터를 효과적으로 보호할 수 있다.

### 접근 제어자(Access Modifiers)의 접근 범위

| 접근 제어자 | 클래스 內 | 패키지 內 | 다른 패키지의 하위 클래스 | 패키지 外 | 설명                                                  |
| :---------: | :-------: | :-------: | :-----------------------: | :-------: | :---------------------------------------------------- |
|  `private`  |    ⭕️    |    ❌     |            ❌             |    ❌     | 동일 클래스 내에서만 접근 가능                        |
|  `default`  |    ⭕️    |    ⭕️    |            ❌             |    ❌     | 동일 패키지 내에서만 접근 가능                        |
| `protected` |    ⭕️    |    ⭕️    |            ⭕️            |    ❌     | 동일 패키지 + 다른 패키지의 하위 클래스에서 접근 가능 |
|  `public`   |    ⭕️    |    ⭕️    |            ⭕️            |    ⭕️    | 접근 제한 없음                                        |

위의 표에서 확인할 수 있는 것처럼, 접근 제어자의 접근 범위가 각각 클래스 내, 패키지 내, 다른 패키지의 하위 클래스, 그리고 패키지 외까지 각각 다른 것을 확인할 수 있다.

위의 내용을 코드로 알아보면,

### 접근 제어자(Access Modifiers) 코드 예제

{: file="/package1/SuperClass.java"}

```java
package package1;

public class SuperClass {
  private int a = 1;
  int b = 2;
  protected int c = 3;
  public int d = 4;

  public void printEach() {
    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
    System.out.println(d);
  }
}
```

위와 같이 `a`, `b`, `c`, `d`에 각각 다른 접근 제어자 정의하여 `SuperClass`를 정의

{: file="/package1/Test1.java"}

```java
package package1;

class Test1 {
  public static void main(String[] args) {
    SuperClass superClass = new SuperClass();

    // System.out.println(superClass.a); -> 동일 클래스가 아니기 때문에 Error
    System.out.println(superClass.b); // 2
    System.out.println(superClass.c); // 3
    System.out.println(superClass.d); // 4

    superClass.printEach(); // 1 2 3 4
  }
}
```

위의 코드와 같이 같은 패키지지만 `private`으로 정의한 `superClass.a`의 경우, 동일 클래스가 아니기 때문에 호출 시 오류가 발생한다.

{: file="/package2/Test2.java"}

```java
package package2; // 패키지 명 (쉽게 생각해서 디렉토리)

import package1.SuperClass;

class SubClass extends SuperClass { // package1으로부터 SuperClass 클래스 상속
  public void printEach() {
    // System.out.println(a); -> Error
    // System.out.println(b); -> Error
    System.out.println(c); // 다른 패키지의 하위 클래스
    System.out.println(d);
  }
}

public class Test2 {
  public static void main(String[] args) {
    SuperClass parent = new SuperClass();

    // System.out.println(parent.a);
    // System.out.println(parent.b);
    // System.out.println(parent.c);
    // public 제외한 모든 호출 Error
    System.out.println(parent.d); // 4
  }
}
```

위의 코드를 보면, 다른 패키지(`package2`)에서 `package1`의 `SuperClass` 클래스를 상속받아 사용한다.

다른 패키지의 하위 클래스에서 사용이 가능한 `protected`로 정의한 `c`와 `public`으로 정의한 `d`의 경우 상속받은 `SubClass`에서 사용이 가능하다.

하지만, 다른 패키지에서의 호출의 경우 `public`으로 정의한 `d`만이 호출이 가능하다.

## 캡슐화 구현 - getter/setter 메서드

{: file="/vehiclePackage/Car.java"}

```java
package vehiclePackage;

public class Car {
  private String model;
  private String color;
  private int wheels;


  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public int getWheels() {
    return wheels;
  }

  public void setWheels(int wheels) {
    this.wheels = wheels;
  }
}
```

위의 예제를 보면, 모든 속성 값들이 `private` 접근 제어자로 선언되어 있고, `getter`/`setter` 메서드의 접근 제어자만이 `public`으로 열려있다.

따라서 선택적으로 외부에 접근을 허용할 속성과 그렇지 않을 속성을 `getter`/`setter` 메서드를 통해 설정해 줄 수 있다.

아래의 코드를 통해 좀 더 구체적으로 앞서 설명한 캡슐화가 어떻게 객체 지향의 핵심적인 이점과 연결될 수 있는지 알아보도록 한다.

### 객체 간의 결합도가 높은 경우

{: file="/vehiclePackage/Car.java"}

```java
package vehiclePackage;

public class Car {
  private String model;
  private String color;

  public Car(String model, String color) {
    this.model = model;
    this.color = color;
  }

  public void startEngine() {
    System.out.println("엔진 ON");
  }

  public void moveForward() {
    System.out.println("🚗 <- <- <- <- <- <- 🚗");
  }

  public void openWindow() {
    System.out.println("모든 창문을 연다.");
  }
}
```

{: file="/vehiclePackage/Driver.java"}

```java
package vehiclePackage;

public class Driver {
  private String name;
  private Car car;

  public Driver(String name, Car car) {
    this.name = name;
    this.car = car;
  }

  public void drive() {
    car.startEngine();
    car.moveForward();
    car.openWindow();
  }
}
```

{: file="/vehiclePackage/Main.java"}

```java
package vehiclePackage;

public class Main {
  public static void main(String[] args) {
    Car car = new Car("제네시스 G90", "Black");
    Driver driver = new Driver("Hyung-Jin, Han", car);

    driver.drive();
    // 엔진 ON
    // 🚗 <- <- <- <- <- <- 🚗
    // 모든 창문을 연다.
  }
}
```

위의 코드는 아무런 문제 없이 잘 동작하는 코드처럼 보이지만, 치명적인 약점이 존재한다.

`Driver` 클래스의 `drive()` 메서드의 바디를 살펴보면, 해당 메서드가 호출되었을 때 `Car` 클래스의 메서드들이 순차적으로 실행되고 있는 것을 확인할 수 있다.

이 현상이 왜 문제이며, 치명적인 약점까지 되는 것인가?

만약에 `Car` 클래스의 3가지 메서드들에 어떤 변경이 생겼다고 가정해본다면, 해당 메서드들을 사용하고 있는 `Driver` 클래스의 `drive()` 메서드의 수정이 불가피하다.

즉, `Driver` 클래스가 `Car` 클래스의 세부적인 내부 로직을 속속히 너무 잘 알고 있고, 이것은 앞서 피하고자 노력했던 <ins>객체 간의 결합도가 높은 상태</ins>를 의미한다.

이런 경우에, 캡슐화를 활용해 객체의 자율성, 즉 하나의 객체가 해당 객체의 속성과 기능에 대한 독점적인 책임을 담당하도록 만들고, 이를 통해 객체 간의 결합도를 낮게 유지할 수 있다.

### 캡슐화를 통해 객체 간의 결합도를 낮춘 경우

{: file="/vehiclePackage/Car.java"}

```java
package vehiclePackage;

public class Car {
  private String model;
  private String color;

  public Car(String model, String color) {
    this.model = model;
    this.color = color;
  }

  private void getCarInfo() {
    System.out.println(model);
    System.out.println(color);
  }

  private void startEngine() {
    System.out.println("엔진 ON");
  }

  private void moveForward() {
    System.out.println("🚗 <- <- <- <- <- <- 🚗");
  }

  private void openWindow() {
    System.out.println("모든 창문을 연다.");
  }

  // 앞서 Driver 클래스에 정의된 메서드들을 이동하여 메서드 추출
  public void operate() {
    getCarInfo();
    startEngine();
    moveForward();
    openWindow();
  }
}
```

{: file="/vehiclePackage/Driver.java"}

```java
package vehiclePackage;

public class Driver {
  private String name;
  private Car car;

  public Driver(String name, Car car) {
    this.name = name;
    this.car = car;
  }

  private void getName() {
    System.out.println("Driver's Name is " + name);
  }

  public void drive() {
    getName();
    car.operate(); // Car 클래스에 있는 메서드를 단순하게 호출
  }
}
```

{: file="/vehiclePackage/Main.java"}

```java
package vehiclePackage;

public class Main {
  public static void main(String[] args) {
    Car car = new Car("제네시스 G90", "Black");
    Driver driver = new Driver("Hyung-Jin, Han", car);

    driver.drive();
    // Driver's Name is Hyung-Jin, Han
    // 제네시스 G90
    // Black
    // 엔진 ON
    // 🚗 <- <- <- <- <- <- 🚗
    // 모든 창문을 연다.
  }
}
```

출력 값은 동일하지만(추가적으로 `getCarInfo()` 메서드와 `getName()` 메서드 추가), 기존의 `Driver` 클래스가 하나하나 호출해줬던 메서드들을 모두 `operate()` 메서드로 묶어 `Car` 클래스로 옮겨두었고, `Driver` 클래스에서는 내부 동작을 전혀 신경쓰지 않아도 단순히 `operate()` 메서드를 호출하여 사용하고 있다.

또한, `operate()` 메서드 내부의 메서드들은 외부에서 호출되어 사용할 일이 없으므로, 접근 제어자를 모두 `private`으로 변경해주었다.

정리하면, `Car` 클래스와 관련된 기능들은 온전히 `Car`에서만 관리되도록 하였고, 불필요한 내부 동작의 노출을 최소화하였다.

이제 `Driver` 입장에서는 더 이상 `Car` 클래스의 내부 로직을 알지 못하고, 알 필요도 없어졌다.

위와 같이 캡슐화를 활용하면, 객체 내부의 동작의 외부로의 노출을 최소화하여 각 객체의 자율성을 높이고, 이를 통해 객체 간의 결합도를 낮추어 앞서 설명한 객체 지향의 핵심적인 이점을 잘 살리는 방법으로 프로그램을 설계하는 것이 가능하다.

## 참고 사이트

> [코드스테이츠 - 객체 지향 프로그래밍의 4가지 특징ㅣ추상화, 상속, 다형성, 캡슐화][ref_site_1]
>
> [Plus Ultra - [OOP] 캡슐화 (객체 지향과 디자인 패턴)][ref_site_2]

<!-- 이미지 -->

[image_1]: {{page.image-path}}/oop-encapsulation_1.png
[image_2]: {{page.image-path}}/oop-encapsulation_2.png

<!-- 블로그 게시글 -->

[oop]: {{site.url}}/posts/oop
[oop-abstraction]: {{site.url}}/posts/oop-abstraction
[oop-inheritance]: {{site.url}}/posts/oop-inheritance
[oop-polymorphism]: {{site.url}}/posts/oop-polymorphism

<!-- 참고 사이트 -->

[ref_site_1]: https://www.codestates.com/blog/content/%EA%B0%9D%EC%B2%B4-%EC%A7%80%ED%96%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%ED%8A%B9%EC%A7%95
[ref_site_2]: https://overcome-the-limits.tistory.com/361
