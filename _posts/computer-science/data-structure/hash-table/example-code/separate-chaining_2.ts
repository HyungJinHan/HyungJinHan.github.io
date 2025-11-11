class HashTableNode {
  public item: number;
  public link: any | null;

  constructor(item: number, link: any | null = null) {
    this.item = item;
    this.link = link;
  }
}

class SeparateHashTable {
  private size: number;
  private table: any[];

  constructor() {
    this.size = 3;
    this.table = new Array(this.size).fill(null);
  }

  public printTable(): void {
    this.table.forEach((root, i) => {
      const items: number[] = [];
      let current = root;

      while (current) {
        items.push(current.item);
        current = current.link;
      }

      console.log(`${i} : ${items.join(" → ")}`);
    });
  }

  public add(item: number): void {
    const index = item % this.size;

    if (this.table[index] === null) {
      this.table[index] = new HashTableNode(item);
      return;
    }

    let prev = this.table[index];

    while (prev && prev.link !== null) {
      prev = prev.link;
    }

    if (prev) {
      prev.link = new HashTableNode(item);
    }
  }

  public remove(item: number): void {
    const index = item % this.size;

    if (this.table[index] === null) {
      return;
    }

    let prev = this.table[index];

    if (prev.item === item) {
      this.table[index] = prev.link;
      return;
    }

    while (prev.link !== null) {
      if (prev.link.item === item) {
        prev.link = prev.link.link;
        break;
      }

      prev = prev.link;
    }
  }
}

const ht = new SeparateHashTable();

for (let i = 0; i <= 20; i++) {
  ht.add(i);
}

ht.printTable();
