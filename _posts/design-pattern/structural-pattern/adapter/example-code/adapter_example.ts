class Target {
  public request(): string {
    return "Target: The default target's behavior";
  }
}

class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

class Client {
  public static main(target: Target): void {
    console.log(target.request());
  }
}

console.log("Client: I can work just fine with the Target objects:");
Client.main(new Target());
// Client: I canwork just fine with the Target objects:
// Target: The default target's behavior

console.log("");

const adaptee = new Adaptee();
console.log(
  "Client: The Adaptee class has a weird interface. See, I don't understand it:"
);
console.log(`Adaptee: ${adaptee.specificRequest()}`);
// Client: The Adaptee class has a weird interface. See, I don't understand it:
// Adaptee: .eetpadA eht fo roivaheb laicepS

console.log("");

console.log("Client: But I can work with it via the Adapter:");
Client.main(new Adapter(adaptee));
// Client: But I can work with it via the Adapter:
// Adapter: (TRANSLATED) Special behavior of the Adaptee.
