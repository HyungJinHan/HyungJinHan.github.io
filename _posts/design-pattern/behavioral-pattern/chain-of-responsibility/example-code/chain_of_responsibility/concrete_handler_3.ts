import { Handler } from "./handler";

class PortHandler extends Handler {
  protected override process(url: string): void {
    const index: number = url.lastIndexOf(":");

    if (index !== -1) {
      const strPort: string = url.substring(index + 1);

      try {
        const port: number = Number.parseInt(strPort);
        console.log("PORT : " + port);
      } catch (error: any) {
        console.error(error);
      }
    }
  }
}

export { PortHandler };
