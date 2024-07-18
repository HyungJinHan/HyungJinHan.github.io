import { TreeModel } from "./flyweight_concrete";

/**
 * Flyweight Factory
 */
export class TreeModelFactory {
  // Flyweight Pool - TreeModel 객체들을 Map으로 등록하여 캐싱
  private static cache = new Map<string, TreeModel>();

  // static factory method
  public static getInstance(key: string): TreeModel {
    // 만약 캐시 되어 있다면,
    if (TreeModelFactory.cache.has(key)) {
      return TreeModelFactory.cache.get(key) as TreeModel; // 그대로 가져와 반환
    } else {
      // 캐시 되어있지 않으면 나무 모델 객체를 새로 생성하고 반환
      const model = new TreeModel(key, new Object(), new Object());

      console.log("=== 나무 모델 객체 새로 생성 완료 ===");

      TreeModelFactory.cache.set(key, model);

      return model;
    }
  }
}
