import { TreeModel } from "./flyweight_concrete";
import { Memory } from "./flyweight_memory";

/**
 * Unshared Concrete Flyweight
 */
export class Tree {
  // 좌표 값과 나무 모델 참조 객체 크기를 합친 사이즈
  objSize = 10; // 10MB

  // 위치 변수
  position_x: number;
  position_y: number;

  // 나무 모델
  model: TreeModel;

  constructor(model: TreeModel, position_x: number, position_y: number) {
    this.model = model;
    this.position_x = position_x;
    this.position_y = position_y;

    // 나무 객체를 생성하였으니 메모리 사용 크기 증가
    Memory.size += this.objSize;
  }
}
