/** Component 인터페이스 */
interface Node {
  // 계층 트리 출력
  // print(): void;
  print(str: string): void;

  // 파일/폴더 용량 얻기
  getSize(): number;
}

export { Node };
