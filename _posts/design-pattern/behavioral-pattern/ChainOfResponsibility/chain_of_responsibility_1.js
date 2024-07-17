const General = (function () {
  class General {
    constructor() {}
    canMakeDecision() {
      return false;
    }
    makeDecision() {
      console.log("맞서 싸운다.");
    }
  }
  return General;
})();

const Senator = (function () {
  class Senator {
    constructor() {}
    canMakeDecision() {
      return false;
    }
    makeDecision() {
      console.log("눈치를 본다.");
    }
  }
  return Senator;
})();

const Emperor = (function () {
  class Emperor {
    constructor() {}
    canMakeDecision() {
      return true;
    }
    makeDecision() {
      console.log("항복한다.");
      console.log("자결한다.");
    }
  }
  return Emperor;
})();

const DecisionMaker = (function () {
  class DecisionMaker {
    constructor() {
      this.decisionMakers = [];
      this.decisionMakers.push(new General());
      this.decisionMakers.push(new Senator());
      this.decisionMakers.push(new Emperor());
    }
    makeDecision() {
      for (let i = 0; i < this.decisionMakers.length; i++) {
        if (this.decisionMakers[i].canMakeDecision()) {
          return this.decisionMakers[i].makeDecision();
        }
      }
    }
  }

  return DecisionMaker;
})();

const choice = new DecisionMaker();
choice.makeDecision();
