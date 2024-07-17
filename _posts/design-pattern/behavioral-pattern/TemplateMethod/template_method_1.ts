abstract class AbstractClass {
  public templateMethod(): void {
    this.baseOperation_1();
    this.requireOperations_1();
    this.baseOperation_2();
    this.hook_1();
    this.requireOperations_2();
    this.baseOperation_3();
    this.hook_2();
  }

  protected baseOperation_1(): void {
    console.log("AbastractClass says: I'm doing the bulk of the work");
  }

  protected baseOperation_2(): void {
    console.log(
      "AbastractClass says: But I let subclasses override some operations"
    );
  }

  protected baseOperation_3(): void {
    console.log("AbastractClass says: I'm doing the bulk of the work");
  }

  protected abstract requireOperations_1(): void;
  protected abstract requireOperations_2(): void;

  protected hook_1(): void {}
  protected hook_2(): void {}
}

class ConcreteClass_1 extends AbstractClass {
  protected requireOperations_1(): void {
    console.log("ConcreteClass_1 says: Implemented Operation 1");
  }

  protected requireOperations_2(): void {
    console.log("ConcreteClass_1 says: Implemented Operation 2");
  }
}

class ConcreteClass_2 extends AbstractClass {
  protected requireOperations_1(): void {
    console.log("ConcreteClass_2 says: Implemented Operation 1");
  }

  protected requireOperations_2(): void {
    console.log("ConcreteClass_2 says: Implemented Operation 2");
  }

  protected hook_1(): void {
    console.log("ConcreteClass_2 says: Overridden Hook 1");
  }
}

function clientCode(abstractClass: AbstractClass) {
  abstractClass.templateMethod();
}

console.log("----------------------------------------------------------------");
console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass_1());
console.log("");

console.log("Same client code can work with different subclasses:");
clientCode(new ConcreteClass_2());
console.log("----------------------------------------------------------------");
