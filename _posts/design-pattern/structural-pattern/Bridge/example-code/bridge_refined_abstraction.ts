// Concrete Implementation

import { IColor } from "./bridge_config";

class Red implements IColor {
  getColorCode(): string {
    return "#FF0000 (Red)";
  }
}

class Blue implements IColor {
  getColorCode(): string {
    return "#0000FF (Blue)";
  }
}

export { Blue, Red };
