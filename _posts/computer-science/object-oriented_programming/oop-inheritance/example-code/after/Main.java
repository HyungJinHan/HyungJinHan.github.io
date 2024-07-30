public class Main {
  public static void main(String[] args) {
    // 객체 생성
    CarAfter car = new CarAfter();
    MotorBikeAfter motorBike = new MotorBikeAfter();

    // car 객체의 속성 정의
    car.model = "테슬라";
    car.color = "흰색";

    System.out.println("자동차 색상 : " + car.color + " / 자동차 모델 : " + car.model);
    // 자동차 색상 : 흰색 / 자동차 모델 : 테슬라

    // 객체들의 기능 실행
    car.moveForward(); // 앞으로 전진한다.
    motorBike.moveForward(); // 앞 바퀴를 들고 전진한다.
    motorBike.moveBackward(); // 뒤로 후진한다.
  }
}
