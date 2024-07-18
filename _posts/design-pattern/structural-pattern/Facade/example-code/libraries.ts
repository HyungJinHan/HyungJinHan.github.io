// DBMS에 저장된 데이터를 나타내는 클래스
class Row {
  private name: string;
  private birthday: string;
  private email: string;

  constructor(name: string, birthday: string, email: string) {
    this.name = name;
    this.birthday = birthday;
    this.email = email;
  }

  public getName(): string {
    return this.name;
  }

  public getBirthday(): string {
    return this.birthday;
  }

  public getEmail(): string {
    return this.email;
  }
}

class DBMS {
  private db = new Map<string, Row>();

  public put(name: string, row: Row): void {
    this.db.set(name, row);
    // Java 코드에서는 put
  }

  // DB에 쿼리를 날려 결과를 받아오는 메소드
  public query(name: string) {
    try {
      setTimeout(() => {}, 1000);
    } catch (e) {}

    return this.db.get(name.toLowerCase());
  }
}

class Caches {
  private caches = new Map<string, Row>();

  public put(row: Row): void {
    this.caches.set(row.getName(), row);
  }

  public get(name: string) {
    return this.caches.get(name);
  }
}

class Message {
  private row: Row;

  constructor(row: Row) {
    this.row = row;
  }

  public makeName(): string {
    return 'Name : "' + this.row.getName() + '"';
  }

  public makeBirthday(): string {
    return "Birthday : " + this.row.getBirthday();
  }

  public makeEmail(): string {
    return "Email : " + this.row.getEmail();
  }
}

export { Caches, DBMS, Message, Row };
