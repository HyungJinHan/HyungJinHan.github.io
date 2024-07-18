const abstractFactory = (() => {
  let jobs = {};
  return {
    addJob: (job, Character) => {
      if (Character.prototype.attack) {
        // attack 메소드가 있어야만 등록 가능
        jobs[job] = Character;
      }
    },
    create: (job, options) => {
      // 등록한 작업을 바탕으로 실제 객체 생성
      let Character = jobs[job];
      return Character ? new Character(options) : null;
    },
  };
})();

const Emperor = (() => {
  class Emperor {
    constructor(options) {
      this.name = options.name;
    }
    attack(target) {
      console.log(this.name, "attacks", target, "\n");
    }
    proclaim() {
      console.log(this.name, "proclaims emperor", "\n");
    }
  }
  return Emperor;
})();

const Governor = (() => {
  class Governor {
    constructor(options) {
      this.name = options.name;
    }
    attack(target) {
      console.log(this.name, "attacks", target, "\n");
    }
    betray() {
      console.log(this.name, "betrays emperor", "\n");
    }
  }
  return Governor;
})();

const Runner = (() => {
  class Runner {
    constructor(options) {
      this.name = options.name;
    }
    attack() {
      return;
    }
    run() {
      console.log(this.name, "runs", "\n");
    }
  }
  return Runner;
})();

module.exports = { abstractFactory, Emperor, Governor, Runner };
