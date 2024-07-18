class SingletonEager {
  // 싱글턴 클래스 객체를 담을 인스턴스 변수
  private static INSTANCE: SingletonEager = new SingletonEager();

  // 생성자를 private로 선언 (외부에서 new 사용 X)
  private constructor() {}
  // private SingletonEager() {} -> Java

  public static getInstance(): SingletonEager {
    return SingletonEager.INSTANCE;
  }
}

SingletonEager.getInstance();
