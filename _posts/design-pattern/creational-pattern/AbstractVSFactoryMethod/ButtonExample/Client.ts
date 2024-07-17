import {
  ComponentAbstractFactory,
  MacFactory,
  WindowFactory,
} from "./AbstractFactory";
import { Button, CheckBox, TextEdit } from "./Component";
import {
  ButtonFactory,
  CheckBoxFactory,
  ComponentFactoryMethod,
  TextEditFactory,
} from "./FactoryMethod";

type Type = "Mac" | "Window";

class FactoryMethodClient {
  public static main(type: Type): void {
    let factory: ComponentFactoryMethod;
    let btn: Button;
    let chkBox: CheckBox;
    let textEdit: TextEdit;

    // 버튼 생성
    factory = new ButtonFactory();
    btn = factory.createOperation(type);
    btn.render();

    // 체크 박스 생성
    factory = new CheckBoxFactory();
    chkBox = factory.createOperation(type);
    chkBox.render();

    // 체크 박스 생성
    factory = new TextEditFactory();
    textEdit = factory.createOperation(type);
    textEdit.render();

    console.log("");
  }
}

FactoryMethodClient.main("Mac");
// 맥 버튼 생성 완료
// 맥 체크 박스 생성 완료
// 맥 텍스트 박스 생성 완료

FactoryMethodClient.main("Window");
// 윈도우 버튼 생성 완료
// 윈도우 체크 박스 생성 완료
// 윈도우 텍스트 박스 생성 완료

class AbstractFactoryClient {
  public static main(type: Type): void {
    let factory: ComponentAbstractFactory;

    switch (type.toLowerCase()) {
      case "window":
        factory = new WindowFactory();
        break;
      case "mac":
        factory = new MacFactory();
        break;
    }

    const button: Button = AbstractFactoryClient.createBtn(factory!);
    const checkbox: CheckBox = AbstractFactoryClient.createChk(factory!);
    const textEdit: CheckBox = AbstractFactoryClient.createEdit(factory!);

    button.render();
    checkbox.render();
    textEdit.render();

    console.log("");
  }

  public static createBtn(factory: ComponentAbstractFactory): Button {
    return factory.createButton();
  }

  public static createChk(factory: ComponentAbstractFactory): CheckBox {
    return factory.createCheck();
  }

  public static createEdit(factory: ComponentAbstractFactory): TextEdit {
    return factory.createTextEdit();
  }
}

AbstractFactoryClient.main("Window");
// 윈도우 버튼 생성 완료
// 윈도우 체크 박스 생성 완료
// 윈도우 텍스트 박스 생성 완료

AbstractFactoryClient.main("Mac");
// 맥 버튼 생성 완료
// 맥 체크 박스 생성 완료
// 맥 텍스트 박스 생성 완료
