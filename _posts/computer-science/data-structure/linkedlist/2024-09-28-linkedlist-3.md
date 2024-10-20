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

![image_1_dark][image_1_dark]{: .dark}
![image_1_light][image_1_light]{: .light}

## 이중 연결리스트 구현

> LinkedList의 <ins>"Linked"</ins> 개념이 어떤 식으로 노드끼리 연결되고 끊어지는지에 대한 원리를 가장 간단하게 알아볼 수 있는 방법으로 단일 연결리스트를 구현해보는 것이다.
>
> 이전 게시글인 [#LinkedList (2) - 단일 연결리스트 구현 (Java)][post-linkedlist2]을 통해 단일 연결리스트의 구현에 대해 알아볼 수 있다.

### 클래스 필드 & 생성자 정의하기

```java
public class MySinglyLinkedList<E> {
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

![image_2_dark][image_2_dark]{: .dark}
![image_2_light][image_2_light]{: .light}

그냥 노드만 `next`로 서로 참조하여 연결하면 될 것을, 굳이 `head`와 `tail`이라는 개념이 필요한 이유는 가장 처음 요소와 가장 마지막 요소에 대한 링크를 표현하기 위함이다.

하나의 노드는 다음 노드 정보만 가지고 있기 때문에, 가장 첫 번째와 마지막 노드를 참조하고 있는 포인트를 만들 필요가 있고, 그것이 `head`이며 마지막 노드는 `tail`이다.

또한 뒤에서 나올 `addLast()` 메서드 같은 경우에는 요소를 맨 마지막에 추가할 때, `tail`이 없다면, `add`할 때마다 맨 마지막 요소가 어디까지인지를 알 길이 없기 때문에 항상 노드들을 처음부터 순회해야 할 수도 있다.

### 노드 클래스 정의하기

LinkedList의 경우, ArrayList와 가장 큰 차이점이라고 한다면 바로 "노드(Node)"라는 객체를 이용하여 연결한다는 점이다.

노드는 간단하게 생각해서 그냥 객체이다.

이 클래스에는 자료를 저장할 `Data`라는 필드와 다음/이전 연결 요소의 주소를 저장하는 `Next`와 `Prev`라는 필드를 가지고 있을 뿐이다.

![image_3_dark][image_3_dark]{: .dark .w-50 .normal}
![image_3_light][image_3_light]{: .light .w-50 .normal}

이 노드 객체들이 서로 쌍방 연결된 형태가 이중 연결리스트인 것이다.

이전에 구현한 [#ArrayList][post-arraylist1]의 경우, 오브젝트 배열(`Object[]`)을 사용하여 데이터를 담아두었다면, LinkedList는 여러 노드 개게들을 내부적인 처리로 체인(Chain)처럼 연결한다.

위의 노드 객체를 클래스로 구현해본다면, 아래의 코드와 같다.

```java
package doublyLinkedList;

public class MyDoublyLinkedList<E> {
  private Node<E> head; // 노드의 첫 부분을 가리키는 포인트
  private Node<E> tail; // 노드의 마지막 부분을 가리키는 포인트

  private int size; // 요소 갯수

  public MyDoublyLinkedList() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

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

#### addFirst 구현

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

[image_1_dark]: {{page.image-path}}/linkedlist_1_dark.png
[image_1_light]: {{page.image-path}}/linkedlist_1_light.png
[image_2_dark]: /assets/img/computer-science/data-structure/linkedlist/linkedlist-2/linkedlist_2_dark.png
[image_2_light]: /assets/img/computer-science/data-structure/linkedlist/linkedlist-2/linkedlist_2_light.png
[image_3_dark]: {{page.image-path}}/linkedlist_3_dark.png
[image_3_light]: {{page.image-path}}/linkedlist_3_light.png

<!-- 블로그 게시글 -->

[post-linkedlist1]: {{site.url}}/posts/linkedlist-1
[post-linkedlist2]: {{site.url}}/posts/linkedlist-2
[post-arraylist1]: {{site.url}}/posts/arraylist-2

<!-- 참고 사이트 -->

[ref_site_1]: https://inpa.tistory.com/entry/DS-%F0%9F%A7%B1-Doubly-LinkedList-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8B%A4%EC%A0%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
