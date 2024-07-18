---
title: 칵테일 정렬 (Shaker Sort)
description: 정렬 알고리즘의 교환 정렬의 칵테일 정렬에 대한 정리
categories: [Sorting Algorithm, Exchange Sort]
tags: [sorting-algorithm, shaker-sort] # TAG names should always be lowercase
math: true
image:
  path: /assets/img/sort/gif/shaker_sort.gif
  alt: Shaker Sort Animation
---

> [정렬 알고리즘 위키](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

## 복잡도

- 최악 시간복잡도

  - $O(n^2)$

- 최선 시간복잡도

  - $O(n)$

- 평균 시간복잡도

  - $O(n^2)$

- 공간복잡도

  - $O(1)$

## 구현 코드

{: file='number_array.ts'}

```ts
export const arr = [
  14, 17, 12, 20, 1, 5, 9, 7, 3, 8, 6, 2, 4, 10, 11, 16, 15, 19, 18, 13,
];
```

```ts
import { arr } from "./number_array";

class combSort {
  public static main(arr: number[]): void {
    let i: number,
      gap: number,
      size: number,
      count: number = 0,
      temp: number = 0,
      sorted: boolean = true;

    gap = size = arr.length;

    while (gap !== 1 || sorted) {
      gap /= 1.3;

      if (gap < 1) gap = 1;

      sorted = false;

      for (i = 0; i < size - gap; i++) {
        if (arr[i] > arr[i + gap]) {
          temp = arr[i];
          arr[i] = arr[i + gap];
          arr[i + gap] = temp;
          sorted = true;
        }
      }
      count++;
      console.log(arr.toString(), `→ [${count}회]`);
    }
  }
}

combSort.main(arr);
```
