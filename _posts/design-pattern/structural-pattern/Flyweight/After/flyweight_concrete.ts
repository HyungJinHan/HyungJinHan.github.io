import { Memory } from "./flyweight_memory";

/**
 * Concrete Flyweight
 */
export class TreeModel {
  // 메쉬, 텍스쳐 총 사이즈
  objSize = 90; // 90MB
  type: string; // 나무 종류
  mesh: object; // 메쉬
  texture: object; // 나무 껍질 + 잎사귀 텍스쳐

  constructor(type: string, mesh: object, texture: object) {
    this.type = type;
    this.mesh = mesh;
    this.texture = texture;

    // 나무 객체를 생성하였으니 메모리 사용 크기 증가
    Memory.size += this.objSize;
  }
}
