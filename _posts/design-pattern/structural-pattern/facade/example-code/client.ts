import { Facade } from "./facade";

class Client {
  public main(name: string, _args?: string[]): void {
    const facade: Facade = new Facade();

    facade.insert();
    facade.run(name);
  }
}

const client_hhj = new Client();
const name_hhj = "한형진";
client_hhj.main(name_hhj);
console.log("");

// Name : "한형진"
// Birthday : 1996-12-10
// Email : han1210_36@naver.com

const client_hgd = new Client();
const name_hgd = "홍길동";
client_hgd.main(name_hgd);
console.log("");

// Name : "홍길동"
// Birthday : 1890-08-14
// Email : honggildong@naver.com

const client_nobody = new Client();
const name_nobody = "누군가";
client_nobody.main(name_nobody);
console.log("");

// 누군가의 데이터가 DB에 존재하지 않습니다.
