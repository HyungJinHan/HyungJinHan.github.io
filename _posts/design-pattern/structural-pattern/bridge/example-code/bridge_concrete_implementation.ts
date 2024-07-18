// Refined Abstraction

import { IButton, IColor } from "./bridge_config";

class MacButton implements IButton {
  private color: IColor;

  constructor(color: IColor) {
    this.color = color;
  }

  onClick(): void {
    console.log(
      "Click Mac Button\n색상 컬러: " + this.color.getColorCode() + "\n"
    );
  }
}

class WindowsButton implements IButton {
  private color: IColor;

  constructor(color: IColor) {
    this.color = color;
  }

  onClick(): void {
    console.log(
      "Click Windows Button\n색상 컬러: " + this.color.getColorCode() + "\n"
    );
  }
}

export { MacButton, WindowsButton };
