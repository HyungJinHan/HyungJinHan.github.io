---
# title: TITLE
# date: YYYY-MM-DD HH:MM:SS +/-TTTT
categories: [Sort Algorithm, Exchange Sort]
tags: [sorting-algorithm, gnome-sort] # TAG names should always be lowercase
math: true
---

> [정렬 알고리즘 위키](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A0%AC_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98)

## 난쟁이 정렬

![gnome_sort](../../../../assets/image/sort/gif/gnome_sort.gif)

## 복잡도

- 최악 시간복잡도

  - $O(n^2)$

- 최선 시간복잡도

  - $O(n)$

- 평균 시간복잡도

  - $O(n^2)$

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

class gnomeSort {
  public static main(arr: number[]): void {
    let pos: number = 0,
      count: number = 0;

    const swap = (arr: number[], i: number, j: number): void => {
      let temp: number = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    };

    for (pos = 0; pos < arr.length - 1; ) {
      if (pos < 0 || arr[pos] <= arr[pos + 1]) {
        pos++;
        continue;
      }

      swap(arr, pos, pos + 1);
      pos--;

      count++;
      console.log(arr.toString(), `→ [${count}회]`);
    }
    // console.log(arr.toString());
  }
}

gnomeSort.main(arr);
```