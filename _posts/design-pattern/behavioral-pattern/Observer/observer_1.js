// Proxy Get
const handler = {
  get: (target, name) => {
    return name === "name" ? `${target.a} ${target.b}` : target[name];
  },
};

const p = new Proxy({ a: "Han", b: "Hyung-Jin" }, handler);

console.log(p.name);
// Han Hyung-Jin

// Proxy Set
const createReactiveObject = (tartget, callback) => {
  const proxy = new Proxy(tartget, {
    set(obj, prop, value) {
      if (value !== obj[prop]) {
        const prev = obj[prop];

        obj[prop] = value;
        callback(`${prop}: [${prev}] >> [${value}]`);
      }

      return true;
    },
  });

  return proxy;
};

const a = { Han: "Han" };
const b = createReactiveObject(a, console.log);
b.Han = "a";
b.Han = "bc";
// Han: [Han] >> [a]
// Han: [a] >> [bc]
