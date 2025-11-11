public class Car implements Vehicle_A { // 이동 수단을 구체화한 자동차 클래스
  @Override
  public void start() {
    System.out.println("🚗");
  }

  @Override
  public void moveForward() {
    System.out.println("🚗 <- <- <- <- <- <- 🚗");
  }
  
  @Override
  public void moveBackward() {
    System.out.println("🚗 -> -> -> -> -> -> 🚗");
  }
}


 