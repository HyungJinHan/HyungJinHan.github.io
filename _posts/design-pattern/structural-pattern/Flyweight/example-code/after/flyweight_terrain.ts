import { TreeModelFactory } from "./flyweight_factory";
import { Tree } from "./flyweight_unshared_concrete";

export class Terrain {
  // 지형 타일 크기
  static CANVAS_SIZE: number = 10000;

  // 나무 렌더링
  public render(type: string, position_x: number, position_y: number): void {
    // 1. 캐시되어 있는 나무 모델 객체 가져오기
    const model = TreeModelFactory.getInstance(type);

    // 2. 재사용한 나무 모델 객체와 변화하는 속성인 좌표 값으로 나무 생성
    const tree = new Tree(model, position_x, position_y);

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
