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
