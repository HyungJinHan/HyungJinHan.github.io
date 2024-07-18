// 버블 정렬 알고리즘
class BubbleSortStrategy {
  sort(arr) {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }

    return arr;
  }
}

// 퀵 정렬 알고리즘
class QuickSortStrategy {
  sort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];

    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return this.sort(left).concat([pivot], this.sort(right));
  }
}

// 정렬 수행 클래스
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  sort(arr) {
    console.log(this.strategy.sort(arr));
  }
}

let arr = [
  8, 6, 5, 7, 4, 3, 9, 2, 1, 10, 15, 19, 18, 14, 17, 16, 13, 12, 11, 20,
];

let bubbleSorter = new Sorter(new BubbleSortStrategy());
let quickSorter = new Sorter(new QuickSortStrategy());

bubbleSorter.sort(arr);
quickSorter.sort(arr);
