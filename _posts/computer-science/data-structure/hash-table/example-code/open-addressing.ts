class OpenAddressingHashTable {
  private size: number;
  private table: Array<number | null>;

  constructor() {
    this.size = 4;
    this.table = new Array<number | null>(this.size).fill(null);
  }

  private _probe(item: number, step: number): number {
    let index = item % this.size;
    while (index < this.size) {
      if (this.table[index] === null) {
        return index;
      }
      index += step;
    }
    return -1;
  }

  public printTable(): void {
    this.table.forEach((item, i) => {
      console.log(`${i} : ${item}`);
    });
  }

  public add(item: number): void {
    let index = this._probe(item, 1);
    if (index === -1) {
      index = this._probe(item, -1);
    }
    if (index === -1) {
      return;
    }
    this.table[index] = item;
  }

  public remove(item: number): void {
    const start = item % this.size;
    for (let i = start; i < this.size; i++) {
      if (this.table[i] === item) {
        this.table[i] = null;
      }
    }
    for (let i = 0; i < start; i++) {
      if (this.table[i] === item) {
        this.table[i] = null;
      }
    }
  }
}

const oaht = new OpenAddressingHashTable();

oaht.add(1);
oaht.add(4);
oaht.add(2);
oaht.add(3);
oaht.printTable();
