import { arr } from "../number_array";

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
