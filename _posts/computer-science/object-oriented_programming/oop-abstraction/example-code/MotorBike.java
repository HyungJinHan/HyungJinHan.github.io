public class MotorBike implements Vehicle_A  {
  @Override
  public void start() {
    System.out.println("🏍️");
  }

  @Override
  public void moveForward() {
    System.out.println("🏍️ <- <- <- <- <- <- 🏍️");
  }
  
  @Override
  public void moveBackward() {
    System.out.println("🏍️ -> -> -> -> -> -> 🏍️");
  }
}
