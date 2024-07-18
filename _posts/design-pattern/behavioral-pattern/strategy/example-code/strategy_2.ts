// Run | Walk 전략 (추상화된 알고리즘)
interface MoveStrategy {
  move(): void;
}

class Walk implements MoveStrategy {
  public move(): void {
    console.log("걸어서 배달합니다.");
  }
}

class Run implements MoveStrategy {
  public move(): void {
    console.log("뛰어서 배달합니다.");
  }
}

// 한국어 | 일본어 번역 전략 (추상화된 알고리즘)
interface TranslateStrategy {
  translate(): void;
}

class Korean implements TranslateStrategy {
  public translate(): void {
    console.log("한국어로 번역합니다.");
  }
}

class Japanese implements TranslateStrategy {
  public translate(): void {
    console.log("일본어로 번역합니다.");
  }
}

// Context (전략 등록 / 실행)
class Robot {
  moveStrategy: MoveStrategy;
  translateStrategy: TranslateStrategy;

  constructor(
    moveStrategy: MoveStrategy,
    translateStrategy: TranslateStrategy
  ) {
    this.moveStrategy = moveStrategy;
    this.translateStrategy = translateStrategy;
  }

  move(): void {
    this.moveStrategy.move();
  }

  translate(): void {
    this.translateStrategy.translate();
  }

  setMove(moveStrategy: MoveStrategy) {
    this.moveStrategy = moveStrategy;
  }

  setTranslate(translateStrategy: TranslateStrategy) {
    this.translateStrategy = translateStrategy;
  }
}

// Client (전략 교체 / 전략 실행한 결과를 얻음)
class User {
  public static main(_args?: string[]): void {
    const robot: Robot = new Robot(new Walk(), new Korean());
    robot.move(); // 걸어서 배달합니다.
    robot.translate(); // 한국어로 번역합니다.

    console.log("");

    // 로봇의 전략(기능)을 Run과 일본어 번역으로 변경
    robot.setMove(new Run());
    robot.setTranslate(new Japanese());

    robot.move(); // 뛰어서 배달합니다.
    robot.translate(); // 일본어로 번역합니다.
  }
}

User.main();
