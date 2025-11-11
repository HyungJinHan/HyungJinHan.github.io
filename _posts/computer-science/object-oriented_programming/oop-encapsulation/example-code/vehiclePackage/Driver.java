package vehiclePackage;

public class Driver {
  private String name;
  private Car car;

  public Driver(String name, Car car) {
    this.name = name;
    this.car = car;
  }

  private void getName() {
    System.out.println("Driver's Name is " + name);
  }

  public void drive() {
    getName();
    car.operate(); // Car 클래스에 있는 메서드를 단순하게 호출
  }
}