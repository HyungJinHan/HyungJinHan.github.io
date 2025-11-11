package vehiclePackage;

public class Main {  
  public static void main(String[] args) {
    Car car = new Car("제네시스 G90", "Black");
    Driver driver = new Driver("Hyung-Jin, Han", car);
    
    driver.drive();
    // Driver's Name is Hyung-Jin, Han
    // 제네시스 G90
    // Black
    // 엔진 ON
    // 🚗 <- <- <- <- <- <- 🚗
    // 모든 창문을 연다.
  }
}