---
title: 디자인 패턴 (Design Pattern)
description: 디자인 패턴의 정의와 각 디자인 패턴의 설명 정리 및 예제 코드를 정리
categories: [Design Pattern]
tags: [design-pattern]
image:
  path: /assets/img/refactoring-guru/design-pattern.png
  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
  alt: Design Pattern Image
---

> [한글 설명 참고사이트](https://m.hanbit.co.kr/channel/category/category_view.html?cms_code=CMS8616098823)
>
> [JS 버전 디자인 패턴 GitHub](https://github.com/fbeline/design-patterns-JS)
>
> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)

## 디자인 패턴 용도에 따른 구분

### 한눈에 보기

<table>
  <tr>
    <th scope="col" style='text-align: center;'>구분</th>
    <th scope="col" style='text-align: center;'>생성 패턴</th>
    <th scope="col" style='text-align: center;'>구조 패턴</th>
    <th scope="col" style='text-align: center;'>행위 패턴</th>
  </tr>

  <tr>
    <th scope="row" style='text-align: center;'>클래스 (Class)</th>
    <td>
      <li style="list-style: none;">Factory</li>
    </td>
    <td>
      <li style="list-style: none;">Adapter (Class)</li>
    </td>
    <td>
      <li style="list-style: none;">Interpreter</li>
      <li style="list-style: none;">Template Method</li>
    </td>
  </tr>

  <tr>
    <th scope="row" style='text-align: center;'>객체 (Object)</th>
    <td>
      <li style="list-style: none;">Prototype</li>
      <li style="list-style: none;">Builder</li>
      <li style="list-style: none;">Abstract Factory</li>
      <li style="list-style: none;">Singleton</li>
    </td>
    <td>
      <li style="list-style: none;">Adapter (Object)</li>
      <li style="list-style: none;">Bridge</li>
      <li style="list-style: none;">Composite</li>
      <li style="list-style: none;">Decorator</li>
      <li style="list-style: none;">Facade</li>
      <li style="list-style: none;">Flyweight</li>
      <li style="list-style: none;">Proxy</li>
    </td>
    <td>
      <li style="list-style: none;">Chain of Responsibility</li>
      <li style="list-style: none;">Command</li>
      <li style="list-style: none;">Mediator</li>
      <li style="list-style: none;">Memento</li>
      <li style="list-style: none;">Iterator</li>
      <li style="list-style: none;">Observer</li>
      <li style="list-style: none;">State</li>
      <li style="list-style: none;">Strategy</li>
      <li style="list-style: none;">Visitor</li>
    </td>
  </tr>
</table>

## 각 디자인 패턴의 특징

### 생성 패턴

> 객체 인스턴스를 생성하는 패턴으로, 클라이언트와 그 클라이언트가 생성해야 하는 객체 인스턴스 사이의 연결을 끊어주는 패턴

- [싱글턴](https://hyungjinhan.github.io/posts/singleton/)
- [추상 팩토리](https://hyungjinhan.github.io/posts/abstract-factory/)
- [팩토리 메소드](https://hyungjinhan.github.io/posts/factory-method/)
- [빌더](https://hyungjinhan.github.io/posts/builder/)
- [프로토타입](https://hyungjinhan.github.io/posts/prototype/)

> [추상 팩토리 VS 팩토리 메소드](https://hyungjinhan.github.io/posts/abstract-vs-factory/)

### 행동 패턴

> 클래스와 객체들이 상호작용하는 방법과 역할을 분담하는 방법을 다루는 패턴

- [템플릿 메소드](https://hyungjinhan.github.io/posts/template-method/)
- [반복자 (Iterator)](https://hyungjinhan.github.io/posts/iterator/)
- [옵저버](https://hyungjinhan.github.io/posts/observer/)
- [상태 (State)](https://hyungjinhan.github.io/posts/state/)
- [전략 (Strategy)](https://hyungjinhan.github.io/posts/strategy/)
- [인터프리터](https://hyungjinhan.github.io/posts/interpreter/)
- [책임 연쇄 (Chain of Responsibility)](https://hyungjinhan.github.io/posts/chain-of-responsibility/)
- [방문자 (Visitor)](https://hyungjinhan.github.io/posts/visitor/)
- [중재자 (Mediator)](https://hyungjinhan.github.io/posts/mediator/)
- [메멘토](https://hyungjinhan.github.io/posts/memento/) → 예제 사이트 有
- [커맨드](https://hyungjinhan.github.io/posts/command/)

### 구조 패턴

> 클래스와 객체를 더 큰 구조로 만들 수 있게 구성을 사용하는 패턴

- [데코레이터](https://hyungjinhan.github.io/posts/decorator/)
- [복합체 (Composite)](https://hyungjinhan.github.io/posts/composite/)
- [프록시 ⭐️](https://hyungjinhan.github.io/posts/proxy/)
- [퍼사드](https://hyungjinhan.github.io/posts/facade/)
- [어댑터](https://hyungjinhan.github.io/posts/adapter/)
- [브릿지](https://hyungjinhan.github.io/posts/bridge/)
- [경량 (Flyweight)](https://hyungjinhan.github.io/posts/flyweight/)

### 같이보기

> 디자인 패턴 공부하다가 알게 된 것들

- [객체 지향 설계의 5원칙 `S.O.L.I.D`](https://hyungjinhan.github.io/posts/solid/)
- [정렬 알고리즘 (교환 정렬)](https://hyungjinhan.github.io/categories/exchange-sort/)
