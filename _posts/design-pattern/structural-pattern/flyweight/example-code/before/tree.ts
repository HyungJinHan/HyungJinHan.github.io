import { Memory } from "./memory";

export class BeforeTree {
  objSize: number = 100; // 100MB
  type: string; // 나무 종류
  mesh: object; // 메쉬
  texture: object; // 나무 껍질 + 잎사귀 텍스쳐

  // 위치 변수
  position_x: number;
  position_y: number;

  constructor(
    type: string,
    mesh: object,
    texture: object,
    position_x: number,
    position_y: number
  ) {
    this.type = type;
    this.mesh = mesh;
    this.texture = texture;
    this.position_x = position_x;
    this.position_y = position_y;

    // 나무 객체를 생성하였으니 메모리 사용 크기 증가
    Memory.size += this.objSize;
  }
}
