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
