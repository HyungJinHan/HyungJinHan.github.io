import { Command } from "./command";
import { AirConditioner, Light, Television } from "./receiver";

class AirConditionerOnCommand implements Command {
  private airConditioner: AirConditioner;

  constructor(airConditioner: AirConditioner) {
    this.airConditioner = airConditioner;
  }

  public run(): void {
    this.airConditioner.turnAirConditionerOn();
  }
}

class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public run(): void {
    this.light.turnLightOn();
  }
}

class TelevisionOnCommand implements Command {
  private television: Television;

  constructor(television: Television) {
    this.television = television;
  }

  public run(): void {
    this.television.turnTelevisionOn();
  }
}

export { AirConditionerOnCommand, LightOnCommand, TelevisionOnCommand };
