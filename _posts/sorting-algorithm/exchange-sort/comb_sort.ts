import { arr } from "../number_array";

class combSort {
  public static main(arr: number[]): void {
    let i: number,
      gap: number,
      size: number,
      count: number = 0,
      temp: number = 0,
      sorted: boolean = true;

    gap = size = arr.length;

    while (gap !== 1 || sorted) {
      gap /= 1.3;

      if (gap < 1) gap = 1;

      sorted = false;

      for (i = 0; i < size - gap; i++) {
        if (arr[i] > arr[i + gap]) {
          temp = arr[i];
          arr[i] = arr[i + gap];
          arr[i + gap] = temp;
          sorted = true;
        }
      }
      count++;
      console.log(arr.toString(), `→ [${count}회]`);
    }
  }
}

combSort.main(arr);
