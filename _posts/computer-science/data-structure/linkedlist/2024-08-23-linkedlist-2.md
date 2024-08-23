---
title: LinkedList (2) - 단일 연결리스트 구현 (Java)
description: Java의 자료 구조 중 하나인 LinkedList의 단일 연결리스트를 Java로 직접 구현
categories: [Computer Science, Data Structure]
tags: [computer-science, data-structure, linkedlist, singly-linkedlist] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: false
private: false # 커스텀해서 만든 것
image-path: /assets/img/computer-science/data-structure/linkedlist/linkedlist-2 # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/data-structure/linkedlist/singly_linkedlist.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Java's Singly LinkedList
---

## 단일 연결리스트 자료 구조

단일 연결리스트(Singly LinkedList) 특징은 아래와 같이 요약할 수 있다.

- 노드(객체)를 연결하여 리스트처럼 만든 컬렉션이다.
  - 배열이 아니다.
- 데이터의 <ins class="blue">중간 삽입/삭제가 빈번할 경우에 빠른 성능</ins>을 보장한다.
- 하지만, <ins class="red">임의의 요소에 대한 접근 성능</ins>이 좋지 않다.
- 특히 단일 연결리스트는 단방향 연결리스트이기 때문에 만일 리스트의 끝 요소를 탐색하려면, 처음(Head)부터 끝까지 순회하며 탐색해야 하기 떄문에 굉장히 효율이 떨어진다.
  - 이를 개선한 것이 이중 연결리스트(Doubly LinkedList)이다.
- 데이터의 저장 순서가 유지되고 중복을 허용한다.

![image_1_dark][image_1_dark]{: .dark}
![image_1_light][image_1_light]{: .light}

> LinkedList에 대한 추가적인 설명에 대해서는 [#LinkedList (1) - LinkedList 구조][post-linkedlist] 게시글을 참고

## 단일 연결리스트 구현

단일 연결리스트의 경우, 자료 구조의 한계로 인해 탐색 성능이 좋지 못하기 때문에 현업에서는 잘 쓰이지 않는다고 한다.

실제 Java의 LinkedList 클래스 내부도 이중 연결리스트로 구현되어 있다.

하지만 해당 게시글에서는 이중 연결리스트의 작동 원리를 알기 위해 선수 지식으로 단일 연결리스트의 작동 원리부터 이해하기 위해 간단하게 `add`, `remove` 그리고 `get`, `set` 기능 정도로만 구현 예제를 작성할 예정이다.

### 클래스 필드 & 생성자 정의하기

```java
public class MySinglyLinkedList<E> {
  private Node<E> head; // 노드의 첫 부분을 가리키는 포인트
  private Node<E> tail; // 노드의 마지막 부분을 가리키는 포인트

  private int size; // 요소 개수

  public MySinglyLinkedList() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
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

LinkedList의 경우, ArrayList와 가장 큰 차이점이라고 한다면 바로 "노드(Node)"라는 저장소를 이용하여 연결한다는 점이다.

> 쉽게 생각해서 노드는 그냥 객체이다.

![image_3_dark][image_3_dark]{: .dark .w-50 .normal}
![image_3_light][image_3_light]{: .light .w-50 .normal}

위와 같이 이 클래스에는 자료를 저장할 `Data`라는 필드와 다음 연결 요소의 주소를 저장하는 `Next`라는 필드를 가지고 있을 뿐이다.

그리고 <ins>이 노드 객체들이 서로 연결된 형태가 바로 LinkedList</ins>인 것이다.

<!--

![image_4_dark][image_4_dark]{: .dark}
![image_4_light][image_4_light]{: .light}

![image_5_dark][image_5_dark]{: .dark}
![image_5_light][image_5_light]{: .light}

![image_6_dark][image_6_dark]{: .dark}
![image_6_light][image_6_light]{: .light}

![image_7_dark][image_7_dark]{: .dark}
![image_7_light][image_7_light]{: .light}

![image_8_dark][image_8_dark]{: .dark}
![image_8_light][image_8_light]{: .light}

![image_9_dark][image_9_dark]{: .dark}
![image_9_light][image_9_light]{: .light}

![image_10_dark][image_10_dark]{: .dark}
![image_10_light][image_10_light]{: .light}

![image_11_dark][image_11_dark]{: .dark}
![image_11_light][image_11_light]{: .light}

![image_12_dark][image_12_dark]{: .dark}
![image_12_light][image_12_light]{: .light}

 -->

## 참고 사이트

> [Inpa Dev - 🛠️ Singly LinkedList 실전 구현 강의 (JAVA)][ref_site_1]

<!-- 이미지 -->

[image_1_dark]: {{page.image-path}}/linkedlist_1_dark.png
[image_1_light]: {{page.image-path}}/linkedlist_1_light.png
[image_2_dark]: {{page.image-path}}/linkedlist_2_dark.png
[image_2_light]: {{page.image-path}}/linkedlist_2_light.png
[image_3_dark]: {{page.image-path}}/linkedlist_3_dark.png
[image_3_light]: {{page.image-path}}/linkedlist_3_light.png
[image_4_dark]: {{page.image-path}}/linkedlist_4_dark.png
[image_4_light]: {{page.image-path}}/linkedlist_4_light.png
[image_5_dark]: {{page.image-path}}/linkedlist_5_dark.png
[image_5_light]: {{page.image-path}}/linkedlist_5_light.png
[image_6_dark]: {{page.image-path}}/linkedlist_6_dark.png
[image_6_light]: {{page.image-path}}/linkedlist_6_light.png
[image_7_dark]: {{page.image-path}}/linkedlist_7_dark.png
[image_7_light]: {{page.image-path}}/linkedlist_7_light.png
[image_8_dark]: {{page.image-path}}/linkedlist_8_dark.png
[image_8_light]: {{page.image-path}}/linkedlist_8_light.png
[image_9_dark]: {{page.image-path}}/linkedlist_9_dark.png
[image_9_light]: {{page.image-path}}/linkedlist_9_light.png
[image_10_dark]: {{page.image-path}}/linkedlist_10_dark.png
[image_10_light]: {{page.image-path}}/linkedlist_10_light.png
[image_11_dark]: {{page.image-path}}/linkedlist_11_dark.png
[image_11_light]: {{page.image-path}}/linkedlist_11_light.png
[image_12_dark]: {{page.image-path}}/linkedlist_12_dark.png
[image_12_light]: {{page.image-path}}/linkedlist_12_light.png

<!-- 블로그 게시글 -->

[post-linkedlist]: {{site.url}}/posts/linkedlist-1

<!-- 참고 사이트 -->

[ref_site_1]: https://inpa.tistory.com/entry/DS-%F0%9F%A7%B1-Singly-LinkedList-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-Java%EB%A1%9C-%EC%8B%A4%EC%A0%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
