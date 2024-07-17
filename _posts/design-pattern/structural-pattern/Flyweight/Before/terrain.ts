import { BeforeTree } from "./tree";

export class BeforeTerrain {
  // 지형 타일 크기
  static CANVAS_SIZE: number = 10000;

  // 나무 렌더링
  public render(
    type: string,
    mesh: object,
    texture: object,
    _position_x: number,
    _position_y: number
  ): void {
    // 나무를 지형에 생성
    const tree = new BeforeTree(
      type,
      mesh,
      texture,
      Math.random() * BeforeTerrain.CANVAS_SIZE,
      Math.random() * BeforeTerrain.CANVAS_SIZE
    );

    console.log(
      "x: " +
        tree.position_x +
        " y: " +
        tree.position_y +
        " 위치에 " +
        type +
        " 나무 생성 완료"
    );
  }
}
