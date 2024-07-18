import {
  AirConditionerOnCommand,
  LightOnCommand,
  TelevisionOnCommand,
} from "./concrete_command";
import { AISpeaker } from "./invoke";
import { AirConditioner, Light, Television } from "./receiver";

class Client {
  public static main(_args?: string[]): void {
    const speaker: AISpeaker = new AISpeaker();

    speaker.setCommand(new LightOnCommand(new Light()));
    speaker.talk();

    speaker.setCommand(new AirConditionerOnCommand(new AirConditioner()));
    speaker.talk();

    speaker.setCommand(new TelevisionOnCommand(new Television()));
    speaker.talk();
  }
}

Client.main();
// [Light] turning light on...
// [Air Conditioner] turning air conditioner on...
// [Television] turning TV on...
