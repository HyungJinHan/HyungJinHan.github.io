interface ISubject {
  registerObserver(o: Observer): void; // 구독 추가
  removeObserver(o: Observer): void; // 구독 삭제
  notifyObservers(): void; // Subject 객체의 상태 변경 시, 이를 모든 옵저버에게 알림
}

class WeatherAPI implements ISubject {
  temp!: number; // 기온
  humidity!: number; // 습도
  pressure!: number; // 기압

  // 구독자들을 담아 관리하는 리스트
  subscribers: Array<Observer> = new Array();

  measurementsChanged(): void {
    // 랜덤 값을 통해 날씨 API처럼 구현
    this.temp = parseFloat((Math.random() * 100).toFixed(2));
    this.humidity = parseFloat((Math.random() * 100).toFixed(2));
    this.pressure = parseFloat((Math.random() * 100).toFixed(2));

    this.notifyObservers(); // 값이 변화하면 바로 옵저버들에게 발행
  }

  public registerObserver(o: Observer): void {
    this.subscribers.push(o); // 구독자 추가
  }

  public removeObserver(o: Observer): void {
    const idx = this.subscribers.indexOf(o);
    if (idx > -1) this.subscribers.splice(idx, 1); // 구독자 삭제
  }

  // 이벤트 전파
  public notifyObservers(): void {
    // JAVA -> for(Observer o: subscribers) {
    for (let o of this.subscribers) {
      o.display(this); // 자신의 객체를 매개변수로 줘서 현재 자신의 상태를 구독자에게 알림
    }
  }
}

interface Observer {
  display(api: WeatherAPI): void;
}

class KoreanUser implements Observer {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public display(api: WeatherAPI): void {
    console.log(
      `${this.name}님이 현재 날씨 상태를 조회함 : ${api.temp}°C ${api.humidity}g/m3 ${api.pressure}hPa`
    );
  }
}

class Client {
  public static main(_args?: string[]): void {
    const api: WeatherAPI = new WeatherAPI();
    const user_1 = new KoreanUser("한형진");
    const user_2 = new KoreanUser("홍길동");
    const user_3 = new KoreanUser("임꺽정");
    const user_4 = new KoreanUser("한진형");

    api.registerObserver(user_1);
    api.registerObserver(user_2);
    api.registerObserver(user_3);

    api.measurementsChanged();

    api.removeObserver(user_3);
    api.registerObserver(user_4);

    console.log("");

    api.measurementsChanged();
  }
}

Client.main();
// 한형진님이 현재 날씨 상태를 조회함 : 2.55°C 12.32g/m3 92.05hPa
// 홍길동님이 현재 날씨 상태를 조회함 : 2.55°C 12.32g/m3 92.05hPa
// 임꺽정님이 현재 날씨 상태를 조회함 : 2.55°C 12.32g/m3 92.05hPa

// 한형진님이 현재 날씨 상태를 조회함 : 47.03°C 65.19g/m3 43.94hPa
// 홍길동님이 현재 날씨 상태를 조회함 : 47.03°C 65.19g/m3 43.94hPa
// 한진형님이 현재 날씨 상태를 조회함 : 47.03°C 65.19g/m3 43.94hPa
