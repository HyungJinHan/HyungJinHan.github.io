class Subject {
  constructor() {
    this.observers = [];
  }

  registerObserver(observer) {
    this.observers.push(observer);
  }

  unregisterObserver(observer) {
    this.observers = this.observers.filter(
      (registedObserver) => registedObserver !== observer
    );
  }

  notifyObservers(data) {
    // 함수로 넣었을 때
    // this.observers.forEach(observer => observer(data));
    this.observers.forEach((observer) => observer.notify(data));
  }
}

const subject$ = new Subject();

// 객체가 아닌 함수로 넣었을 때.
// const observer1 = data => console.log('first ' + data);
// const observer2 = data => console.log('second ' + data);
const observer1 = { notify: (str) => console.log("first " + str) };
const observer2 = { notify: (str) => console.log("second " + str) };

subject$.registerObserver(observer1);
subject$.registerObserver(observer2);

subject$.notifyObservers("test");
