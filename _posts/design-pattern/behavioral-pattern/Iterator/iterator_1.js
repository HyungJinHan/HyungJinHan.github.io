let Iterator = (function () {
  class Iterator {
    constructor(elements) {
      this.elements = elements;
      this.index = 0;
    }
    next() {
      console.log(this.elements[this.index++]);
    }
    done() {
      return this.elements.length === this.index;
    }
  }

  return Iterator;
})();

let iterator = new Iterator([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

while (!iterator.done()) {
  iterator.next();
}
