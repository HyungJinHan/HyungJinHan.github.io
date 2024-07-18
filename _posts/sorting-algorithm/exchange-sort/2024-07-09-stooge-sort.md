---
title: 꼭두각시 정렬 (Stooge Sort)
description: 정렬 알고리즘의 교환 정렬의 꼭두각시 정렬에 대한 정리
categories: [Sorting Algorithm, Exchange Sort]
tags: [sorting-algorithm, stooge-sort] # TAG names should always be lowercase
math: true
image:
  path: /assets/img/sort/gif/stooge_sort.gif
  alt: Stooge Sort Animation
---

> [정렬 알고리즘 위키](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

## 복잡도

- 최악 시간복잡도

  - $O(n$<sup>$log \ 3 / log \ 1.5$</sup>$)$

- 공간복잡도

  - $O(n)$

## 구현 코드

{: file='number_array.ts'}

```ts
export const arr = [
  14, 17, 12, 20, 1, 5, 9, 7, 3, 8, 6, 2, 4, 10, 11, 16, 15, 19, 18, 13,
];
```

```ts
import { arr } from "./number_array";

let count = 0;

const swap = (arr: number[], i: number, j: number): void => {
  let temp: number = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const stoogeSort = (arr: number[], i?: number, j?: number): void => {
  if (!i) {
    i = 0;
  }

  if (!j) {
    j = arr.length - 1;
  }

  if (arr[j] < arr[i]) {
    swap(arr, i, j);
  }

  if (j - i > 1) {
    var t = Math.floor((j - i + 1) / 3);
    stoogeSort(arr, i, j - t);
    stoogeSort(arr, i + t, j);
    stoogeSort(arr, i, j - t);
  }

  count++;
  console.log(arr.toString(), `→ [${count}회]`);
};

stoogeSort(arr);
```
