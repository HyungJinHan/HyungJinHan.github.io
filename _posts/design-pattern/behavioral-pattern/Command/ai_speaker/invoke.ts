import { Command } from "./command";

class AISpeaker {
  private command!: Command;

  public setCommand(command: Command): void {
    this.command = command;
  }

  public talk(): void {
    this.command.run();
  }
}

export { AISpeaker };
