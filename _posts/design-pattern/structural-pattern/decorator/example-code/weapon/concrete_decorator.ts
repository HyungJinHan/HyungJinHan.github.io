import { Weapon } from "./component";
import { WeaponAccessory } from "./decorator";

// 장식자 클래스 (유탄 발사기)
class Grenade extends WeaponAccessory {
  constructor(rifle: Weapon) {
    super(rifle);
  }

  public override aim_and_fire(): void {
    super.aim_and_fire(); // 부모 메서드를 호출함으로써 자신을 감싸고 있는 장식자의 메서드를 호출
    this.grenade_fire();
  }

  public grenade_fire(): void {
    console.log("유탄 발사");
  }
}

class Scope extends WeaponAccessory {
  constructor(rifle: Weapon) {
    super(rifle);
  }

  public override aim_and_fire(): void {
    this.aiming();
    super.aim_and_fire(); // 부모 메서드를 호출함으로써 자신을 감싸고 있는 장식자의 메서드를 호출
  }

  public aiming(): void {
    console.log("조준 중...");
  }
}

class Buttstock extends WeaponAccessory {
  constructor(rifle: Weapon) {
    super(rifle);
  }

  public override aim_and_fire(): void {
    this.holding();
    super.aim_and_fire(); // 부모 메서드를 호출함으로써 자신을 감싸고 있는 장식자의 메서드를 호출
  }

  public holding(): void {
    console.log("견착 완료");
  }
}

export { Buttstock, Grenade, Scope };
