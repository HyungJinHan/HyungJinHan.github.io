class MinHeap {
  heap: number[];

  constructor() {
    // 힙 저장할 배열
    this.heap = [];
  }

  // 힙의 크기를 반환하는 메서드
  size(): number {
    return this.heap.length;
  }

  // 두 값을 바꿔주는 메서드
  swap(idx_1: number, idx_2: number): void {
    [this.heap[idx_1], this.heap[idx_2]] = [this.heap[idx_2], this.heap[idx_1]];
  }

  // 새로운 노드를 추가하는 메서드
  add(value: number) {
    this.heap.push(value); // 힙의 끝에 새로운 노드 추가
    this.bubbleUp(); // 새로운 값이 추가된 위치에서 bubbleUp() 수행
  }

  bubbleUp(): void {
    let index = this.heap.length - 1; // 새로운 노드가 추가된 위치
    let parentIdx = Math.floor((index - 1) / 2); // 부모 노드의 위치

    while (
      this.heap[parentIdx] && // 부모 노드가 존재하고
      this.heap[index][1] < this.heap[parentIdx][1] // 새로운 노드가 부모 노드보다 작은 경우
    ) {
      this.swap(index, parentIdx); // 두 노드의 값을 교체
      index = parentIdx; // 인덱스를 부모 노드의 인덱스로 변경
      parentIdx = Math.floor((index - 1) / 2); // 새로운 부모 노드의 인덱스 계산
    }
  }

  poll(): number {
    if (this.add.length === 1) {
      return this.heap.pop() as number; // 힙의 크기가 1인 경우, 힙에서 값을 삭제하고 return
    }

    const value = this.heap[0]; // 힙의 최솟값(루트 노드의 값)을 저장
    this.heap[0] = this.heap.pop() as number; // 힙의 끝에 있는 값을 루트 노드로 이동
    this.bubbleDown(); // 루트 노드에서 buubleDown을 수행
    return value; // 삭제한 최솟값 return
  }

  bubbleDown(): void {
    let index = 0;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;

    while (
      // 왼쪽 자식 노드가 존재하면서 값이 루트 노드보다 작거나
      (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[index][1]) ||
      // 오른쪽 자식 노드가 존재하면서 값이 루트 노드보다 작은 경우
      (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[index][1])
    ) {
      let smallerIdx = leftIdx; // 왼쪽 자식 노드가 더 작다고 가정
      if (
        this.heap[rightIdx] &&
        this.heap[rightIdx][1] < this.heap[smallerIdx][1] // 오른쪽 자식 노드가 존재하면서 더 작다면
      ) {
        smallerIdx = rightIdx; // 오른쪽 자식 노드의 index로 변경
      }

      this.swap(index, smallerIdx); // 두 노드의 값을 교체
      index = smallerIdx; // index를 더 작은 값의 자식 노드의 index로 변경
      leftIdx = index * 2 + 1; // 왼쪽 자식 노드의 index 계산
      rightIdx = index * 2 + 2; // 오른쪽 자식 노드의 index 계산
    }
  }
}
