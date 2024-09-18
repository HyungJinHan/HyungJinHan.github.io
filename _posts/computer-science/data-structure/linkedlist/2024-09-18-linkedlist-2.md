---
title: LinkedList (2) - 단일 연결리스트 구현 (Java)
description: Java의 자료 구조 중 하나인 LinkedList의 단일 연결리스트를 Java로 직접 구현
categories: [Computer Science, Data Structure]
tags: [computer-science, data-structure, linkedlist, singly-linkedlist] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: true
private: true # 커스텀해서 만든 것
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

이전에 게시한 [#ArrayList (2) - ArrayList 구현 (Java)][post-arraylist-2]의 ArrayList 구현의 경우, 오브젝트 배열(`Object[]`)을 사용하여 데이터를 담아두었다면, LinkedList는 여러 노드 객체들을 내부적인 처리로 체인(Chain)처럼 연결한다.

```java
public class MySinglyLinkedList<E> {
  // ...

  // inner static class
  private static class Node<E> {
    private E item; // Node에 담을 데이터
    private Node<E> next; // 다음 Node 객체를 가르키는 레퍼런스

    // 생성자
    Node(E item, Node<E> next) {
      this.item = item;
      this.next = next;
    }
  }
}
```

위의 코드에서 눈여겨 봐야할 점은 세 가지이다.

1. 왜 클래스 안에다가 클래스를 선언하였는가?
2. 왜 `private` 접근 지시자인가?
3. 왜 `static`이 붙었는가?

물론, `Node` 클래스를 `MySinglyLinkedList` 클래스 밖에서 선언해도 문제는 없다.

다만, `Node` 클래스는 오로지 `MySinglyLinkedList` 클래스에서만 이용되며, 다른 클래스에서는 전혀 사용되지 않는다.

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

그리고 `private` 접근 제어자의 경우, 객체가 외부로 노출되면 보안 상의 문제가 발생할 수 있기 때문에 오로지 `MySinglyLinkedList` 메소드로만 제어가 가능하도록 하기 위해 설정되었다.

마지막으로 내부 클래스를 `static`으로 선언한 이유는 메모리 누수(Memory Leak)[^memory-leak] 이슈 때문이다.

### search 구현하기

`add`와 `remove`를 구현하기에 앞서, ㅉ따로 내부 메소드 용으로 `search()`를 구현하고자 한다.

`add`와 `remove`를 구현하기 위해서는 우선 <ins>추가/삭제할 요소 탐색이 우선</ins>이 되기 때문에, 반복적으로 재사용되어 별도의 메소드로 구현한다.

{: .prompt-info}

> LinkedList의 검색의 경우, 인덱스가 없기 때문에 랜덤 엑세스를 할 수 없다.
>
> 따라서 $n$개의 노드를 가지고 있는 노드를 검색할 때 시간 복잡도는 $O(n)$이 된다.

```java
private Node<E> search(int index) {
  // head(처음 위치)에서부터 차례로 index까지 검색
  Node<E> n = head;

  for (int i = 0; i < index; i++) {
    n = n.next; // next 필드의 값(다음 노드 주소)를 재대입하면서 순차적으로 요소를 탐색
  }

  return n;
}
```

이때, 반복문 범위를 `index`까지 탐색이 아닌 <ins>`index` 전까지만의 탐색(`i < index`)</ins>되어야 하는데, 그 이유는 노드의 `next` 필드 자체가 그 다음 노드를 가리키기 때문이다.

### add 구현하기

Java의 LinkedList 클래스의 `add`의 종류를 보면 아래와 같이 4가지가 존재한다.

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
// add
public void addFirst(E value) {
  // 1. 먼저 가장 앞의 요소를 가져옴
  Node<E> first = head;

  // 2. 새 노드 생성
  // 이때 데이터와 next 포인트를 준다.
  Node<E> newNode = new Node<>(value, first);

  // 3. 요소가 추가되었으니 size를 늘린다.
  size++;

  // 4. 맨 앞에 요소가 추가되었으니 head를 업데이트한다.
  head = newNode;

  // 5. 만일 최초로 요소가 add 된 것이면, head와 tail이 가리키는 요소는 같게 된다.
  if (first == null) {
    tail = newNode;
  }
}
```

LinkedList에 요소가 첫 번째에 추가되는 과정을 이미지로 표현하자면 아래와 같다.

1. `head`의 값(@100번지 객체)을 `first` 변수에 백업

   ![image_4_dark][image_4_dark]{: .dark}
   ![image_4_light][image_4_light]{: .light}

2. 새 노드를 추가하면서 요소 값과 `tmp` 값(@100)을 넣어 초기화 및 다음 요소로 연결

   ![image_5_dark][image_5_dark]{: .dark}
   ![image_5_light][image_5_light]{: .light}

3. `head`가 새 노드를 바라보도록 업데이트 (@100 → @105)

   ![image_6_dark][image_6_dark]{: .dark}
   ![image_6_light][image_6_light]{: .light}

만약에 <ins>최초의 요소를 추가</ins>하는 것이라면, 아래와 같이 `head`와 `tail`이 하나의 객체를 바라보도록 설정해야 한다.

1. `head`가 `null`일 경우

   ![image_7_dark][image_7_dark]{: .dark .w-50 .normal }
   ![image_7_light][image_7_light]{: .light .w-50 .normal }

2. `head`와 `tail`이 최초로 추가된 새 노드를 바라보도록 업데이트

   |![image_8_dark][image_8_dark]{: .dark }![image_8_light][image_8_light]{: .light }|![image_9_dark][image_9_dark]{: .dark }![image_9_light][image_9_light]{: .light }|

#### addLast 구현

```java
public void addLast(E value) {
  // 1. 먼저 가장 뒤의 요소를 가져옴
  Node<E> last = tail;

  // 2. 새 노드 생성
  // 맨 마지막 요소 추가이기에 next는 null
  Node<E> newNode = new Node<>(value, null);

  // 3. 요소가 추가되었으니 size를 늘린다.
  size++;

  // 4. 맨 뒤에 요소가 추가되었으니 tail을 업데이트
  tail = newNode;

  if (last == null) {
    // 5. 만일 최초로 요소가 add 된 것이면 head와 tail이 가리키는 요소는 같게 된다.
    head = newNode;
  } else {
    // 6. 최초 추가가 아니라면 last 변수(추가되기 전 마지막이었던 요소)에서 추가된 새 노드를 가리키도록 업데이트
    last.next = newNode;
  }
}
```

LinkedList에 요소가 마지막에 추가되는 과정을 이미지로 표현하자면 아래와 같다.

1. `last` 변수에 현재 마지막 요소(@300)를 백업

   ![image_10_dark][image_10_dark]{: .dark}
   ![image_10_light][image_10_light]{: .light}

2. 새 노드를 추가하고 `tail`을 업데이트

   ![image_11_dark][image_11_dark]{: .dark}
   ![image_11_light][image_11_light]{: .light}

3. 요소가 추가되기 이전의 요소(`last` 변수)에서 `next`를 업데이트 (`null`→ @400)

   ![image_12_dark][image_12_dark]{: .dark}
   ![image_12_light][image_12_light]{: .light}

#### add 구현

`add()`의 동작은 `addList()`와 같으며, 실제로 LinkedList API를 보면 `add` 메소드를 호출하면 `addLast()`를 호출한다.

```java
public boolean add(E value) {
  addLast(value);
  return true;
}
```

#### add 중간 삽입 구현

1. 리스트 중간에 삽입하기 위해서는 가장 먼저 인덱스 범위를 체크해야 한다.
2. 인덱스가 처음과 끝이면 위에서 구현한 `addFirst`, `addLast`를 재활용하면 된다.
3. 추가하려는 위치를 구하기 위해 위에서 구현한 `search` 메서드를 이용한다.
4. 이전 노드(`prev_node`)와 다음 노드(`next_node`) 참조 값을 변수에 백업하는 것이 포인트이다.
5. `prev_node`의 `next`는 `new_node`에 연결, `new_node`는 `next_node`에 연결시키도록 함으로써 삽입이 완료된다.

```java
public void add(int index, E value) {
  // 1. 인덱스가 0보다 작거나 size보다 같거나 클 경우 에러
  if (index < 0 || index >= size) {
    throw new IndexOutOfBoundsException();
  }

  // 2. 추가하려는 index가 0이면, addFirst 호출
  if (index == 0) {
    addFirst(value);
    return;
  }

  // 3. 추가하려는 index가 size - 1과 같으면, addLast 호출
  if (index == size) {
    addLast(value);
    return;
  }

  // 4. 추가하려는 위치의 이전 노드 얻기
  Node<E> prev_node = search(index - 1);

  // 5. 추가하려는 위치의 다음 노드 얻기
  Node<E> next_node = prev_node.next;

  // 6. 새 노드 생성 (바로 다음 노드와 연결)
  Node<E> newNode = new Node<>(value, next_node);

  // 7. size 증가
  size++;

  // 8. 이전 노드를 새 노드와 연결
  prev_node.next = newNode;
}
```

만약에 `index`가 1인 위치(@200번지)에 노드를 삽입한다고 가정한다면, `add` 중간 삽입 과정은 아래와 같다.

1. 추가하려는 위치의 이전 노드(`prev_node`)와 다음 노드(`next_node`)를 임시 저장

   ![image_13_dark][image_13_dark]{: .dark}
   ![image_13_light][image_13_light]{: .light}

2. 새 노드 생성 (생성하며 다음 노드에 연결)

   ![image_14_dark][image_14_dark]{: .dark}
   ![image_14_light][image_14_light]{: .light}

3. 이전 노드의 참조를 추가된 새 노드에 연결 (@200 → @150)

   ![image_15_dark][image_15_dark]{: .dark}
   ![image_15_light][image_15_light]{: .light}

### remove 구현하기

⚠️ 추가적으로 작성 예정

<!-- ### get 구현하기

### set 구현하기

### toString 구현하기

## 단일 연결리스트 구현 전체 코드 -->

## 참고 사이트

> [Inpa Dev - 🛠️ Singly LinkedList 실전 구현 강의 (JAVA)][ref_site_1]

---

[^memory-leak]: 자바에서의 메모리 누수(Memory Leak)이란, 더 이상 사용되지 않는 객체들이 가비지 컬렉터에 의해 회수되지 않고 계속 누적되는 현상을 말하며, Old 영역에 계속 누적된 개게로 인해 Major GC가 빈번하게 발생하게 되면서, 프로그램 응답속도가 늦어지면서 성능 저하를 일으키며 결국 `OutOfMemory Error`로 프로그램이 종료된다.

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
[image_13_dark]: {{page.image-path}}/linkedlist_13_dark.png
[image_13_light]: {{page.image-path}}/linkedlist_13_light.png
[image_14_dark]: {{page.image-path}}/linkedlist_14_dark.png
[image_14_light]: {{page.image-path}}/linkedlist_14_light.png
[image_15_dark]: {{page.image-path}}/linkedlist_15_dark.png
[image_15_light]: {{page.image-path}}/linkedlist_15_light.png

<!-- 블로그 게시글 -->

[post-linkedlist]: {{site.url}}/posts/linkedlist-1
[post-arraylist-2]: {{site.url}}/posts/arraylist-2

<!-- 참고 사이트 -->

[ref_site_1]: https://inpa.tistory.com/entry/DS-%F0%9F%A7%B1-Singly-LinkedList-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-Java%EB%A1%9C-%EC%8B%A4%EC%A0%84-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0
