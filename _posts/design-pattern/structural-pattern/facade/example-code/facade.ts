import { Caches, DBMS, Message, Row } from "./libraries";

export class Facade {
  private dbms: DBMS = new DBMS();
  private caches: Caches = new Caches();

  /**
   * 1. 생성 & 등록
   */
  public insert(): void {
    this.dbms.put(
      "한형진",
      new Row("한형진", "1996-12-10", "han1210_36@naver.com")
    );
    this.dbms.put(
      "홍길동",
      new Row("홍길동", "1890-08-14", "honggildong@naver.com")
    );
    this.dbms.put(
      "임꺽정",
      new Row("임꺽정", "1820-11-02", "han1210_36@naver.com")
    );
  }

  /**
   * 1. 캐시에 row가 없다면 DB에 해당 데이터를 조회하고 row에 저장 후, 캐시에 저장
   * 2. DB에 이름으로 조회된 값이 있으면 정상적으로 값 출력
   * 3. 캐시, DB에 조회된 값이 없다면 에러 문구 출력
   */
  public run(name: string): void {
    let row = this.caches.get(name);

    if (!row) {
      row = this.dbms.query(name);

      if (row) {
        this.caches.put(row);
      }
    }

    if (row) {
      const message: Message = new Message(row);

      console.log(message.makeName());
      console.log(message.makeBirthday());
      console.log(message.makeEmail());
    } else {
      console.log(name + "의 데이터가 DB에 존재하지 않습니다.");
    }
  }
}
