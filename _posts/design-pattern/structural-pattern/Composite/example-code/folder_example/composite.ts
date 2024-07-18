import { Node } from "./component";

/** Composite 객체 */
class Folder implements Node {
  private name: string; // 폴더 이름
  private list: Node[];

  constructor(name: string) {
    this.name = name;
    this.list = [];
  }

  // 리스트에 폴더, 파일 추가
  public add(node: Node): void {
    this.list.push(node);
  }

  public print(str: string): void {
    const size = this.getSize(); // 폴더가 담고 있는 모든 파일에 대한 용량 합산

    console.log(`${str} 📂 ${this.name} (${size}KB)`);

    for (const node of this.list) {
      // Folder 일 경우 재귀 동작
      node.print(str + "   "); // 인자로 공백문자를 할당하여 indent 처리
    }
  }

  // 각 파일의 용량(KB) 구하기
  public getSize(): number {
    let sum = 0;

    for (const node of this.list) {
      sum += node.getSize(); // print 로직과 똑같이 재귀 동작
    }

    return sum;
  }
}

export { Folder };
