---
title: Abstract Factory VS Factory Method
description: 추상 팩토리 패턴과 팩토리 메서드 패턴의 유사점 / 차이점과 각 패턴의 사용 예제 정리
categories: [Design Pattern, Creational Pattern]
tags: [design-pattern, creational-pattern, abstract-factory, factory-method] # TAG names should always be lowercase
---

### 두 패턴의 유사점 / 차이점

- 둘 다 패고리 객체를 통해 구체적인 타입을 감추고 객체 생성에 관여하는 패턴 임에는 동일함

  - 또한, 공장 클래스가 각각 나뉘어 느슨한 결합 구조를 구성하는 모습 역시 유사함

- 주의할 것은 추상 팩토리 패턴이 팩토리 메서드 패턴의 상위 호환이 아니라는 점

  - 두 패턴의 차이는 명확하기 때문에 상황에 따라 적절한 선택을 해야 함

- 예를 들어 팩토리 메서드 패턴은 **_객체 생성 이후 해야 할 일_**의 공통점을 정의하는데 초점을 맞추는 반면,
  추상 팩토리 패턴은 생성해야 할 **_객체 집합 군_**의 공통점에 초점을 맞춤

- 이 둘의 유사점과 차이점을 조합하여 복합 패턴을 구성하는 것도 가능

  <table>
    <tr>
      <td></td>
      <td style='text-align: center;'>팩토리 메서드 패턴</td>
      <td style='text-align: center;'>추상 팩토리 패턴</td>
    </tr>

    <tr>
      <td style='text-align: center;'>공통점</td>
      <td colspan="2" style='text-align: center;'>
      객체 생성 과정을 추상화한 인터페이스를 제공
      <br/>
      객체 생성을 캡슐화함으로써 구체적인 타입을 감추고 느슨한 결합 구조를 표방
      </td>
    </tr>
    
    <tr>
      <td rowspan="4" style='text-align: center;'>차이점</td>
      <td>구체적인 객체 생성 과정을 하위 또는 구체적인 클래스로 옮기는 것이 목적</td>
      <td>관련 있는 여러 객체를 구체적인 클래스에 의존하지 않고 만들 수 있게 해주는 것이 목적</td>
    </tr>

    <tr>
      <td>한 Factory 당, 한 종류의 객체 생성 지원</td>
      <td>한 Factory에서 서로 연관된 여러 종류의 객체 생성을 지원 (제품군 생성 지원)</td>
    </tr>
    
    <tr>
      <td>메소드 레벨에서 포커스를 맞춤으로써, 클라이언트의 ConcreteProduct 인스턴스의 생성 및 구성에 대한 의존을 감소</td>
      <td>클래스(Factory) 레벨에서 포커스를 맞춤으로써, 클라이언트의 ConcreteProduct 인스턴스 군의 생성 및 구성에 대한 의존을 감소</td>
    </tr>
  </table>

### 두 패턴의 비교 예제

- [버튼 만들기 예제](https://github.com/HyungJinHan/design_pattern/tree/main/CreationalPattern/AbstractVSFactoryMethod/ButtonExample)

#### 팩토리 메서드의 문제점

- 팩토리 메서드로 구현한 코드는 실행 자체에는 문제가 없어 보이지만, 만일 기능을 확장할 필요가 있을 때 문제가 생김

- 예를 들어 OS 종류 중 Linux를 추가한다면 각 메서드마다 존재하는 분기 로직을 일일히 수정해야 함

  ```ts
  switch (type.toLowerCase()) {
    case "window":
      button = new WindowButton();
      break;
    case "mac":
      button = new MacButton();
      break;
    case "linux":
      button = new MacButton();
      break;
    // ...
    case "또 다른 OS":
      button = new OtherButton();
      break;
    // ...
  }

  switch (type.toLowerCase()) {
    case "window":
      checkbox = new WindowCheckBox();
      break;
    case "mac":
      checkbox = new MacCheckBox();
      break;
    // ...
    case "또 다른 OS":
      checkbox = new OtherCheckBox();
      break;
    // ...
  }

  switch (type.toLowerCase()) {
    case "window":
      textEdit = new WindowTextEdit();
      break;
    case "mac":
      textEdit = new MacTextEdit();
      break;
    // ...
    case "또 다른 OS":
      textEdit = new OtherTextEdit();
      break;
    // ...
  }

  // ...
  ```

#### 추상 팩토리의 유연한 확장

- 예를 들어 Linux OS 환경이 추가된다고 하더라도, 기존의 코드 수정 없이 컴포넌트 구현체 클래스와 팩토리 클래스만 적절하게 추가만 해주면 확장됨

  ```ts
  /** Component.ts */
  class LinuxFactory implements ComponentAbstractFactory {
    createButton(): Button {
      return new LinuxButton();
    }

    createCheck(): CheckBox {
      return new LinuxCheckBox();
    }

    createTextEdit(): TextEdit {
      return new LinuxTextEdit();
    }
  }

  /** FactoryMethod.ts */
  class LinuxButton extends Button {
    /** @override */
    public override render(): void {
      console.log("리눅스 버튼 생성 완료");
    }
  }

  class LinuxCheckBox extends CheckBox {
    /** @override */
    public override render(): void {
      console.log("리눅스 체크 박스 생성 완료");
    }
  }

  class LinuxTextEdit extends TextEdit {
    /** @override */
    public override render(): void {
      console.log("리눅스 텍스트 박스 생성 완료");
    }
  }
  ```

#### 추상 팩토리의 문제점

- 추상 팩토리 패턴이 모든 확장에 대해 유연하게 대처할 수 있다는 의미는 아님

- 새로운 OS 환경이 아닌, 새로운 컴포넌트인 `TooltTip` 등을 추가한다면

  ```ts
  /** AbstractFactory.ts */
  interface ComponentAbstractFactory {
    createButton(): Button;
    createCheck(): CheckBox;
    createTextEdit(): TextEdit;
    createToolTip(): ToolTip; // -> 툴팁 기능 추가
  }

  class WindowFactory implements ComponentAbstractFactory {
    createButton(): Button {
      return new WindowButton();
    }

    createCheck(): CheckBox {
      return new WindowCheckBox();
    }

    createTextEdit(): TextEdit {
      return new WindowTextEdit();
    }

    /** 툴팁 기능 추가 */
    createToolTip(): ToolTip {
      return new WindowToolTip();
    }
  }

  class MacFactory implements ComponentAbstractFactory {
    createButton(): Button {
      return new MacButton();
    }

    createCheck(): CheckBox {
      return new MacCheckBox();
    }

    /** 툴팁 기능 추가 */
    createToolTip(): ToolTip {
      return new MacToolTip();
    }
  }

  /** Component.ts */
  abstract class Button implements Component {
    render(): void {
      throw new Error("Method not implemented.");
    }
  }

  abstract class CheckBox implements Component {
    render(): void {
      throw new Error("Method not implemented");
    }
  }

  abstract class TextEdit implements Component {
    render(): void {
      throw new Error("Method not implemented");
    }
  }

  /** 툴팁 기능 추가 */
  abstract class Tooltip implements Component {
    render(): void {
      throw new Error("Method not implemented");
    }
  }
  ```

#### 결론

- 두 패턴은 엄연히 별개의 코드 패턴이며, 두 패턴 중 어느 패턴이 우월한지를 정하는 것은 틀린 것
  - 사용처에 따라 코드 패턴을 적절히 선택하여 코드를 작성하는 것이 좋음

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
