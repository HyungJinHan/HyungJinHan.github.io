class Context {
  private state?: State;

  constructor(state: State) {
    this.transitionTo(state);
  }

  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  public request_1(): void {
    this.state?.handle_1();
  }

  public request_2(): void {
    this.state?.handle_2();
  }
}

abstract class State {
  protected context?: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract handle_1(): void;

  public abstract handle_2(): void;
}

class ConcreteState_A extends State {
  public handle_1(): void {
    console.log("ConcreteState_A handles request_1");
    console.log("ConcreteState_A wants to change the state of the context");
    this.context?.transitionTo(new ConcreteState_B());
  }

  public handle_2(): void {
    console.log("ConcreteState_A handles request_2");
  }
}

class ConcreteState_B extends State {
  public handle_1(): void {
    console.log("ConcreteState_B handles request_1");
  }

  public handle_2(): void {
    console.log("ConcreteState_B handles request_2");
    console.log("ConcreteState_B wants to change the state of the context");
    this.context?.transitionTo(new ConcreteState_A());
  }
}

const context = new Context(new ConcreteState_A());
context.request_1();
context.request_2();
