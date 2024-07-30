public class MotorBikeAfter extends VehicleAfter {
  boolean isRaceable;

  // 메서드 오버라이딩 -> 기능 재정의
  @Override
  void moveForward() {
    System.out.println("앞 바퀴를 들고 전진한다.");
  }

  public void stuntAction() {
    System.out.println("스턴트 묘기를 보인다.");
  }
}
