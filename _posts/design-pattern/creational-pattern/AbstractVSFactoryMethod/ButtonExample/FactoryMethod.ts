import {
  Button,
  CheckBox,
  Component,
  MacButton,
  MacCheckBox,
  MacTextEdit,
  TextEdit,
  WindowButton,
  WindowCheckBox,
  WindowTextEdit,
} from "./Component";

interface ComponentFactoryMethod {
  createOperation(type: string): Component; // 템플릿
  createComponent(type: string): Component; // 팩토리 메서드
}

class ButtonFactory implements ComponentFactoryMethod {
  createComponent(type: string): Button {
    let button: Button;

    switch (type.toLowerCase()) {
      case "window":
        button = new WindowButton();
        break;
      case "mac":
        button = new MacButton();
        break;
    }

    return button!;
  }

  createOperation(type: string): Button {
    const button: Button = this.createComponent(type);
    // button.추가설정();
    return button;
  }
}

class CheckBoxFactory implements ComponentFactoryMethod {
  createComponent(type: string): CheckBox {
    let checkbox: CheckBox;

    switch (type.toLowerCase()) {
      case "window":
        checkbox = new WindowCheckBox();
        break;
      case "mac":
        checkbox = new MacCheckBox();
        break;
    }

    return checkbox!;
  }

  createOperation(type: string): CheckBox {
    const checkbox: CheckBox = this.createComponent(type);
    // checkbox.추가설정();
    return checkbox;
  }
}

class TextEditFactory implements ComponentFactoryMethod {
  createComponent(type: string): TextEdit {
    let textEdit: TextEdit;

    switch (type.toLowerCase()) {
      case "window":
        textEdit = new WindowTextEdit();
        break;
      case "mac":
        textEdit = new MacTextEdit();
        break;
    }

    return textEdit!;
  }

  createOperation(type: string): TextEdit {
    const textEdit: TextEdit = this.createComponent(type);
    // textEdit.추가설정();
    return textEdit;
  }
}

export {
  ButtonFactory,
  CheckBoxFactory,
  ComponentFactoryMethod,
  TextEditFactory,
};
