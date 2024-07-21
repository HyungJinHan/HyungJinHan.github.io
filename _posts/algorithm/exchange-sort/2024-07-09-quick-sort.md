---
title: 퀵 정렬 (Quick Sort)
description: 정렬 알고리즘의 교환 정렬의 퀵 정렬에 대한 정리
categories: [Algorithm, Exchange Sort]
tags: [exchange-sort, quick-sort] # TAG names should always be lowercase
math: true
image:
  path: /assets/img/sort/gif/quick_sort.gif
  lqip: data:image/webp;base64,UklGRpoAAABXRUJQVlA4WAoAAAAQAAAADwAABwAAQUxQSDIAAAARL0AmbZurmr57yyIiqE8oiG0bejIYEQTgqiDA9vqnsUSI6H+oAERp2HZ65qP/VIAWAFZQOCBCAAAA8AEAnQEqEAAIAAVAfCWkAALp8sF8rgRgAP7o9FDvMCkMde9PK7euH5M1m6VWoDXf2FkP3BqV0ZYbO6NA/VFIAAAA
  alt: Quick Sort Animation
---

> [정렬 알고리즘 위키](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

## 복잡도

- 최악 시간복잡도

  - $O(n^2)$

- 최선 시간복잡도

  - $O(n \ log(n))$

- 평균 시간복잡도

  - $O(n \ log(n))$

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

const quickSort = (arr: number[], left: number, right: number): number[] => {
  if (left < right) {
    let i: number = position(arr, left, right);
    quickSort(arr, left, i - 1);
    quickSort(arr, i + 1, right);
  }

  return arr;
};

const position = (arr: number[], left: number, right: number) => {
  let i = left,
    j = right,
    pivot = arr[left],
    count: number = 0;

  // 제자리 더 큰 수 / 더 작은 수 좌우 배치
  while (i < j) {
    while (arr[j] > pivot) j--;
    while (i < j && arr[i] <= pivot) i++;

    swap(arr, i, j);
  }

  arr[left] = arr[j];
  arr[j] = pivot;

  // console.log(arr.toString(), `→ [${count}회]`);

  return j;
};

const swap = (arr: number[], i: number, j: number): void => {
  let temp: number = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

console.log(quickSort(arr, 0, arr.length - 1).toString());
```
