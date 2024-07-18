import { Handler } from "./handler";

class ProtocolHandler extends Handler {
  protected override process(url: string): void {
    const index: number = url.indexOf("://");

    if (index !== -1) {
      console.log(`PROTOCOL : ${url.substring(0, index)}`);
    } else {
      console.log("NO PROTOCOL");
    }
  }
}

export { ProtocolHandler };
