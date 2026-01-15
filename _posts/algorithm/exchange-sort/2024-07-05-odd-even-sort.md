---
title: 홀짝 정렬 (Odd-Even Sort)
description: 정렬 알고리즘의 교환 정렬의 홀짝 정렬에 대한 정리
categories: [Algorithm, Exchange Sort]
tags: [exchange-sort, odd-even-sort] # TAG names should always be lowercase
math: true
image:
  path: /assets/img/algorithm/sort/gif/odd_even_sort.gif
  lqip: data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
  alt: Odd-Even Sort Animation
---

> [정렬 알고리즘 위키](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

## 복잡도

- 최악 시간복잡도

  - $O(n^2)$

- 최선 시간복잡도

  - $O(n)$

- 평균 시간복잡도

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

class oddEvenSort {
  public static main(arr: number[]): void {
    let sorted = false,
      count: number = 0;

    const swap = (arr: number[], i: number, j: number): void => {
      let temp: number = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    };

    while (!sorted) {
      sorted = true;
      for (let j = 1; j < arr.length - 1; j += 2) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
          sorted = false;
        }
      }

      for (let j = 0; j < arr.length - 1; j += 2) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
          sorted = false;
        }
      }

      count++;
      console.log(arr.toString(), `→ [${count}회]`);
    }
    // console.log(arr.toString());
  }
}

oddEvenSort.main(arr);
```

---
