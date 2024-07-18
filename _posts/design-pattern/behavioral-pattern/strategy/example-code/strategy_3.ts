// 전략 (추상화된 알고리즘)
interface PaymentStrategy {
  pay(amount: number): void;
}

class KakaoCardStrategy implements PaymentStrategy {
  private name: string;
  private cardNumber: number;
  private cvv: number;
  private dateOfExpire: string;

  constructor(
    name: string,
    cardNumber: number,
    cvv: number,
    dateOfExpire: string
  ) {
    this.name = name;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.dateOfExpire = dateOfExpire;
  }

  public pay(amount: number): void {
    console.log(`${amount}₩ paid using Kakao Card`);
  }
}

class LunaCardStrategy implements PaymentStrategy {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public pay(amount: number): void {
    console.log(`${amount}₩ paid using Luna Card`);
  }
}

class Item {
  public name: string;
  public price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

// Context (전략 등록 / 실행)
class ShoppingCart {
  items: Item[];

  constructor() {
    this.items = new Array<Item>();
  }

  public addItem(item: Item): void {
    this.items.push(item);
  }

  // 전략은 매개변수로 받아서 바로 전략을 실행
  public pay(paymentMethod: PaymentStrategy): void {
    let amount: number = 0;
    for (let item of this.items) {
      amount += item.price;
    }

    paymentMethod.pay(amount);
  }
}

// Client (전략 제공 / 설정)
class PayUser {
  public static main(_args?: string[]): void {
    // 쇼핑카트 전략 Context 등록
    const cart: ShoppingCart = new ShoppingCart();

    // 쇼핑 물품
    const A: Item = new Item("맥북 에어", 10000);
    const B: Item = new Item("맥북 프로", 30000);

    cart.addItem(A);
    cart.addItem(B);

    // Luna Card로 결제 전략 실행
    cart.pay(new LunaCardStrategy("han1210_36@naver.com", "password1234"));

    // Kakao Card로 결제 전략 실행
    cart.pay(new KakaoCardStrategy("HyungJinHan", 123456789, 123, "12/10"));
  }
}

PayUser.main();
