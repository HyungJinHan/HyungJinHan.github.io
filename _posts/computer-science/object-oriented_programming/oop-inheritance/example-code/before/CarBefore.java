  public class CarBefore {
    String model;
    String color;
    int wheels;

    // Car 클래스 고유의 속성
    boolean isConvertible;

    void moveForward() {
      System.out.println("앞으로 전진한다.");
    }

    void moveBackward() {
      System.out.println("뒤로 후진한다.");
    }

    // Car 클래스 고유의 기능
    void openWindow() {
      System.out.println("모든 창문을 연다.");
    }
  }
