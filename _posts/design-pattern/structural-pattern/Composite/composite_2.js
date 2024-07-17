function Interface_JS() {
  this.implements = function (obj) {
    let notImplementMethod = [];

    for (const method in this) {
      if (method !== "implements") {
        if (!Object.hasOwnProperty.call(obj.__proto__, method)) {
          notImplementMethod.push(method);
        }
      }
    }

    if (notImplementMethod.length > 0) {
      throw new Error(
        obj.__proto__.constructor.name +
          "클래스의 " +
          notImplementMethod.join() +
          "메서드가 구현되지 않았습니다."
      );
    }
  };
}

function Component_JS() {
  if (this.constructor === Component_JS) {
    throw new Error(
      this.constructor.name + "인터페이스는 객체를 생성할 수 없습니다."
    );
  }

  return (function () {
    let method = {
      getElement: function () {},
    };

    Interface_JS.call(method);

    return method;
  })();
}

function Node_JS(name) {
  Component_JS().implements(this);

  this.child = [];
  this.element = { name: name, child: [] };
}

Node_JS.prototype.getElement = function () {
  return this.element;
};

Node_JS.prototype.add = function (child) {
  this.child.push(child);
  this.getElement().child.push(child.getElement());

  return this;
};

Node_JS.prototype.getChild = function (i) {
  return this.child[i];
};

function Leaf_JS(name) {
  Component_JS().implements(this);
  this.element = { name: name };
}

Leaf_JS.prototype.getElement = function () {
  return this.element;
};

function Client_JS() {}

Client_JS.prototype.test = function () {
  let tree = new Node_JS("Root (Node_JS)");
  let left = new Leaf_JS("Left (Leaf_JS)");
  let right = new Node_JS("Right (Node_JS)");
  tree.add(left).add(right);

  let right_left = new Leaf_JS("Right & Left (Leaf_JS)");
  let right_right = new Node_JS("Right & Right (Node_JS)");
  right.add(right_left).add(right_right);

  console.log(JSON.stringify(tree.getElement()));
};

new Client_JS().test();

// {
//   "name": "Root (Node_JS)",
//   "child": [
//     { "name": "Left (Leaf_JS)" },
//     {
//       "name": "Right (Node_JS)",
//       "child": [
//         { "name": "Right & Left (Leaf_JS)" },
//         { "name": "Right & Right (Node_JS)", "child": [] }
//       ]
//     }
//   ]
// }
