package package1;

public class SuperClass {
  private int a = 1;
  int b = 2;
  protected int c = 3;
  public int d = 4;
  // a, b, c, d에 각각 다른 접근 제어자 정의

  public void printEach() {
    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
    System.out.println(d);
  }
}