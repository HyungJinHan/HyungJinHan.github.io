---
title: LinkedList (3) - 이중 연결리스트 구현 (Java)
description: Java의 자료 구조 중 하나인 LinkedList의 이중 연결리스트를 Java로 직접 구현
categories: [Computer Science, Data Structure]
tags: [computer-science, data-structure, linkedlist, doubly-linkedlist] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
private: true # 커스텀해서 만든 것
image-path: /assets/img/computer-science/data-structure/linkedlist/linkedlist-3 # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/data-structure/linkedlist/doubly_linkedlist.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Java's Doubly LinkedList
---

> LinkedList에 대한 추가적인 설명에 대해서는 [#LinkedList (1) - LinkedList 구조][post-linkedlist1] 게시글을 참고

## 이중 연결리스트 자료 구조

- 노드(객체)를 연결하여 리스트처럼 만든 컬렉션이다.
  - > 배열이 아니다.
- 노드들을 연결하여 목록을 구성하기에 용량(Capacity) 개념이 없다.
  - > 무한하게 저장이 가능하다.
- 데이터의 저장 순서가 유지되고 중복을 허용한다.
- ArrayList처럼 index로 요소에 접근하지만, 배열이 아니기 때문에 별도로 탐색 시간이 걸려, <ins class="red">임의의 요소에 대한 접근 성능이 좋지 않다.</ins>
- 대신 데이터의 <ins class="blue">중간 삽입/삭제가 빈번할 경우, 빠른 성능을 보장</ins>한다.
- 하지만, 노드에 들어있는 내용이 많을 수록 <ins class="res">메모리의 사용량이 많아진다</ins>는 단점이 존재한다.

[#단일 연결리스트][post-linkedlist2]는 단방향 연결리스트이기 때문에, 만약에 리스트의 끝 요소를 탐색하려고 한다면, 처음(`head`)부터 끝까지 순회하며 탐색해야 하지만, 이중 연결리스트는 <ins>`prev` 포인트</ins>를 가지고 있기 때문에, 한 번에 마지막 요소를 탐색하는 것이 가능하다.

그래서 실무에서 사용하는 LinkedList의 형태는 기본적으로 이중 연결리스트이다.

![image-1-dark][image-1-dark]{: .dark}
![image-1-light][image_1_light]{: .light}

## 이중 연결리스트 구현

> LinkedList의 <ins>"Linked"</ins> 개념이 어떤 식으로 노드끼리 연결되고 끊어지는지에 대한 원리를 가장 간단하게 알아볼 수 있는 방법으로 단일 연결리스트를 구현해보는 것이다.
>
> 이전 게시글인 [#LinkedList (2) - 단일 연결리스트 구현 (Java)][post-linkedlist2]을 통해 단일 연결리스트의 구현에 대해 알아볼 수 있다.

### 클래스 필드 & 생성자 정의하기

```java
public class MyDoublyLinkedList<E> {
  private Node<E> head; // 노드의 첫 부분을 가리키는 포인트
  private Node<E> tail; // 노드의 마지막 부분을 가리키는 포인트

  private int size; // 요소 개수

  public MyDoublyLinkedList() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // ...
}
```

- `head`
  : - 리스트의 가장 첫 노드를 가리키는 포인트로 이용될 변수
- `tail`
  : - 리스트의 가장 마지막 노드를 가리키는 포인트로 이용될 변수
- `size`
  : - 리스트에 있는 요소의 개수 (연결된 노드의 개수)

#### head와 tail 개념이 필요한 이유

![image-2-dark][image-2-dark]{: .dark}
![image-2-light][image-2-light]{: .light}

그냥 노드만 `next`로 서로 참조하여 연결하면 될 것을, 굳이 `head`와 `tail`이라는 개념이 필요한 이유는 가장 처음 요소와 가장 마지막 요소에 대한 링크를 표현하기 위함이다.

하나의 노드는 다음 노드 정보만 가지고 있기 때문에, 가장 첫 번째와 마지막 노드를 참조하고 있는 포인트를 만들 필요가 있고, 그것이 `head`이며 마지막 노드는 `tail`이다.

또한 뒤에서 나올 `addLast()` 메서드 같은 경우에는 요소를 맨 마지막에 추가할 때, `tail`이 없다면, `add`할 때마다 맨 마지막 요소가 어디까지인지를 알 길이 없기 때문에 항상 노드들을 처음부터 순회해야 할 수도 있다.

### 노드 클래스 정의하기

LinkedList의 경우, ArrayList와 가장 큰 차이점이라고 한다면 바로 "노드(Node)"라는 객체를 이용하여 연결한다는 점이다.

노드는 간단하게 생각해서 그냥 객체이다.

이 클래스에는 자료를 저장할 `Data`라는 필드와 다음/이전 연결 요소의 주소를 저장하는 `Next`와 `Prev`라는 필드를 가지고 있을 뿐이다.

![image-3-dark][image-3-dark]{: .dark .w-50 .normal}
![image-3-light][image-3-light]{: .light .w-50 .normal}

이 노드 객체들이 서로 쌍방 연결된 형태가 이중 연결리스트인 것이다.

이전에 구현한 [#ArrayList][post-arraylist1]의 경우, 오브젝트 배열(`Object[]`)을 사용하여 데이터를 담아두었다면, LinkedList는 여러 노드 개게들을 내부적인 처리로 체인(Chain)처럼 연결한다.

위의 노드 객체를 클래스로 구현해본다면, 아래의 코드와 같다.

```java
package linkedlist;

public class MyDoublyLinkedList<E> {
  // ...

  // inner static class
  private static class Node<E> {
    private E item; // Node에 담을 데이터
    private Node<E> next; // 다음 Node 객체를 가르키는 레퍼런스
    private Node<E> prev; // 이전 Node 객체를 가르키는 레퍼런스

    // 생성자
    // (이전 노드 포인트 | 데이터 | 다음 노드 포인트)
    Node(Node<E> prev, E item, Node<E> next) {
      this.item = item;
      this.next = next;
      this.prev = prev;
    }
  }
}
```

여기서 눈여겨 봐야할 점은 세 가지이다.

1. 왜 클래스 안에 클래스를 선언하였는가?
2. 왜 `private` 접근 지시자인가?
3. 왜 `static`이 붙었는가?

물론 `Node` 클래스를 `MyDoublyLinkedList` 클래스 밖에서 선언해도 문제는 없다.

다만, `Node` 클래스는 오로지 `MyDoublyLinkedList` 클래스에서만 사용되며, 다른 클래스에서는 전혀 사용되지 않는다.

이때 내부 클래스로 선언해주면 여러가지 장점을 얻게 되는데, 내부 클래스의 장점으로는 아래와 같다.

- 클래스를 논리적으로 그룹화
  : - 클래스가 여러 클래스와 관계를 맺지 않고 <ins>하나의 특정 클래스와만 관계</ins>를 맺는다면, 내부 클래스와 외부 클래스를 함께 관리하는 것이 가능해져서 유지보수 측면에서나 코드 이해성 면에서 편리해진다.
  : - 또한 내부 클래스로 인해 새로운 클래스를 생성하지 않아되므로, <ins>패키지를 간소화</ins>할 수 있다.
- 더욱 타이트한 캡슐화의 적용
  : - 내부 클래스에 `private` 제어자를 적용해 줌으로써, 캡슐화를 통해 클래스를 내부로 숨길 수 있다.
  : - 즉, 캡슐화를 통해 외부에서의 접근은 차단하며 내부 클래스에서 외부 클래스의 멤버들을 제약 없이 쉽게 접근할 수 있어서 구조적인 프로그래밍이 가능해진다.
  : - 그리고 클래스 구조를 숨김으로써 코드의 복잡성도 줄일 수 있다.
- 가독성이 좋고 유지 관리가 쉬운 코드
  : - 하나의 클래스를 다른 클래스 내부 클래스로 선언하면 두 클래스 멤버들 간에 서로 자유로이 접근이 가능하며, 외부에는 불필요한 클래스를 감춰서 클래스 간의 연관 관계를 따지는 것과 같은 코드의 복잡성을 줄일 수 있다.
  : - 간단하게 말하면, 어차피 A 클래스 안에서만 사용하기 위한 클래스이기 때문에 <ins>괜히 연관 관계 생각 없이 내부에 선언해 직관적으로 사용</ins>하자는 취지인 것이다.

그리고 `private` 접근 제어자의 경우, 객체가 외부로 노출되면 보안 상의 문제가 발생할 수 있기 때문에 오로지 `MyDoublyLinkedList` 메소드로만 제어가 가능하도록 하기 위해 설정되었다.

마지막으로 내부 클래스를 `static`으로 선언한 이유는 메모리 누수(Memory Leak)[^memory-leak] 이슈 때문이다.

{:.prompt-info}

> 사실상, 단일 연결리스트의 노드 클래스 구성과 비교했을때 그저 `prev` 변수만 추가된 것이다.
>
> 이렇게 양방향으로 연결되면 무엇이 좋은가하면, 단일 연결리스트에 비해 검색(색인) 능력이 좋아지게 된다.
>
> 단방향으로 연결된 단일 연결리스트의 경우, 마지막 요소를 얻기 위해서는 `head`부터 시작하여 탐색해야 한다.
>
> 물론, 따로 `tail`이라는 끝점을 두어 어느정도 극복했지만, 요소를 `remove`하는 데에 있어서 결국 한계점이 존재한다.
>
> 그 대신, 이중 연결리스트의 경우에는 이전 노드를 가리키는 변수를 갖고 있기 때문에, `tail`부터 거꾸로 탐색할 수 있어서 만일 찾으려는 노드가 `tail`에 가깝다면 역순으로, `head`에 가깝다면 순차적으로 탐색하면 되기 때문에, 좀 더 효율적은 탐색이 가능해진다.

### search 구현하기

본격적인 연결리스트의 동작인 `add`와 `remove`를 구현하기 앞서서, 따로 내부 메소드 용으로 `search()`를 구현하고자 한다.

리스트에 `add`와 `remove`를 하기 위해서는 우선 <ins>추가 / 삭제할 요소 탐색이 우선</ins>이 되기 때문에 반복적으로 재사용된다.

그렇기에 따로 내부 메소드로 분리하도록 하며, 이때, 보다 효율적인 탐색을 위해 탐색 방향을 두 가지로 나눌 것이다.

1. 만약에 `index`가 `0`(처음)에 가깝다면, 순차 방향 탐색
2. 만약에 `index`가 `size`(마지막)에 가깝다면, 역 방향 탐색

이런 식으로 구현해놓으면 요소를 검색할 때 시간 복잡도를 좀 더 줄일 수 있다는 장점이 있다.

```java
private Node<E> search(int index) {
  Node<E> n; // 반환할 노드

  if ((size / 2) > index) {
    // 1. 만약에 index가 시작에 가까우면, 순차 탐색
    n = head;
    for (int i = 0; i < index; i++) {
      n = n.next;
    }
  } else {
    // 2. 만약에 index가 끝에 가까우면, 역순 탐색
    n = tail;
    for (int i = size - 1; i > index; i--) {
      n = n.prev;
    }
  }

  return n;
}
```

이때, 반복문 범위를 `index`까지 탐색이 아닌 <ins>`index` 전까지만 탐색</ins>되어야 하는데, 반복문의 범위가 `i <= index`가 아닌, `i < index`인 이유는 노드의 `next` 자체가 그 다음 노드를 가리키기 때문이다.

`prev`도 마찬가지로 `index` 후까지만 탐색한다.

> 실제 Java의 `LinkedList` 클래스에서는 `private Node<E> node(int index)` 매소드 명으로 구현되어 있지만, 이해하기 쉽도록 `search`라는 메소드 명으로 구현하여 진행한다.

### add 구현하기

Java의 LinkedList 클래스의 `add` 메서드 종류는 아래와 같이 4가지가 존재한다.

- `void addFirst(Object obj)`
  : - 첫 번째 위치에 요소 추가
- `void addLast(Object obj)`
  : - 마지막 위치에 요소 추가
- `boolean add(Object obj)`
  : - 마지막 위치에 요소 추가 (성공하면 `true` 출력)
- `void add(int index, Object element)`
  : - 지정된 위치에 요소 추가

#### addFirst 구현

```java
public void addFirst(E value) {
  // 1. head를 임시 백업
  Node<E> first = head;

  // 2. 새로운 노드를 추가
  // 이때 첫 번째 노드이기 때문에 prev는 null이 되고 next는 head가 가리키는 노드가 된다.
  Node<E> new_node = new Node<>(null, value, first);

  // 3. 노드를 추가하였으니 리스트 크기 증가
  size++;

  // 4. 첫 번째 기준이 변경되었으니 head가 삽입된 새 노드로 참조하도록 업데이트
  head = new_node;

  if (first == null) {
    // 5. 만약에 빈 리스트에서 최초의 요소 추가일 경우, tail도 첫 번째 노드를 바라보도록 업데이트
    tail = new_node;
  } else {
    // 6. 만약에 빈 리스트가 아닐 경우, 추가되기 이전 첫 번째였던 노드에서 prev를 새 노드로 참조하도록 업데이트
    first.prev = new_node;
  }
}
```

이중 연결리스트에 요소가 첫 번째에 추가되는 과정을 이미지로 표현하자면 아래와 같다.

1. 먼저, 빈 리스트가 다음과 같이 존재한다.

   ![image-4-dark][image-4-dark]{: .dark .w-50 .normal}
   ![image-4-light][image-4-light]{: .light .w-50 .normal}

   > 비어있기 때문에 `head`와 `tail`은 각 `null`이다.

2. 새 노드를 추가한다.

   ![image-5-dark][image-5-dark]{: .dark .w-75 .normal}
   ![image-5-light][image-5-light]{: .light .w-75 .normal}

   > 이때 최초의 노드이기 때문에 `next`와 `prev`는 `null`이 된다.

3. `first` 변수의 값이 `null`이므로, `head`와 `tail` 모두 새 노드를 바라보도록 업데이트한다.

   ![image-6-dark][image-6-dark]{: .dark .w-75 .normal}
   ![image-6-light][image-6-light]{: .light .w-75 .normal}

4. 빈 리스트가 아닌, 요소가 들어있는 리스트에 노드를 `addFirst`하는 경우에는 우선 `head`가 가리키는 `Node @50`을 `first` 변수에 백업한다.

   ![image-7-dark][image-7-dark]{: .dark .w-75 .normal}
   ![image-7-light][image-7-light]{: .light .w-75 .normal}

5. 새 노드를 추가하면서 동시에 `next`가 `@50`을 가리키게 된다.

   ![image-8-dark][image-8-dark]{: .dark .w-75 .normal}
   ![image-8-light][image-8-light]{: .light .w-75 .normal}

   > 첫 번째이기 때문에 `prev`는 `null`

6. `head`를 새 노드(`@50` → `@40`)를 가리키도록 업데이트한다.

   ![image-9-dark][image-9-dark]{: .dark .w-75 .normal}
   ![image-9-light][image-9-light]{: .light .w-75 .normal}

7. `first`(`@50`) 노드의 `prev`가 새 노드를 가리키도록 업데이트한다.

   ![image-10-dark][image-10-dark]{: .dark .w-75 .normal}
   ![image-10-light][image-10-light]{: .light .w-75 .normal}

8. 최종적으로 이렇게 양방향으로 노드끼리 연결되는 리스트가 구성되게 된다.

   ![image-11-dark][image-11-dark]{: .dark}
   ![image-11-light][image-11-light]{: .light}

#### addLast 구현

#### add 구현

#### add 중간 삽입 구현

### remove 구현하기

#### removeFirst 구현

#### removeLast 구현

#### remove 구현

#### index로 remove 구현

#### 값으로 remove 구현

### get / set 구현하기

### indexOf 구현하기

### 기타 요소 구현하기

#### size 구현

#### isEmpty 구현

#### clear 구현

#### contains 구현

#### toString 구현

### LinkedList 커스텀 toString

## 이중 연결리스트 구현 전체 코드

## 참고 사이트

> [Inpa Dev - 🛠️ Doubly LinkedList 실전 구현 강의 (JAVA)][ref_site_1]

---

[^memory-leak]: 자바에서의 메모리 누수(Memory Leak)이란, 더 이상 사용되지 않는 객체들이 가비지 컬렉터에 의해 회수되지 않고 계속 누적되는 현상을 말하며, Old 영역에 계속 누적된 개게로 인해 Major GC가 빈번하게 발생하게 되면서, 프로그램 응답속도가 늦어지면서 성능 저하를 일으키며 결국 `OutOfMemory Error`로 프로그램이 종료된다.

<!-- 이미지 -->

[image-1-dark]: {{page.image-path}}/linkedlist_1_dark.png
[image-1-light]: {{page.image-path}}/linkedlist_1_light.png
[image-2-dark]: /assets/img/computer-science/data-structure/linkedlist/linkedlist-2/linkedli-t_2_dark.png
[image-2_light]: /assets/img/computer-science/data-structure/linkedlist/linkedlist-2/linkedlist_2_light.png
[image-3-dark]: {{page.image-path}}/linkedlist_3_dark.png
[image-3-light]: {{page.image-path}}/linkedlist_3_light.png
[image-4-dark]: {{page.image-path}}/linkedlist_4_dark.png
[image-4-light]: {{page.image-path}}/linkedlist_4_light.png
[image-5-dark]: {{page.image-path}}/linkedlist_5_dark.png
[image-5-light]: {{page.image-path}}/linkedlist_5_light.png
[image-6-dark]: {{page.image-path}}/linkedlist_6_dark.png
[image-6-light]: {{page.image-path}}/linkedlist_6_light.png
[image-7-dark]: {{page.image-path}}/linkedlist_7_dark.png
[image-7-light]: {{page.image-path}}/linkedlist_7_light.png
[image-8-dark]: {{page.image-path}}/linkedlist_8_dark.png
[image-8-light]: {{page.image-path}}/linkedlist_8_light.png
[image-9-dark]: {{page.image-path}}/linkedlist_9_dark.png
[image-9-light]: {{page.image-path}}/linkedlist_9_light.png
[image-10-dark]: {{page.image-path}}/linkedlist_10_dark.png
[image-10-light]: {{page.image-path}}/linkedlist_10_light.png
[image-11-dark]: {{page.image-path}}/linkedlist_11_dark.png
[image-11-light]: {{page.image-path}}/linkedlist_11_light.png

<!-- 블로그 게시글 -->

[post-linkedlist1]: {{site.url}}/posts/linkedlist-1
[post-linkedlist2]: {{site.url}}/posts/linkedlist-2
[post-arraylist1]: {{site.url}}/posts/arraylist-2

<!-- 참고 사이트 -->

[ref_site_1]: https://inpa.tistory.com/entry/DS-%F0%9F%A7%B1-Doubly-LinkedList-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8B%A4%EC%A0%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
