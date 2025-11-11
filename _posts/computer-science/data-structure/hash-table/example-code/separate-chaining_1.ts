class NodeExample {
  key: string;
  value: string | number;
  next: any;

  constructor(key: string, value: string | number) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class SeparateChainingLinkedList {
  table: any[];

  constructor(size: number) {
    this.table = new Array(size).fill(null);
  }

  hash(key: string) {
    return key.length % this.table.length;
  }

  insert(key: string, value: string | number) {
    const index: number = this.hash(key);
    const newNode = new NodeExample(key, value);

    if (!this.table[index]) {
      this.table[index] = newNode;
    } else {
      let current = this.table[index];

      while (current.next) {
        current = current.next;
      }

      current.next = newNode;
    }
  }

  find(key: string) {
    const index = this.hash(key);
    let current = this.table[index];

    while (current) {
      if (current.key === key) {
        console.log(current.value);
      }
      current = current.next;
    }

    return;
  }
}

const hashTable = new SeparateChainingLinkedList(10);

hashTable.insert("name", "Bob");
hashTable.insert("age", 26);

hashTable.find("name");
hashTable.find("age");
