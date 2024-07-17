import { ISubject, RealSubject } from "./default_config";

class Proxy implements ISubject {
  private subject: RealSubject; // 대상 객체를 composition
  access: boolean; // 접근 권한

  constructor(subject: RealSubject, access: boolean) {
    this.subject = subject;
    this.access = access;
  }

  action(): void {
    if (this.access) {
      this.subject.action(); // 위임
      console.log("access -> true");
      console.log("프록시 객체 액션 (Protecion Proxy)");
    } else {
      console.log("access -> false");
      console.log("프록시 객체 액션 거부 (Protecion Proxy)");
    }
  }
}

class Client {
  public main(access: boolean, _args?: string[]): void {
    const sub = new Proxy(new RealSubject(), access);
    sub.action();
  }
}

const access_true = true;
const client_true = new Client();
client_true.main(access_true);
console.log("");

// 원본 객체 액션
// access -> true
// 프록시 객체 액션 (Protecion Proxy)

const access_false = false;
const client_false = new Client();
client_false.main(access_false);
console.log("");

// access -> false
// 프록시 객체 액션 거부 (Protecion Proxy)
