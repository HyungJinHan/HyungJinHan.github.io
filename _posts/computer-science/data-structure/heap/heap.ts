class Heap {
  items: number[];
  constructor() {
    this.items = [];
  }

  // 값을 서로 바꾸는 메서드
  swap(index_1: number, index_2: number): void {
    let temp = this.items[index_1]; // items의 index_1의 값을 temp(임시공간)에 담기
    this.items[index_1] = this.items[index_2]; // index_1에 index_2의 값을 저장
    this.items[index_2] = temp; // index_2에 아까 index_1의 값을 temp에 넣어놓은 값을 저장
  }

  // 부모 인덱스 구하는 메서드
  parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // 왼쪽 자식 인덱스 구하는 메서드
  leftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  // 오른쪽 자식 인덱스 구하는 메서드
  rightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  // 부모 노드 구하는 메서드
  parent(index: number): number {
    return this.items[this.parentIndex(index)];
  }

  // 왼쪽 자식 노드 구하는 메서드
  leftChild(index: number): number {
    return this.items[this.leftChildIndex(index)];
  }

  // 오른쪽 자식 노드 구하는 메서드
  rightChild(index: number): number {
    return this.items[this.rightChildIndex(index)];
  }

  // 최대 힙의 경우 최댓값을 반환,
  // 최소 힙의 경우 최솟값을 반환하는 메서드
  peek(): number {
    return this.items[0];
  }

  // 힙의 크기(항목 개수)를 반환하는 메서드
  size(): number {
    return this.items.length;
  }
}

export default Heap;
