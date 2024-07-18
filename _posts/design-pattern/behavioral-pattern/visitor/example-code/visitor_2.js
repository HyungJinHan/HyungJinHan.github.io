function Interface() {
  this.implements = function (obj) {
    // this는 인터페이스, obj는 인터페이스를 implements한 클래스
    var notImplementMethod = [];

    for (var method in this) {
      if (method !== "implements") {
        var proto = obj.__proto__;

        while (proto) {
          // obj.__proto__ 객체가 method를 가지고 있지 않으면
          if (!Object.hasOwnProperty.call(proto, method)) {
            proto = proto.__proto__;

            if (proto === null) {
              notImplementMethod.push(method);
            }
          } else {
            break;
          }
        }
      }
    }

    if (notImplementMethod.length > 0) {
      throw new Error(
        obj.__proto__.constructor.name +
          " 클래스의 " +
          notImplementMethod.join() +
          " 메서드가 구현되지 않았습니다."
      );
    }
  };
}

function Component() {
  if (this.constructor === Component) {
    throw new Error(
      this.constructor.name + " 인터페이스는 객체를 생성할 수 없습니다."
    );
  }

  return (function () {
    // 인터페이스 정의 메서드
    var method = {
      accept: function (visitor) {},
    };

    // 인터페이스의 implements 메서드를 method객체에 이식한다.
    Interface.call(method);

    return method;
  })();
}

function AComponent() {
  Component().implements(this);

  this.name = "AComponent";
}

AComponent.prototype.accept = function (visitor) {
  visitor.visitAComponent(this);
};

AComponent.prototype.execute = function () {
  console.log("AComponent의 execute 메서드 실행");
};

AComponent.prototype.getName = function () {
  return this.name;
};

function BComponent() {
  Component().implements(this);

  this.name = "BComponent";
}

BComponent.prototype.accept = function (visitor) {
  visitor.visitBComponent(this);
};

BComponent.prototype.execute = function (visitor) {
  console.log("BComponent의 execute 메서드 실행");
};

BComponent.prototype.getName = function () {
  return this.name;
};

function Visitor() {
  if (this.constructor === Component) {
    throw new Error(
      this.constructor.name + " 인터페이스는 객체를 생성할 수 없습니다."
    );
  }

  return (function () {
    // 인터페이스 정의 메서드
    var method = {
      visitAComponent: function (component) {},

      visitBComponent: function (component) {},
    };

    // 인터페이스의 implements 메서드를 method객체에 이식한다.
    Interface.call(method);

    return method;
  })();
}

function AVisitor() {
  Visitor().implements(this);
}

AVisitor.prototype.visitAComponent = function (component) {
  console.log(
    "AVisitor는 " + component.getName() + " 의 execute 메서드를 실행"
  );

  component.execute();
};

AVisitor.prototype.visitBComponent = function (component) {
  console.log(
    "AVisitor는 " + component.getName() + " 의 execute 메서드를 실행"
  );

  component.execute();
};

function BVisitor() {
  Visitor().implements(this);
}

BVisitor.prototype.visitAComponent = function (component) {
  console.log(
    "BVisitor는 " + component.getName() + " 의 execute 메서드를 실행"
  );

  component.execute();
};

BVisitor.prototype.visitBComponent = function (component) {
  console.log(
    "BVisitor는 " + component.getName() + " 의 execute 메서드를 실행"
  );

  component.execute();
};

function Client() {}

Client.prototype.test = function () {
  var components = [new AComponent(), new BComponent()];

  var aVisitor = new AVisitor();

  for (var component of components) {
    component.accept(aVisitor);
  }

  console.log("------------------------");

  var bVisitor = new BVisitor();

  for (var component of components) {
    component.accept(bVisitor);
  }
};

new Client().test();
