// Adaptee
// 클라이언트에서 사용하고 싶은 기존의 서비스 (하지만 호환이 안되서 바로 사용이 불가능)
class ServiceObject {
  specificMethod(specialData: number | string): void {
    console.log("기존 서비스 기능 호출 + " + specialData);
  }
}

// Client Interface
// 클라이언트가 접근해서 사용할 고수준의 어댑터 모듈
interface TargetObject {
  method(data: number | string): void;
}

// Adapter
// Adaptee 서비스를 클라이언트에서 사용하게 할 수 있도록 호환 처리 해주는 어댑터
class AdapterObject implements TargetObject {
  adaptee: ServiceObject; // Composition으로 Service 객체를 클래스 필드로

  constructor(adaptee: ServiceObject) {
    this.adaptee = adaptee;
  }

  // 어댑터가 인스턴스화되면 호환시킬 기존 서비스를 설정
  AdapterObject(adaptee: ServiceObject) {
    this.adaptee = adaptee;
  }

  // 어댑터의 메소드가 호출되면, Adaptee의 메소드를 호출하도록
  method(data: number | string): void {
    this.adaptee.specificMethod(data); // 위임
  }
}

class ClientObject {
  // static
  // 클래스를 통해 인스턴스를 생성할 필요 없이 클래스의 속성 또는 메서드를 사용할때 사용하는 정의 키워드
  public static main(data: number | string, _args?: string[]): void {
    // 1. 어댑터 생성 (기존 서비스를 인자로 받아 호환 작업 처리)
    const adapter = new AdapterObject(new ServiceObject());

    // 2. Client Interface(Target)의 스펙에 따라 메소드를 실행하면 기존 서비스의 메소드가 실행
    adapter.method(data);
  }
}

ClientObject.main("새로운 메소드 호출");
// 기존 서비스 기능 호출 + 새로운 메소드 호출
