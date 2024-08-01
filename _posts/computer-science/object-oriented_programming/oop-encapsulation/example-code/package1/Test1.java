package package1;

class Test1 {
  public static void main(String[] args) {
    SuperClass superClass = new SuperClass();

    // System.out.println(superClass.a); -> 동일 클래스가 아니기 때문에 Error
    System.out.println(superClass.b); // 2
    System.out.println(superClass.c); // 3
    System.out.println(superClass.d); // 4

    superClass.printEach(); // 1 2 3 4
  }
}
