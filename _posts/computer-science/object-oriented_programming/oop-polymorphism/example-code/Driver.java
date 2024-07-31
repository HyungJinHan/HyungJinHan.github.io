public class Driver {
  // 매개 변수로 인터페이스 타입의 참조 변수를 전달
  void drive(Vehicle vehicle) {
    vehicle.moveForward();
    vehicle.moveBackward();
  }
}
