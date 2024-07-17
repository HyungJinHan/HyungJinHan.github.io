import { ISubject, RealSubject } from "./default_config";

class Proxy implements ISubject {
  private subject: RealSubject; // 대상 객체를 composition

  constructor(subject: RealSubject) {
    this.subject = subject;
  }

  action(): void {
    this.subject.action(); // 위임
    console.log("프록시 객체 액션 (Normal Proxy)");
  }
}

class Client {
  public main(_args?: string[]): void {
    const sub = new Proxy(new RealSubject());
    sub.action();
  }
}

const client_code = new Client();
client_code.main();

// 원본 객체 액션
// 프록시 객체 액션
