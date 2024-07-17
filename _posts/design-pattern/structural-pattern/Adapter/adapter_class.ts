// Adaptee
// 클라이언트에서 사용하고 싶은 기존의 서비스 (하지만 호환이 안되서 바로 사용이 불가능)
class ServiceClass {
  specificMethod(specialData: number | string): void {
    console.log("기존 서비스 기능 호출 + " + specialData);
  }
}

// Client Interface
// 클라이언트가 접근해서 사용할 고수준의 어댑터 모듈
interface TargetClass {
  method(data: number | string): void;
}

// Adapter
// Adaptee 서비스를 클라이언트에서 사용하게 할 수 있도록 호환 처리 해주는 어댑터
class AdapterClass extends ServiceClass implements TargetClass {
  // 어댑터의 메소드가 호출되면, 부모 클래스 Adaptee의 메소드 호출
  method(data: number | string): void {
    this.specificMethod(data);
  }
}

class ClientClass {
  public static main(data: number | string, _args?: string[]) {
    // 1. 어댑터 생성
    const adapter = new AdapterClass();

    // 2. 인터페이스의 스펙에 따라 메소드를 실행하면 기존 서비스의 메소드가 실행
    adapter.method(data);
  }
}

ClientClass.main("새로운 메소드 호출");
// 기존 서비스 기능 호출 + 새로운 메소드 호출
