import { arr } from "../number_array";

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
