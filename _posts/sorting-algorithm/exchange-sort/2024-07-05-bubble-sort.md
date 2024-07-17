---
# title: TITLE
# date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [Sorting Algorithm, Exchange Sort]
tags: [sorting-algorithm, bubble-sort] # TAG names should always be lowercase
math: true
---

> [정렬 알고리즘 위키](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

## 버블 정렬

|![bubble_sort](/assets/img/sort/img/bubble_sort.svg){: width='100%'}|![bubble_sort](/assets/img/sort/gif/bubble_sort.gif){: width='100%'}|

## 복잡도

- 최악 시간복잡도

  - $O(n^2)$ 비교, $O(n^2)$ 교환

- 최선 시간복잡도

  - $O(n)$ 비교, $O(1)$ 교환

- 평균 시간복잡도

  - $O(n^2)$ 비교, $O(n^2)$ 교환

- 공간복잡도

  - $O(1)$ 보조

## 구현 코드

{: file='number_array.ts'}

```ts
export const arr = [
  14, 17, 12, 20, 1, 5, 9, 7, 3, 8, 6, 2, 4, 10, 11, 16, 15, 19, 18, 13,
];
```

```ts
import { arr } from "./number_array";

class bubbleSort {
  public static main(arr: number[]): void {
    let temp = 0;

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i; j++) {
        if (arr[j] < arr[j - 1]) {
          temp = arr[j - 1];
          arr[j - 1] = arr[j];
          arr[j] = temp;
        }
      }

      console.log(arr.toString(), `→ [${i}회]`);
    }
  }
}

bubbleSort.main(arr);
```
