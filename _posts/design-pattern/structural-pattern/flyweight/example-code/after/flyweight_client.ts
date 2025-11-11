import { Memory } from "./flyweight_memory";
import { Terrain } from "./flyweight_terrain";

export class Client {
  public static main(_args?: string[]): void {
    // 지형 생성
    const terrain = new Terrain();

    // 지형에 Oak 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Oak", // type
        Math.random() * Terrain.CANVAS_SIZE, // position_x
        Math.random() * Terrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Acacia 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Acacia", // type
        Math.random() * Terrain.CANVAS_SIZE, // position_x
        Math.random() * Terrain.CANVAS_SIZE // position_y
      );
    }

    // 지형에 Jungle 나무 5그루 생성
    for (let i = 0; i < 5; i++) {
      terrain.render(
        "Jungle", // type
        Math.random() * Terrain.CANVAS_SIZE, // position_x
        Math.random() * Terrain.CANVAS_SIZE // position_y
      );
    }

    Memory.print_memory();
  }
}
