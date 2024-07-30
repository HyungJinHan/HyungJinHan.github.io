// 추상화를 통한 상위 클래스 정의
public class VehicleAfter {
  String model;
  String color;
  int wheels;

  void moveForward() {
    System.out.println("앞으로 전진한다.");
  }

  void moveBackward() {
    System.out.println("뒤로 후진한다.");
  }
}