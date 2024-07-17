class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new RedLight(), new YellowLight()];
    this.current = this.states[0];
  }

  change() {
    const totalStates = this.states.length;
    let currentIndex = this.states.findIndex((light) => light === this.current);
    if (currentIndex + 1 < totalStates)
      this.current = this.states[currentIndex + 1];
    else this.current = this.states[0];
  }

  sign() {
    return this.current.sign();
  }
}

class Light {
  constructor(light) {
    this.light = light;
  }
}

class RedLight extends Light {
  constructor() {
    super("🔴");
  }

  sign() {
    console.log("🔴");
  }
}

class YellowLight extends Light {
  constructor() {
    super("🟡");
  }

  sign() {
    console.log("🟡\n");
  }
}

class GreenLight extends Light {
  constructor() {
    super("🟢");
  }

  sign() {
    console.log("🟢");
  }
}

const trafficLight = new TrafficLight();

trafficLight.sign(); // 🟢
trafficLight.change();

trafficLight.sign(); // 🔴
trafficLight.change();

trafficLight.sign(); // 🟡
trafficLight.change();

trafficLight.sign(); // 🟢
trafficLight.change();

trafficLight.sign(); // 🔴
trafficLight.change();

trafficLight.sign(); // 🟡
trafficLight.change();
