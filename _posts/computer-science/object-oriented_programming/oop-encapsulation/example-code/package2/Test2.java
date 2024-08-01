package package2; // 패키지 명 (쉽게 생각해서 디렉토리)

import package1.SuperClass;

class SubClass extends SuperClass { // package1으로부터 SuperClass 클래스 상속
  public void printEach() {
    // System.out.println(a); -> Error
    // System.out.println(b); -> Error
    System.out.println(c); // 다른 패키지의 하위 클래스
    System.out.println(d);
  }
}

public class Test2 {
  public static void main(String[] args) {
    SuperClass parent = new SuperClass();

    // System.out.println(parent.a);
    // System.out.println(parent.b);
    // System.out.println(parent.c);
    // public 제외한 모든 호출 Error
    System.out.println(parent.d); // 4
  }
}
