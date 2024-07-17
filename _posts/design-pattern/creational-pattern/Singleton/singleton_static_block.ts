class SingletonStaticBlock {
  // 싱글턴 클래스 객체를 담을 인스턴스 변수
  private static instance: SingletonStaticBlock;

  // 생성자를 private로 선언 (외부에서 new 사용 X)
  private constructor() {}
  // private SingletonStaticBlock() {} -> Java

  // static 블록을 이용해 예외 처리
  static {
    try {
      this.instance = new SingletonStaticBlock();
    } catch (error) {
      throw console.log("싱클턴 객체 생성 오류", error);
    }
  }

  public static getInstance(): SingletonStaticBlock {
    return this.instance;
  }
}

SingletonStaticBlock.getInstance();
