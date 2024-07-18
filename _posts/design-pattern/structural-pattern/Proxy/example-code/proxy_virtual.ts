import { ISubject, RealSubject } from "./default_config";

class Proxy implements ISubject {
  private subject!: RealSubject;
  // has no initializer and is not definitely assigned in the constructor 에러 방지

  action(): void {
    // 프록시 객체는 실제 요청(action(메소드 호출))이 들어 왔을 때 실제 객체를 생성한다.
    if (!this.subject) {
      this.subject = new RealSubject();
    }

    this.subject.action(); // 위임
    console.log("프록시 객체 액션 (Virtual Proxy)");
  }
}

class Client {
  public main(_args?: string[]): void {
    const sub = new Proxy();
    sub.action();
  }
}

const client_code = new Client();
client_code.main();

// 원본 객체 액션
// 프록시 객체 액션 (Virtual Proxy)
