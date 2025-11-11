import { Node } from "./component";

/** Leaf 객체 */
class File implements Node {
  private name: string; // 파일 이름
  private size: number; // 파일 사이즈

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  public print(str: string): void {
    console.log(`${str} 📄 ${this.name} (${this.size}KB)`);
  }

  public getSize(): number {
    return this.size;
  }
}

export { File };
