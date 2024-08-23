---
title: LinkedList (1) - LinkedList 구조
description: Java의 자료 구조 중 하나인 LinkedList 이해를 위한 정리
categories: [Computer Science, Data Structure]
tags: [computer-science, data-structure, linkedlist] # TAG names should always be lowercase
pin: false
math: true
mermaid: true
published: false
private: false # 커스텀해서 만든 것
image-path: /assets/img/computer-science/data-structure/linkedlist/linkedlist-1 # 이미지 공통 경로 변수
image:
  path: /assets/img/computer-science/data-structure/linkedlist/linkedlist.png
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Java's LinkedList
---

## LinkedList 컬렉션

자바의 LinkedList는 ArrayList와 같이 인덱스로 접근하여 조회 / 삽입이 가능하지만, 내부 구조는 완전히 다르게 구성되어 있다는 점이 특징이다.

> ArrayList 구조에 대한 자세한 설명에 대해서는 [#ArrayList 구조][post-arraylist] 게시글 참고

ArrayList는 내부적으로 배열을 이용하여 메서드로 이리저리 조작이 가능하게 만든 컬렉션이라면, LinkedList는 <ins>노드(객체)</ins>끼리의 <ins>주소 포인터</ins>를 서로 가리키며 <ins>링크(참조)</ins>함으로써 이어지는 구조이다.

![image_2_dark][image_2_dark]{: .dark}
![image_2_light][image_2_light]{: .light}

위의 이미지를 보면, LinkedList는 각각의 노드마다 화살표로 연결되어 리스트 형태로 나열되어 있는 것을 볼 수 있다.

여기서 노드는 하나의 객체라고 보면 된다.

즉, 객체를 만들면 객체의 주소가 생기는데, 노드마다 각 객체의 주소를 서로 참조함으로써 <ins>서로 연결되는 형태</ins>를 구성하는 것이다.

단일 노드에 대한 설명을 표현한다면 아래의 이미지와 같으며,

![image_3_dark][image_3_dark]{: .dark}
![image_3_light][image_3_light]{: .light}

위의 이미지를 코드로 표현한다면 다음과 같다.

```java
class Node {
  Node next; // 다음 노드 주소를 저장하는 필드
  int data; // 데이터르 저장하는 필드
};
```

### LinkedList의 종류

#### 단일 연결리스트 (Singly LinkedList)

![image_4_dark][image_4_dark]{: .dark}
![image_4_light][image_4_light]{: .light}

위의 설명에서 봤듯이, 다음 노드를 가리키기 위한 포인터 필드인 `next`만을 가지고 있는 LinkedList를 Singly LinkedList라고 한다.

하지만 단일 연결리스트는 현재 요소에서 이전 요소로 접근해야 할 때, 매우 부적합한 특징이 있다.

예를 들어, LinkedList에 저장된 데이터가 10000개라면 9999번 데이터에 접근하려면 Node를 9999번 이동해야 하기 때문이다.

이를 극복한 것이 다음에 나올 Doubly LinkedList 구조이다.

#### 이중 연결리스트 (Doubly LinkedList)

![image_5_dark][image_5_dark]{: .dark}
![image_5_light][image_5_light]{: .light}

```java
class Node {
  Node next; // 다음 노드 주소를 저장하는 필드
  Node prev; // 이전 노드 주소를 저장하는 필드
  int data; // 데이터를 저장하는 필드
};
```

기존의 단일 연결 노드 객체에서 이전 노드 주소를 담고 있는 필드인 `prev`가 추가된 형태를 Doubly LinkedList라도 부른다.

Singly LinkedList는 이동 방향이 단일 방향이기 때문에 이를 보완하여 역순으로도 검색이 가능하도록 한 것이다.

따라서 Doubly LinkedList는 Singly LinkedList보다 각 요소에 대한 접근과 이동이 쉽기 때문에 기본적으로 많이 사용한다.

![image_6_dark][image_6_dark]{: .dark}
![image_6_light][image_6_light]{: .light}

{: .prompt-info}

> 실제로 Java의 컬렉션 프레임워크에 구현된 LinkedList 클래스는 이중 연결리스트로 구현되어 있다.

#### 단일 원형 연결리스트 (Singly Circular LinkedList)

![image_7_dark][image_7_dark]{: .dark}
![image_7_light][image_7_light]{: .light}

단일 연결리스트에서의 접근성을 개선하기 위한 Singly Circular LinkedList도 존재한다.

단일 원형 연결리스트는 첫 번째 노드와 마지막 노드를 단일 방향으로 연결시켜서 순환되는 구조로 만든 리스트이다.

하지만 단일 방향이기 때문에 각 요소에 대한 접근이 여전히 한정적일 수 밖에 없으며, 잘 쓰이지 않는다.

다음에 나올 연결리스트는 이러한 점을 보완한 이중 원형 연결리스트이다.

#### 이중 원형 연결리스트 (Doubly Circular LinkedList)

![image_8_dark][image_8_dark]{: .dark}
![image_8_light][image_8_light]{: .light}

추가적으로 이중 연결리스트와 단일 원형 연결리스트를 조합하여 보다 접근성이 더욱 개선된 것이 Doubly Circular LinkedList이다.

이 역시 단일 원형 연결리스트와 같은 원리이며, 단일 원형 연결리스트와는 다르게 이중 구조로 원형이 연결되어 있다.

이러한 구조는 TV 채널을 순회하거나, 오디오 플레이어와 같이 데이터를 순차적 방식으로 처리하다가 마지막 요소를 만나면 다시 처음 요소로 돌아가면서, 전후로 마음대로 채널을 옮길 수 있는 애플리케이션에서 사용된다고 보면 된다.

### LinkedList VS ArrayList

<table>
  <tr>
    <th scope="col" style='text-align: center;'></th>
    <th scope="col" style='text-align: center;'>ArrayList</th>
    <th scope="col" style='text-align: center;'>LinkedList</th>
  </tr>

  <tr>
    <th scope="row" style="padding: 10px;">컬렉션 구성</th>
    <td style='text-align: center;'>
      배열을 이용
    </td>
    <td style='text-align: center;'>
      노드를 연결(linked)
    </td>
  </tr>

  <tr>
    <th scope="row" style="padding: 10px;">데이터 접근 시간</th>
    <td style='text-align: center;'>
      모든 데이터 상수 시간 접근
    </td>
    <td style='text-align: center;'>
      위치에 따라 이동 시간 발생
    </td>
  </tr>

  <tr>
    <th scope="row" rowspan="2" style="padding: 10px;">삽입 / 삭제 시간</th>
    <td colspan="2" style='text-align: center;'>
      삽입/삭제 자체는 상수 시간
    </td>
  </tr>

  <tr>
    <td style='text-align: center;'>
      삽입/삭제 시 데이터 이동이 필요한 경우,<br/>추가 시간 발생
    </td>
    <td style='text-align: center;'>
      삽입/삭제 위치에 따라 그 위치까지<br/> 이동하는 시간 발생
    </td>
  </tr>

  <tr>
    <th scope="row" style="padding: 10px;">리사이징 필요</th>
    <td style='text-align: center;'>
      공간이 부족할 경우,<br/>새로운 배열에 복사하는 추가 시간 발생
    </td>
    <td style='text-align: center;'>
      -
    </td>
  </tr>

  <tr>
    <th scope="row" style="padding: 10px;">데이터 검색</th>
    <td colspan="2" style='text-align: center;'>
      최악의 경우, 리스트에 있는 아이템 수 만큼 확인
    </td>
  </tr>

  <tr>
    <th scope="row" style="padding: 10px;">CPU Cache</th>
    <td style='text-align: center;'>
      캐시 이점을 활용
    </td>
    <td style='text-align: center;'>
      -
    </td>
  </tr>
</table>

> 추가적인 ArrayList와 LinkedList의 비교에 대해서는 [#ArrayList vs LinkedList][post-arraylist-vs-linkedlist] 게시글을 참고

## LinkedList 사용법

LinkedList 클래스 역시 List 인터페이스를 구현하므로, ArrayList 클래스와 사용할 수 있는 메소드가 거의 같다.

다만 LinkedList는 List 자료 구조 외에도 [#Stack][post-stack]이나 [#Queue][post-queue] 자료 주고로서도 이용이 가능하기 때문ㅁ에, 이를 위한 메서드들도 구현되어 있어 내부 메서드 개수가 컬렉션 중에서 가장 많다고 보면 된다.

### LinkedList 객체 생성

LinkedList를 사용하기 위해서는 상단에 패키지를 명시해서 가져와야 한다.

```java
import java.util.LinkedList;
```

- `LinkedList()`
  : - LinkedList 객체를 생성
- `LinkedList(Collection c)`
  : - 주어진 컬렉션을 포함하는 LinkedList 객체를 생성

```java
// int 타입만 적재 가능하도록 타입 설정
LinkedList<Integer> list = new LinkedList<>();

// 생성 시, 초기 값 설정
LinkedList<Integer> list2 = new LinkedList<Integer>(Arrays.asList(1, 2));
```

LinkedList의 선언은 ArrayList와 동일하지만, ArrayList처럼 초기 값을 미치 지정하는 기능은 제공되지 않는다.

내부 데이터 집합 구조가 배열처럼 미리 공간을 할당하고 사용하는 방식이 아니라 데이터가 추가될 때마다 노드(객체)들이 생성되어 동적으로 추가되는 방식이기 때문이다.

### LinkedList 요소 추가 / 삽입

ArrayList와 달리 LinkedList에는 `add` 메서드 종류가 4가지이다.

기본 `add()` 메서드는 `addLast()`와 동일하다.

- `void addFirst(Object obj)`  
  : - LinkedList의 맨 앞에 객체(`obj`)를 추가한다.
- `void addLast(Object obj)`  
  : - LinkedList의 맨 뒤에 객체(`obj`)를 추가한다.
- `boolean add(Object obj)`  
  : - 추가에 성공하면 `true`를 반환한다.
- `void add(int index, Object element)`
  : - 지정된 위치(index)에 객체를 저장한다.
- `void addAll(Collection c)`
  : - 주어진 컬렉션의 모든 객체를 마지막에 저장한다.
- `void addAll(int index, Collection c)`
  : - 지정한 위치부터 주어진 컬렉션의 데이터를 저장한다.

{: .prompt-info}

> `addFirst()`와 `addLast()`는 요소를 첫 번째, 마지막에 추가하는 것이기 때문에 $O(1)$의 시간이 걸린다.
>
> 그러나 중간 삽입일 경우에는 중간에 삽입할 위치까지의 탐색이 필요하기 때문에 $O(n)$의 시간이 걸린다.

#### 가장 앞에 데이터 추가

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

list.addFirst("New");
```

![image_9_dark][image_9_dark]{: .dark}
![image_9_light][image_9_light]{: .light}

#### 가장 뒤에 데이터 추가

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

list.addLast("New");
```

![image_10_dark][image_10_dark]{: .dark}
![image_10_light][image_10_light]{: .light}

#### 지정한 위치에 데이터 추가

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

// index 1에 중간 위치에 New 데이터 추가
list.add(1, "New");
```

![image_11_dark][image_11_dark]{: .dark}
![image_11_light][image_11_light]{: .light}

### LinkedList 요소 삭제

`remove` 메서드 역시 `add` 메서드와 같이 `removeFirst()`와 `removeLast()`는 $O(1)$, 그 외에는 탐색 시간이 필요하기 떄문에 $O(n)$의 시간이 걸린다.

만일, 값을 전부 제거하려면 `clear()` 메서드를 사용하면 된다.

#### 가장 앞의 데이터 삭제

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

list.removeFirst();
```

![image_12_dark][image_12_dark]{: .dark}
![image_12_light][image_12_light]{: .light}

#### 가장 뒤의 데이터 삭제

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

list.removeLast();
```

![image_13_dark][image_13_dark]{: .dark}
![image_13_light][image_13_light]{: .light}

#### 지정한 위치의 데이터 삭제

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

list.remove(1);
```

![image_14_dark][image_14_dark]{: .dark}
![image_14_light][image_14_light]{: .light}

#### 모든 데이터 삭제

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

list.clear();
```

### LinkedList 요소 검색

리스트에서 요소가 존쟈하는지에 대해 검색하는 방법은 요소 자체가 리스트에 있는지 검사하는 `contains()` 메서드와 인덱스 위치도 반환해주는 `indexOf()` 메서드가 존재한다.

- `int size()`
  : - LinkedList에 저장된 객체의 개수를 반환한다.
- `boolean isEmpty`
  : - LinkedList가 비어있는지 확인한다.
- `boolean contains(Object obj)`
  : - 지정된 객체(`obj`)가 LinkedList에 포함되어 있는지 확인한다.
- `boolean containsAll(Collection c)`
  : - 지정된 컬렉션의 모든 요소가 포함되었는지를 알려준다.
- `int indexOf(Object obj)`
  : - 지정된 객체(`obj`)가 저장된 위치를 찾아 반환한다.
- `int lastIndexOf(Object obj)`
  : - 지정된 객체(`obj`)가 저장된 위치를 뒤에서부터 역방향으로 찾아 반환한다.

{: file="indexOf"}

```java
LinkedList<String> list = new LinkedList<>(Arrays.asList("A", "B", "C"));

// 해당 값을 가지고 있는 요소 위치를 반환 (앞에서부터 검색)
list.indexOf("B"); // 1

// 해당 값을 가지고 있는 요소 위치를 반환 (뒤에서부터 검색)
list.lastIndexOf("D"); // -1 (값이 없다면 -1)
```

{: file="contains"}

```java
LinkedList<String> list1 = new LinkedList<>();
list1.add("1");
list1.add("2");

// list1 안에 "1" 값이 있는지 확인
list1.contains("1"); // true

LinkedList<String> list2 = new LinkedList<>();
list2.add("1");
list2.add("2");

// list1 안에 list2의 모든 노드가 포함되어 있는지 확인
list1.contains(list2); // true
```

### LinkedList 요소 얻기

개별 단일 요소를 얻고자 한다면 `get` 메서드로 가져올 수 있다.

단, LinkedList는 ArrayList와 달리 만일 100번째 노드까지 참조를 따라서 일일이 이동해야 하기 때문에 탐색 성능은 좋지 않은 편이다.

- `Object get(int index)`
  : - 지정된 위치(index)에 저장된 객체를 반환한다.
- `List subList(int fromIndex, int toIndex)`
  : - `fromIndex`부터 `toIndex` 사이에 저장된 객체를 List로 반환한다.

```java
list.get(0);
// 0번째 index 요소의 값을 출력
```

### LinkedList 요소 변경

`set` 메서드의 주의점은 아무리 LinkedList라고 하더라도 기본적으로 리스트이기 때문에 리스트의 크기(Size)를 넘기는 인덱스를 할당하게 된다면, 배열과 같이 `IndexOutOfBoundsException` 예외가 발생한다.

- `Object set(int index, Object obj)`
  : - 지정한 위치(index)의 객체를 주어진 객체로 바꾼다.

```java
LinkedList<String> list = new LinkedList<>();

list.add("10");
list.add("20");
list.add("30");

list.set(1, "A"); // index 1번 데이터를 "A"로 변경

System.out.println(list);
// [10, A, 30]
```

### LinkedList 배열 반환

LinkedList는 배열은 아니지만 리스트 컬렉션이기 때문에 연속된 값으로서 배열로 변환이 가능하다.

- `Object[] toArray()`
  : - LinkedList에 저장된 모든 객체들을 객체 배열로 반환한다.
- `Object[] toArray(Object[] objArr)`
  : - LinkedList에 저장된 모든 객체들을 객체 배열 `objArr`에 담아 반환한다.

```java
LinkedList<Number> list = new LinkedList<>();

list.add(1);
list.add(2);
list.add(3);
list.add(4);

Number[] arr1 = new Number[list2.size()];

Number[] arr2 = (Number[]) list2.toArray(arr1);

System.out.println(Arrays.toString(arr2));
// [1, 2, 3, 4]
```

```java
LinkedList<Number> list1 = new LinkedList<>();

list1.add(1);
list1.add(2);

Number[] tmp = {0, 1, 2, 3, 4, 5}; // 통째로 추가할 배열

Number[] arr = (Number[]) list1.toArray(tmp);

System.out.println(Arrays.toString(arr));
// [1, 2, null, 3, 4, 5]
```

{: .prompt-tip}

> `toArray(Object[] objArr)` 메서드의 결과값 배열 출력에서 `null`이 삽입되어 있는 이유는 자바 메서드 스펙이다.
>
> javadoc에 따르면 삽입된 리스트의 길이를 알리기 위해서 일부러 `null`을 넣는다고 한다.

### LinkedList 순회 (Iterator)

보통 ArrayList의 요소들을 순회할 일이 있다면 다음과 같이 `for`문으로 처리하는 것이 일반적일 것이다.

```java
LinkedList<String> list = new LinkedList<>();

// for문을 이용한 순회
for(String data: list) {
  System.out.println(data);
};
```

#### LinkedList Iterator

다만 몇몇 컬렉션에서는 저장된 요소를 Iterator 인터페이스로 읽어오도록 하는 순회 패턴을 지향하기도 한다.

- `Iterator iterator()`
  : - LinkedList의 Iterator 객체를 반환한다.
- `ListIterator listIterator()`
  : - LinkedList의 ListIterator를 반환한다.
- `ListIterator listIterator(int index)`
  : - LinkedList의 지정된 위치부터 시작하는 ListIterator를 반환한다.

Collection 인터페이스에서는 <ins>Iterator 인터페이스를 구현한 클래스의 인스턴스</ins>를 반환하는 `iterator()` 메서드를 정의하여 각 요소에 접근하도록 정의하고 있다.

따라서 Collection 인터페이스를 상속받는 `List`나 `Set` 인터페이스에서도 `iterator()` 메서드를 사용할 수 있다.

{: .prompt-warning}

> 여기서 `Map`은 해당되지 않는다.

```java
Iterator it = list.iterator();

while(it.hasNext()) {
  Object obj = it.next();
  System.out.println(obj);
}
```

또한, LinkedList 메서드를 보면 Iterator 뿐만 아니라 <ins>ListIterator</ins>도 지원하는 것을 볼 수 있는데, Iterator는 Collection 인터페이스를 구현한 컬렉션에서 모두 사용할 수 있는 반면, ListIterator는 오로지 List 컬렉션에서만 사용이 가능하다.

ListIterator 인터페이스는 Iterator 인터페이스를 상속받아 여러 기능을 추가한 인터페이스로서, Iterator는 컬렉션의 요소에 접근할 때 단방향으로만 이동할 수 있는 반면, ListIterator 인터페이스는 컬렉션 요소의 대체, 추가 그리고 인덱스 검색 등을 위한 작업에서 <ins>양방향으로 이동하는 것을 지원</ins>하기 때문에 더욱 쓰임새가 넓다.

```java
ListIterator it = list.listIterator(); // LinkedList의 ListIterator를 반환

while(it.hasNext()) {
  System.out.print(it.next());
}

while(it.hasPrevious()) {
  System.out.print(it.previous());
}
```

### LinkedList 스택 & 큐 지원

LinkedList는 리스트 용도로서 뿐만 아니라, 구조 특성 상 Stack이나 Queue로서도 이용이 가능하다.

그래서 아래와 같이 스택과 큐에 관한 전용 메서드를 별도로 제공한다.

- `Object element()`
  : - LinkedList에 첫 번째 노드를 반환한다.
- `boolean offer(Object obj)`
  : - 지정된 객체(`obj`)를 LinkedList의 끝에 추가한다.
  : - 성공하면 `true` / 실패하면 `false`
- `Object peek()`
  : - LinkedList의 첫 번째 요소를 반환한다.
- `Object poll()`
  : - LinkedList의 첫 번째 요소를 반환한다.
  : - LinkedList의 요소에서는 제거된다.
- `void push(Object obj)`
  : - 맨 앞에 객체(`obj`)를 추가한다.
  : - `addFirst()`와 동일
- `Iterator descendingIterator()`
  : - 역순으로 조회하기 위한 `DescendingIterator`를 반환한다.
- `Object getFirst()`
  : - LinkedList의 첫 번째 노드를 반환한다.
- `Object getLast()`
  : - LinkedList의 마지막 노드를 반환한다.
- `boolean offerFirst(Object obj)`
  : - 지정된 객체(`obj`)를 LinkedList의 맨 앞에 추가한다.
  : - 성공하면 `true`
- `boolean offerLast(Object obj)`
  : - 지정된 객체(`obj`)를 LinkedList의 맨 뒤에 추가한다.
  : - 성공하면 `true`
- `Object peakFirst()`
  : - 첫 번째 노드를 반환한다.
- `Object peakLast()`
  : - 마지막 노드를 반환한다.
- `Object pollFirst()`
  : - 첫 번째 노드를 반환한다.
  : - 반환된 노드는 LinkedList에서 제거된다.
- `Object pollLast()`
  : - 마지막 노드를 반환한다.
  : - 반환된 노드는 LinkedList에서 제거된다.
- `Object pop()`
  : - 첫 번째 노드를 제거한다.
  ㅣ - `removeFirst()`와 동일
- `boolean removeFirstOccurrence(Object obj)`
  : - 첫 번째로 일치하는 객체를 제거한다.
- `boolean removeLastOccurrence(Object obj)`
  : - 마지막으로 일치하는 객체를 제거한다.

### LinkedList 동기화 처리

멀티 쓰레드 환경에서 동시에 컬렉션에 접근해 문제가 발생하는 것을 방지하기 위해 동기화 처리된 리스트를 반환받아 사용할 수 있다.

```java
// ArrayList 동기화 처리
List<String> arrList = Collections.synchronizedList(new ArrayList<>());

// LinkedList 동기화 처리
List<String> linkedList = Collections.synchronizedList(new LinkedList<>());
```

## 참고 사이트

> [Inpa Dev - 🧱 자바 LinkedList 구조 & 사용법 - 정복하기][ref_site_1]

<!-- 이미지 -->

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

<!-- 블로그 게시글 -->

[post-arraylist]: {{site.url}}/posts/arraylist
[post-arraylist-vs-linkedlist]: {{site.url}}/posts/arraylist-vs-linkedlist
[post-stack]: {{site.url}}/posts/stack-queue/#stack-lifo
[post-queue]: {{site.url}}/posts/stack-queue/#queue-lifo

<!-- 참고 사이트 -->

[ref_site_1]: https://inpa.tistory.com/entry/JAVA-%E2%98%95-LinkedList-%EA%B5%AC%EC%A1%B0-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%B3%B5%ED%95%98%EA%B8%B0
