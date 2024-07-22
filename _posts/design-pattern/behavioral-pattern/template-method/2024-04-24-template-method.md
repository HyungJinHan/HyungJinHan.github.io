---
title: 템플릿 메소드 패턴 (Template Method Pattern)
description: 템플릿 메소드 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, Behavioral Pattern]
tags: [design-pattern, behavioral-pattern, template-method] # TAG names should always be lowercase
image:
  path: /assets/img/refactoring-guru/template-method.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Template Method Pattern Image
---

### 개념

- <ins>**여러 클래스에서 공통으로 사용하는 메서드를 템플릿화**</ins>하여 상위 클래서에서 정의하고, <ins>**하위 클래스마다 세부 동작 사항을 다르게 구현**</ins>하는 패턴

  - 즉, <ins>**변하지 않는 기능(템플릿)은 상위 클래스에**</ins> 만들어두고, <ins>**자주 변경되며 확장할 기능은 하위 클래스에서**</ins> 만들도록 하여
    상위의 메소드 실행 동작 순서는 고정하면서, 세부 실행 내용은 다양화 될 수 있는 경우에 사용함

- 템플릿 메소드 패턴은 상속이라는 기술을 극대화하여, <ins>**알고리즘의 뼈대**</ins>를 맞추는 것에 초점을 둠

  - 이미 수많은 프레임워크에서 많은 부분에 템플릿 메소드 패턴 코드가 적용되어 있음

> 디자인 페턴에서의 템플릿은 변하지 않는다는 것을 의미

### 패턴 구조

![teamplate_method](/assets/img/structure/teamplate_method.png)

- `AbstractClass` (추상 클래스)

  - 템플릿 메소드를 구현하고, 템플릿 메소드에서 돌아가는 추상 메소드를 선언함

  - 이 추상 메소드는 하위 클래스인 `ConcreteClass` 역할에 의해 구현됨

- `ConcreteClass` (구현 클래스)

  - `AbstractClass`를 상속하고, 추상 메소드를를 구체적으로 구현함

  - `ConcreteClass`에서 구현한 메소드는 `AbstractClass`의 템플릿 메소드에서 호출

### 예제 코드

{: file='template_method.ts'}

```ts
abstract class AbstractClass {
  public templateMethod(): void {
    this.baseOperation_1();
    this.requireOperations_1();
    this.baseOperation_2();
    this.hook_1();
    this.requireOperations_2();
    this.baseOperation_3();
    this.hook_2();
  }

  protected baseOperation_1(): void {
    console.log("AbastractClass says: I'm doing the bulk of the work");
  }

  protected baseOperation_2(): void {
    console.log(
      "AbastractClass says: But I let subclasses override some operations"
    );
  }

  protected baseOperation_3(): void {
    console.log("AbastractClass says: I'm doing the bulk of the work");
  }

  protected abstract requireOperations_1(): void;
  protected abstract requireOperations_2(): void;

  protected hook_1(): void {}
  protected hook_2(): void {}
}

class ConcreteClass_1 extends AbstractClass {
  protected requireOperations_1(): void {
    console.log("ConcreteClass_1 says: Implemented Operation 1");
  }

  protected requireOperations_2(): void {
    console.log("ConcreteClass_1 says: Implemented Operation 2");
  }
}

class ConcreteClass_2 extends AbstractClass {
  protected requireOperations_1(): void {
    console.log("ConcreteClass_2 says: Implemented Operation 1");
  }

  protected requireOperations_2(): void {
    console.log("ConcreteClass_2 says: Implemented Operation 2");
  }

  protected hook_1(): void {
    console.log("ConcreteClass_2 says: Overridden Hook 1");
  }
}

function clientCode(abstractClass: AbstractClass) {
  abstractClass.templateMethod();
}

console.log("----------------------------------------------------------------");
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass_1());
console.log("");

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass_2());
console.log("----------------------------------------------------------------");
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
