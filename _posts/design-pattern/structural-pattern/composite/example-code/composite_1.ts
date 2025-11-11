abstract class Component {
  protected parent!: Component | null;

  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public add(component: Component): void {}

  public remove(component: Component): void {}

  public isComposite(): boolean {
    return false;
  }

  public abstract operation(): string;
}

class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

class Composite extends Component {
  protected children: Component[] = [];

  public add(component: Component): void {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);

    component.setParent(null);
  }

  public isComposite(): boolean {
    return true;
  }

  public operation(): string {
    const results: string[] = [];
    for (const child of this.children) {
      results.push(child.operation());
    }

    return `Branch(${results.join(" + ")})`;
  }
}

const clientCode_1 = (component: Component) => {
  console.log(`RESULT: ${component.operation()}`);
};

const clientCode_2 = (component_1: Component, component_2: Component) => {
  if (component_1.isComposite()) {
    component_1.add(component_2);
  }
  console.log(`RESULT: ${component_1.operation()}`);
};

const simple = new Leaf();
const tree = new Composite();
const branch_1 = new Composite();
const branch_2 = new Composite();

console.log("Client: I've got a simple component:");
clientCode_1(simple);
console.log("");

branch_1.add(new Leaf());
branch_1.add(new Leaf());
branch_2.add(new Leaf());

tree.add(branch_1);
tree.add(branch_2);

console.log("Client: Now I've got a composite tree:");
clientCode_1(tree);
console.log("");

console.log(
  "Client: I dont't need  to check the components classes even when managing the tree:"
);
clientCode_2(tree, simple);

// Client: I've got a simple component:
// RESULT: Leaf

// Client: Now I've got a composite tree:
// RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf+Leaf))

// Client: I dont't need  to check the components classes even when managing the tree:
// RESULT: Branch(Branch(Leaf+Leaf)+Branch(Leaf+Leaf)+Leaf)
