import { arr } from "./number_array";

class shakerSort {
  public static main(arr: number[]): void {
    let swapped: boolean = true;
    let i: number = 0;
    let j: number = arr.length - 1;

    while (i < j && swapped) {
      swapped = false;
      for (let k = i; k < j; k++) {
        if (arr[k] > arr[k + 1]) {
          let temp: number = arr[k];
          arr[k] = arr[k + 1];
          arr[k + 1] = temp;
          swapped = true;
        }
      }
      j--;
      if (swapped) {
        swapped = false;
        for (let k = j; k > i; k--) {
          if (arr[k] < arr[k - 1]) {
            let temp: number = arr[k];
            arr[k] = arr[k - 1];
            arr[k - 1] = temp;
            swapped = true;
          }
        }
      }
      i++;
      console.log(arr.toString(), `→ [${i}회]`);
    }
    // console.log(arr.toString());
  }
}

shakerSort.main(arr);
