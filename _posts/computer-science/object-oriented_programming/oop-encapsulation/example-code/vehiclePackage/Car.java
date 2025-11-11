package vehiclePackage;

public class Car {
  private String model;
  private String color;

  public Car(String model, String color) {
    this.model = model;
    this.color = color;
  }

  private void getCarInfo() {
    System.out.println(model);
    System.out.println(color);
  }

  private void startEngine() {
    System.out.println("엔진 ON");
  }

  private void moveForward() {
    System.out.println("🚗 <- <- <- <- <- <- 🚗");
  }

  private void openWindow() {
    System.out.println("모든 창문을 연다.");
  }

  // 앞서 Driver 클래스에 정의된 메서드들을 이동하여 메서드 추출
  public void operate() {
    getCarInfo();
    startEngine();
    moveForward();
    openWindow();
  }
}