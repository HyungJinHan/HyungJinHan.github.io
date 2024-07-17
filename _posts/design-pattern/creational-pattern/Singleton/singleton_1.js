const singleton = (() => {
  const a = "Hello";
  const initiate = () => {
    return {
      a: a,
      b: () => {
        console.log(a);
      },
    };
  };

  return {
    getInstace: (instance) => {
      if (!instance) {
        instance = initiate();
      }
      return instance;
    },
  };
})();

const first = singleton.getInstace();
const second = singleton.getInstace("World");

console.log(`first: ${first} / second: ${second}`);
