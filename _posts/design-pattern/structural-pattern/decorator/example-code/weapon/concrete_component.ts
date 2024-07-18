import { Weapon } from "./component";

// 장식될 원본 객체
class BaseWeapon implements Weapon {
  public aim_and_fire(): void {
    console.log("실탄 발사");
  }
}

export { BaseWeapon };
