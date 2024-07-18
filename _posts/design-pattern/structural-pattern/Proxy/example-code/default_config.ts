export interface ISubject {
  action(): void;
}

export class RealSubject implements ISubject {
  action(): void {
    console.log("원본 객체 액션");
  }
}
