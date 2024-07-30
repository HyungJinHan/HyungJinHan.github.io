public class MotorBikeBefore {
  String model;
  String color;
  int wheels;

  // MotorBike 클래스 고유의 속성
  boolean isRaceable;

  void moveForward() {
    System.out.println("앞으로 전진한다.");
  }

  void moveBackward() {
    System.out.println("뒤로 후진한다.");
  }

  // MotorBike 클래스 고유의 기능
  void stuntAction() {
    System.out.println("스턴트 묘기를 보인다.");
  }
}
