---
title: ES2015(ES6) const, let
description: ES2015(ES6)에서 추가된 const와 let에 대한 개념 정리
categories: [JavaScript, ECMAScript]
tags: [javascript, ecmascript, es2015, es6, const, let] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
done: true # 커스텀해서 만든 것
image-path: /assets/img/javascript/es # 이미지 공통 경로 변수
image:
  path: /assets/img/javascript/es/es6.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: ES2015 (ES6)
---

## const, let의 개념

기존 `var` 키워드와의 가장 큰 차이점은 `const`(Constant, 상수)와 `let` 키워드는 함수 스코프를 따르지 않고 <ins>블록 스코프</ins>를 따른다는 것이다.

지금까지 `JavaScript`는 다른 언어와는 다르게 함수 스코프를 사용하여 다른 언어를 사용하는 사람들이 적응하기가 어려웠지만, `const`와 `let` 키워드가 도입되어 적응하기가 비교적 수월해졌다.

> 스코프에 대한 설명은 [#스코프와 스코프 체인, 클로저란?][scope-closure_page] 참고

### 블록 스코프란?

해당 변수를 해당 블록에서만 접근할 수 있는 것을 말한다.

{: file="function_scope.js"}

```js
if (true) {
  var x = 3;
}

console.log(x);
// 3
```

{: file="block_scope.js"}

```js
if (true) {
  const x = 3;
}

console.log(x);
// Uncaught ReferenceError: y is not defined
```

위와 같이 `var` 키워드는 블록 스코프가 아닌 함수 스코프라서 `if` 블록과는 상관없이 접근할 수 있지만, `const`와 `let` 키워드는 블록 바깥에서 접근이 불가능하다.

{: file="global_scope.js"}

```js
var v = 1;
console.log(window.v);
// 1

const c = 2;
console.log(window.c);
// undefined
```

또한, 위와 같이 `const`와 `let` 키워드는 전역 스코프에서 선언 시, `var` 키워드와 다르게 `window`나 `global`에 등록되지 않는다.

### 호이스팅의 차이

그렇다고 `const`와 `let` 키워드가 호이스팅이 일어나지만, `var` 키워드와는 조금 다르게 호이스팅이 일어난다.

`var` 키워드는 Hoisting 때문에 코딩할 때 예기치 못한 상황이 자주 발생할 수 있다.

변수를 선언한 곳보다 더 위에서 해당 변수에 접근할 수 있는 경우이다.

`const`와 `let` 키워드를 사용할 때는 <ins>선언한 곳보다 위에서 접근하는 것이 금지</ins>된다. (⚠️ 에러 발생)

> 사실 호이스팅의 정의 자체가 불분명한 용어이다.
>
> 스펙에는 없지만, `JavaScript`의 동작을 설명하기 위해 만들어진 용어이다.

`const`와 `let` 키워드에도 호이스팅이 있다고 볼 수는 있지만, 호이스팅의 정의가 정해진 것이 아니라서 맞다, 틀리다의 판단이 애매하다.

결론적으로, 그냥 `const`와 `let` 키워드는 `var` 키워드의 호이스팅과는 다르게 동작하며, `TDZ`(Temporal Dead Zone)이라는 현상을 갖고 있다고 알아두는게 조금 더 정확할 수 있다.

{: file="var_hoisting.js"}

```js
(function () {
  console.log(x);
  var x = 10;
})();
// undefined
```

위와 같이 `undefined`가 뜰 뿐, 에러가 나지 않는다.

- 에러가 나지 않는다는 말은 곧 예기치 못한 상황이 자신도 모르게 일어날 수 있다는 말이다.

{: file="const_hoisting.js"}

```js
(() => {
  console.log(z);
  const z = 10;
})();
// Uncaught ReferenceError: z is not defined
```

하지만 `const`와 `let` 키워드는 그 현상을 차단했기 때문에 위와 같이 변수를 선언한 곳보다 위에서 변수 접근이 불가능하다.

> 호이스팅에 대한 설명은 [#호이스팅(Hoisting)이란?][hoisting_page]

## const, let의 차이점

둘의 차이는 간단하다.

둘 다 블록 스코프를 따르지만, `const` 키워드는 <ins>한 번 초기화하면 다른 값을 대입할 수 없다.</ins>

{: file="init.js"}

```js
const a = 100;
a = 101;
// Uncaught TypeError: Assignment to constant variable.

let b = 100;
b = 101;
// 101
```

위와 같이 `let` 키워드는 기존의 `var` 키워드처럼 계속 값을 바꿔줄 수 있지만, `const` 키워드를 사용하면 절대 바꿔서는 안 되는 값을 실수로 바꾸는 것을 예방할 수 있다.

{: file="array.js"}

```js
const array_a = [1, 2, 3];
array_a[0] = 4;
array_a;
// [4, 2, 3]

const object_a = { name: "Han" };
object_a.name = "Hyung-Jin";
object_a.name;
// Hyung-Jin
```

하지만 위와 같이 `const` 키워드는 값이 다시 대입하는 것을 막지만, `const` 키워드에 할당된 객체나 배열의 요소를 바꾸는 것은 막지 못한다.

즉, 데이터의 주소 값만 고정한다.

<ins>정리하자면, `=`을 통한 대입 연산만을 막는 것이다.</ins>

### 각 키워드의 차이점 정리

|    Keyword     | `var` | `let` | `const` |
| :------------: | :---: | :---: | :-----: |
|  Global Scope  |  Yes  |  No   |   No    |
| Function Scope |  Yes  |  Yes  |   Yes   |
|  Block Scope   |  No   |  Yes  |   Yes   |
|    Redelare    |  Yes  |  No   |   No    |
|    Reassign    |  Yes  |  Yes  |   No    |
|    Hoisted     |  Yes  |  No   |   No    |

## 참고 사이트

> [제로초 - ES2015(ES6) Const, Let][ref_site_1]

<!-- 이미지 -->

[heap_image_1]: {{page.image-path}}/image_1.png

<!-- 블로그 게시글 -->

[scope-closure_page]: {{site.url}}/posts/scope-closure
[hoisting_page]: {{site.url}}/posts/hoisting

<!-- 참고 사이트 -->

[ref_site_1]: https://www.zerocho.com/category/ECMAScript/post/5757d74345041aaae7493479
