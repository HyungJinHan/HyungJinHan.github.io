import {
  Button,
  CheckBox,
  MacButton,
  MacCheckBox,
  MacTextEdit,
  TextEdit,
  WindowButton,
  WindowCheckBox,
  WindowTextEdit,
} from "./Component";

interface ComponentAbstractFactory {
  createButton(): Button;
  createCheck(): CheckBox;
  createTextEdit(): TextEdit;
}

class WindowFactory implements ComponentAbstractFactory {
  createButton(): Button {
    return new WindowButton();
  }

  createCheck(): CheckBox {
    return new WindowCheckBox();
  }

  createTextEdit(): TextEdit {
    return new WindowTextEdit();
  }
}

class MacFactory implements ComponentAbstractFactory {
  createButton(): Button {
    return new MacButton();
  }

  createCheck(): CheckBox {
    return new MacCheckBox();
  }

  createTextEdit(): TextEdit {
    return new MacTextEdit();
  }
}

export { ComponentAbstractFactory, MacFactory, WindowFactory };
