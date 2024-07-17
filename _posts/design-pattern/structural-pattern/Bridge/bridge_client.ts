import { MacButton, WindowsButton } from "./bridge_concrete_implementation";
import { Blue, Red } from "./bridge_refined_abstraction";

class Client {
  public static main(_args?: string[]): void {
    const macButton = new MacButton(new Red());
    const windowsButton = new WindowsButton(new Blue());

    macButton.onClick();
    windowsButton.onClick();
  }
}

Client.main();

// Click Mac Button
// 색상 컬러: #FF0000 (Red)

// Click Windows Button
// 색상 컬러: #0000FF (Blue)
