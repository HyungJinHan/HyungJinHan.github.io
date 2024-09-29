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

![image_3_dark][image_3_dark]{: .dark .w-50 .normal}
![image_3_light][image_3_light]{: .light .w-50 .normal}

### 노드 클래스 정의하기

LinkedList의 경우, ArrayList와 가장 큰 차이점이라고 한다면 바로 "노드(Node)"라는 객체를 이용하여 연결한다는 점이다.

노드는 간단하게 생각해서 그냥 객체이다.

이 클래스에는 자료를 저장할 `Data`라는 필드와 다음/이전 연결 요소의 주소를 저장하는 `Next`와 `Prev`라는 필드를 가지고 있을 뿐이다.

이 노드 객체들이 서로 쌍방 연결된 형태가 이중 연결리스트인 것이다.

### search 구현하기

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

<!-- 참고 사이트 -->

[ref_site_1]: https://inpa.tistory.com/entry/DS-%F0%9F%A7%B1-Doubly-LinkedList-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%EC%8B%A4%EC%A0%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
