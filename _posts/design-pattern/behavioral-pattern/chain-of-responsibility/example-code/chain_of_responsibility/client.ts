import { ProtocolHandler } from "./concrete_handler_1";
import { DomainHandler } from "./concrete_handler_2";
import { PortHandler } from "./concrete_handler_3";
import { Handler } from "./handler";

class Client {
  public static main(_args?: string[]): void {
    // 1. 핸들러 생성
    const handler_1: Handler = new ProtocolHandler();
    const handler_2: Handler = new DomainHandler();
    const handler_3: Handler = new PortHandler();

    // 2. 핸들러 연결 설정 (handler_1 - handler_2 - handler_3)
    handler_1.setNext(handler_2).setNext(handler_3);

    // 3. 요청에 대한 처리 연쇄 실행
    const url_1 = "http://www.youtube.com:443";
    console.log(`INPUT : ${url_1}`);
    handler_1.run(url_1);

    console.log("");

    const url_2 = "https://hyungjinhan.vercel.app:3000";
    console.log(`INPUT : ${url_2}`);
    handler_1.run(url_2);

    console.log("");

    const url_3 = "http://localhost:8080";
    console.log(`INPUT : ${url_3}`);
    handler_1.run(url_3);
  }
}

Client.main();
// INPUT : http://www.youtube.com:443
// PROTOCOL : http
// DOMAIN : www.youtube.com
// PORT : 443

// INPUT : https://hyungjinhan.vercel.app:3000
// PROTOCOL : https
// DOMAIN : hyungjinhan.vercel.app
// PORT : 3000

// INPUT : http://localhost:8080
// PROTOCOL : http
// DOMAIN : localhost
// PORT : 8080
