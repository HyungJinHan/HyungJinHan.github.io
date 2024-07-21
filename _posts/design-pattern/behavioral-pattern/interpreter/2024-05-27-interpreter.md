---
title: 인터프리터 패턴 (Interpreter Pattern)
description: 인터프리터 패턴의 정의와 해당 디자인 패턴의 예제 코드를 통한 이해 및 설명 정리
categories: [Design Pattern, Behavioral Pattern]
tags: [design-pattern, behavioral-pattern, interpreter] # TAG names should always be lowercase
image:
  path: /assets/img/structure/interpreter.png
  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
  alt: Interpreter Pattern Image
---

### 개념

- 인터프리터의 의미 자체는 보통 해석해주거나 통역해주는 역할을 가진 사람 혹은 물건을 의미

  - 악보를 음악으로 변환하는 것도 이러한 역할의 하나이기 때문에 연주자라는 의미도 있음

- 가장 쉽게 볼 수 있는 예로는 정규표현식이 있음

- 자주 등장하는 문제를 별개의 언어로 정의하고 재사용하는 패턴

  - 문법에 등장하는 규칙을 클래스로 표현하고 언어에서의 표현식을 해석하고 평가

  - `Expression`이라는 추상 클래스를 만드는 경우가 많음

  - `Expression` 클래스에서 파생된 구체적인 클래스는 언어의 다양한 규칙 또는 요소를 나타냄

- 반복되는 문제 패턴을 언어 또는 문법으로 정의하고 확장할 수 있음

### 패턴 구조

![interpreter](/assets/img/structure/interpreter.png)

- `interpret`

  - 항상 `Context`가 있음이 중요

- `TerminalExpression`

  - 종료가 가능한 `Expression`

  - 숫자 연산을 예시로 들면, 숫자 그 자체

  - AST에서 트리의 leaf node로 표현될 수 있는 것

- `NonTerminalExpression`

  - 다른 `Expression`을 참조하는 `Expression`

  - 숫자 연산을 예시로 들면, 연산을 할 때의 연산 기호

  - 그 자체로 끝날 수 없음

### 예제 코드

{: file='interpreter.js'}

```js
const data = {
  users: {
    u1: "UserName1",
    u2: "UserName2",
    u3: "UserName3",
    u4: "UserName4",
  },
  groups: {
    FP: ["u1", "u2", "u3"],
    OOP: ["u2", "u3"],
  },
  friends: {
    u1: ["u2", "u3"],
    u2: ["u1", "u3", "u4"],
    u3: ["u2"],
  },
};

// 실제 요청 처리 API

function friendsOfN(idList) {
  return Promise.resolve(idList.map((id) => data.friends[id]));
}

function memberOfGroup_(gId, uId) {
  return Promise.resolve(data.groups[gId].indexOf(uId) >= 0);
}

function getNameN(idList) {
  return Promise.resolve(idList.map((id) => data.users[id]));
}

// run/step

function step(stack, value) {
  while (stack.length > 0) {
    const top = stack.pop();
    if (top instanceof Request) {
      const r = { request: top.request };
      return {
        blocked: [r],
        next: () => step(stack, r.value),
      };
    } else if (Array.isArray(top)) {
      const values = top.map((g) => step([g]));
      if (values.every((v) => "done" in v)) {
        value = values.map((v) => v.done);
      } else {
        return {
          blocked: values.reduce((a, b) => a.concat(b.blocked || []), []),
          next: function next() {
            for (const i in values) {
              if ("blocked" in values[i]) {
                values[i] = values[i].next();
              }
            }
            if (values.every((v) => "done" in v)) {
              return step(
                stack,
                values.map((v) => v.done)
              );
            } else {
              return {
                blocked: values.reduce((a, b) => a.concat(b.blocked || []), []),
                next,
              };
            }
          },
        };
      }
    } else if (typeof top.next === "function") {
      const r = top.next(value);
      if (r.done) {
        value = r.value;
      } else {
        stack.push(top); // top not finished
        stack.push(r.value);
      }
    }
  }
  return { done: value };
}

async function run(g, process) {
  let next = () => step([g()]);
  while (true) {
    const r = next();
    if ("done" in r) return r.done;
    await process(r.blocked);
    next = r.next;
  }
}

// generator를 위한 API

function Request(request) {
  this.request = request;
}

function friendsOf(id) {
  return new Request({ type: "friendsOf", id });
}

function memberOfGroup(gId, uId) {
  return new Request({ type: "memberOfGroup", gId, uId });
}

function getName(id) {
  return new Request({ type: "getName", id });
}

//

async function process(requests) {
  console.log(requests);
  const batches = {};
  requests.forEach((r) => {
    batches[r.request.type] = batches[r.request.type] || [];
    batches[r.request.type].push(r);
  });
  const ps = Object.keys(batches).map((type) => {
    if (type === "friendsOf") {
      return friendsOfN(batches[type].map((r) => r.request.id)).then((names) =>
        batches[type].map((r, i) => (r.value = names[i]))
      );
    }
    if (type === "memberOfGroup") {
      return Promise.all(
        batches[type].map((r) =>
          memberOfGroup_(r.request.gId, r.request.uId).then(
            (v) => (r.value = v)
          )
        )
      );
    }
    if (type === "getName") {
      return getNameN(batches[type].map((r) => r.request.id)).then((names) =>
        batches[type].map((r, i) => (r.value = names[i]))
      );
    }
  });
  await Promise.all(ps);
}

// biz logic

function* fpFriends(id) {
  const friends = yield friendsOf(id);
  const fp = yield friends.map((f) => memberOfGroup("FP", f));
  return yield friends.filter((f, i) => fp[i]).map(getName);
}

function* commonFpFriends(id1, id2) {
  const [fs1, fs2] = yield [fpFriends(id1), fpFriends(id2)];
  return intersect(fs1, fs2);
}

function intersect(as, bs) {
  as = new Set(as);
  return bs.filter((b) => as.has(b));
}

run(function* () {
  console.log(yield commonFpFriends("u1", "u2"));
}, process);

function intersect(as, bs) {
  as = new Set(as);
  return bs.filter((b) => as.has(b));
}
```

### 참고한 출처 사이트

> [Refactoring GURU](https://refactoring.guru/ko/design-patterns)
>
> [Inpa Dev Blog (디자인 패턴)](https://inpa.tistory.com/category/%EB%94%94%EC%9E%90%EC%9D%B8%20%ED%8C%A8%ED%84%B4)
