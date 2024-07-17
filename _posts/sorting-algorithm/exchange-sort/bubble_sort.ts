import { arr } from "../number_array";

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
