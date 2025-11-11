interface Component {
  render(): void;
}

/* ---------------------------------------------------------- */

abstract class Button implements Component {
  render(): void {
    throw new Error("Method not implemented.");
  }
}

class WindowButton extends Button {
  /** @override */
  public override render(): void {
    console.log("윈도우 버튼 생성 완료");
  }
}

class MacButton extends Button {
  /** @override */
  public override render(): void {
    console.log("맥 버튼 생성 완료");
  }
}

/* ---------------------------------------------------------- */

abstract class CheckBox implements Component {
  render(): void {
    throw new Error("Method not implemented");
  }
}

class WindowCheckBox extends CheckBox {
  /** @override */
  public override render(): void {
    console.log("윈도우 체크 박스 생성 완료");
  }
}

class MacCheckBox extends CheckBox {
  /** @override */
  public override render(): void {
    console.log("맥 체크 박스 생성 완료");
  }
}

/* ---------------------------------------------------------- */

abstract class TextEdit implements Component {
  render(): void {
    throw new Error("Method not implemented");
  }
}

class WindowTextEdit extends TextEdit {
  /** @override */
  public override render(): void {
    console.log("윈도우 텍스트 박스 생성 완료");
  }
}

class MacTextEdit extends TextEdit {
  /** @override */
  public override render(): void {
    console.log("맥 텍스트 박스 생성 완료");
  }
}

export {
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
};
