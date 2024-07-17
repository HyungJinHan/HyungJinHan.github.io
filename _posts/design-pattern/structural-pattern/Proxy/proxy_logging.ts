import { ISubject, RealSubject } from "./default_config";

class Proxy implements ISubject {
  private subject: RealSubject; // 대상 객체를 composition

  constructor(subject: RealSubject) {
    this.subject = subject;
  }

  action(): void {
    console.log("로깅...............");
    this.subject.action(); // 위임
    console.log("프록시 객체 액션 (Logging Proxy)");
    console.log("로깅...............");
  }
}

class Client {
  public main(_args?: string[]): void {
    const sub = new Proxy(new RealSubject());
    sub.action();
  }
}

const client_true = new Client();
client_true.main();

// 로깅...............
// 원본 객체 액션
// 프록시 객체 액션 (Logging Proxy)
// 로깅...............
