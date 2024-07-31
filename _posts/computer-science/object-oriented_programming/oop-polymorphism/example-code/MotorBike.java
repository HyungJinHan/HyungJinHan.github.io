// 이동 수단 인터페이스를 구현
public class MotorBike implements Vehicle {
  @Override
  public void moveForward() {
    System.out.println("🏍️ <- <- <- <- <- <- 🏍️");
  }
 
  @Override
  public void moveBackward() {
    System.out.println("🏍️ -> -> -> -> -> -> 🏍️");
  }
}
