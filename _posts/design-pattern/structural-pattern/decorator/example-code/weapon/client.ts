import { Weapon } from "./component";
import { BaseWeapon } from "./concrete_component";
import { Buttstock, Grenade, Scope } from "./concrete_decorator";

class Client {
  public static main(_args?: string[]): void {
    console.log("유탄 발사기 장착한 라이플");
    const grenade_rifle: Weapon = new Grenade(new BaseWeapon());
    grenade_rifle.aim_and_fire();

    console.log("");

    console.log("개머리판 + 스코프 장착한 라이플");
    const buttstock_scope_rifle: Weapon = new Buttstock(
      new Scope(new BaseWeapon())
    );
    buttstock_scope_rifle.aim_and_fire();

    console.log("");

    console.log("개머리판 + 스코프 + 유탄 발사기 장착한 라이플");
    const buttstock_scope_grenade_rifle = new Buttstock(
      new Scope(new Grenade(new BaseWeapon()))
    );
    buttstock_scope_grenade_rifle.aim_and_fire();
  }
}

Client.main();
// 유탄 발사기 장착한 라이플
// 실탄 발사
// 유탄 발사

// 개머리판 + 스코프 장착한 라이플
// 견착 완료
// 조준 중...
// 실탄 발사

// 개머리판 + 스코프 + 유탄 발사기 장착한 라이플
// 견착 완료
// 조준 중...
// 실탄 발사
// 유탄 발사
