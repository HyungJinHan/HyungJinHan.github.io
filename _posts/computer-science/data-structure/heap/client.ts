import MaxHeap from "./max_heap";
import MinHeap from "./min_heap";

const exampleArray: number[] = [1, 10, 5, 100, 8, 3, 4, 76, 32, 44, 178];

const stopPoint: number = 5;

const minheap = new MinHeap();
const maxheap = new MaxHeap();

const Client = (heap: MinHeap | MaxHeap, heapName: string) => {
  const pollArray: number[] = [];

  exampleArray.map((item: number) => {
    heap.add(item);
  });

  console.log(`${heapName}'s Items: ${heap.items.toString()}`);

  for (let i = 0; i < stopPoint; i++) {
    pollArray.push(heap.poll());
  }

  console.log(`${heapName}'s delete Items: ${pollArray.toString()}`);
  console.log(`After delete, ${heapName}'s Items: ${heap.items.toString()}`);
  console.log("");
};

Client(minheap, "MinHeap");
// MinHeap's Items: 1,8,3,32,10,5,4,100,76,44,178
// MinHeap's delete Items: 1,3,4,5,8
// After delete, MinHeap's Items: 10,32,44,178,100,76

Client(maxheap, "MaxHeap");
// MaxHeap's Items: 178,100,5,32,76,3,4,1,10,8,44
// MaxHeap's delete Items: 178,100,76,44,32
// After delete, MaxHeap's Items: 10,8,5,1,4,3
