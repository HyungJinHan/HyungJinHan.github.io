import { Handler } from "./handler";

class DomainHandler extends Handler {
  protected override process(url: string): void {
    const startIndex: number = url.indexOf("://");
    const lastIndex: number = url.lastIndexOf(":");

    if (startIndex === -1) {
      if (lastIndex === -1) {
        console.log(`DOMAIN : ${url}`);
      } else {
        console.log(`DOMAIN : ${url.substring(0, lastIndex)}`);
      }
    } else if (startIndex !== lastIndex) {
      console.log(`DOMAIN : ${url.substring(startIndex + 3, lastIndex)}`);
    } else {
      console.log(`DOMAIN : ${url.substring(startIndex + 3)}`);
    }
  }
}

export { DomainHandler };
