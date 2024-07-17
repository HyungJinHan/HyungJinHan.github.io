import { Memory } from "./memory";
import { BeforeTerrain } from "./terrain";

export class BeforeClient {
  public static main(_args?: string[]): void {
    // 지형 생성
    const terrain = new BeforeTerrain();

    // 지형에 Oak 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Oak", // type
        new Object(), // mesh
        new Object(), // texture
        Math.random() * BeforeTerrain.CANVAS_SIZE, // position_x
        Math.random() * BeforeTerrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Acacia 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Acacia", // type
        new Object(), // mesh
        new Object(), // texture
        Math.random() * BeforeTerrain.CANVAS_SIZE, // position_x
        Math.random() * BeforeTerrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Jungle 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Jungle", // type
        new Object(), // mesh
        new Object(), // texture
        Math.random() * BeforeTerrain.CANVAS_SIZE, // position_x
        Math.random() * BeforeTerrain.CANVAS_SIZE // position_y
      );
    }

    Memory.print_memory();
  }
}
