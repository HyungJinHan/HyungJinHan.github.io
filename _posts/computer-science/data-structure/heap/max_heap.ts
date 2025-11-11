import MinHeap from "./min_heap";

class MaxHeap extends MinHeap {
  bubbleUp(): void {
    let index = this.items.length - 1;
    while (
      this.parent(index) !== undefined &&
      this.parent(index) < this.items[index]
    ) {
      this.swap(index, this.parentIndex(index));
      index = this.parentIndex(index);
    }
  }

  bubbleDown(): void {
    let index = 0;

    while (
      this.leftChild(index) !== undefined &&
      (this.leftChild(index) > this.items[index] ||
        this.rightChild(index) > this.items[index])
    ) {
      let largerIndex = this.leftChildIndex(index);

      if (
        this.rightChild(index) !== undefined &&
        this.rightChild(index) > this.items[largerIndex]
      ) {
        largerIndex = this.rightChildIndex(index);
      }

      this.swap(largerIndex, index);
      index = largerIndex;
    }
  }
}

export default MaxHeap;
