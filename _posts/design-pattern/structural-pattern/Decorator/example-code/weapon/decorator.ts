import { Weapon } from "./component";

// 장식자 추상 클래스
abstract class WeaponAccessory implements Weapon {
  private rifle: Weapon;

  constructor(rifle: Weapon) {
    this.rifle = rifle;
  }

  public aim_and_fire(): void {
    this.rifle.aim_and_fire(); // 위임
  }
}

export { WeaponAccessory };
