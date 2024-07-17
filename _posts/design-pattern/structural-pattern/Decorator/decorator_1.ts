interface Character {
  attack(): void;
}

class Warrior implements Character {
  attack(): void {
    console.info("Attack with sword");
  }
}

class Wizard implements Character {
  attack(): void {
    console.info("Attack with magic");
  }
}

abstract class MergedCharacter implements Character {
  protected readonly character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  attack(): void {
    this.character.attack();
  }
}

class AdvanedCharacter extends MergedCharacter {
  constructor(character: Character) {
    super(character);
  }

  attack(): void {
    super.attack();
    this.advancedAttack();
  }

  private advancedAttack() {
    console.info("advanced attack");
  }
}

const c_1 = new Warrior();
c_1.attack();

const c_2 = new Wizard();
c_2.attack();

const advanced_c_1 = new AdvanedCharacter(new Warrior());
advanced_c_1.attack();
