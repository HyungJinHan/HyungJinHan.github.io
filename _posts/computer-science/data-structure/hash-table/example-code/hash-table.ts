// string 자료형의 key에 해당하는 공간에 string 자료형의 value를 집어넣은 것

// 1. Hash Table 생성
class HashTable {
  // 1) 해시 테이블 사이즈에 바로 접근할 수 있도록 변수 생성
  // 2) setItem 할 때마다 numItems++되어 table에 들어있는 개수를 그때마다 반영
  // 3) 이 값을 활용하여 table의 길이 대비 현재 들어있는 값의 개수를 연산
  // 4) 특정 수준 이상으로 값이 할당이 되면 table의 길이를 늘림
  table = new Array(3);
  numItems = 0;

  setItem = (key: string, value: string | number) => {
    this.numItems++;

    // table의 원소 개수가 80% 이상 차있는 경우 resize()
    const loadFactor = this.numItems / this.table.length;

    if (loadFactor >= 0.8) this.resize();

    const idx = hashStringToInt(key, this.table.length);

    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  // 만약 배열의 크기를 3에서 6으로 두 배를 했다면, 그보다 큰 소수인 7을 새로운 table의 크기로 설정
  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item: any[]) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  getItem = (key: string) => {
    const idx = hashStringToInt(key, this.table.length);
    // 값이 없는 경우 null
    if (!this.table[idx]) return null;

    // 단순히 전체 table의 index로 접근 = O(1) but array.find를 사용하면 O(n)으로 증가함
    return this.table[idx].find((el: any[]) => el[0] === key)[1];
  };
}

// 2. 해시 함수(Hash Function)가 필요한 이유
function hashStringToInt(s: string, tableSize: number) {
  let hash = 17;

  // return 3; -> 항상 table[3] index 중복 해시 충돌 발생
  for (let i = 0; i < s.length; i++) {
    hash = (13 * hash * s.charCodeAt(i)) % tableSize;
  }

  return hash;
}

// 생성자 함수 생성 new HashTable();
const myTable = new HashTable();

myTable.setItem("firstName", "형진");
console.log(myTable.table.length); // 3
console.log(myTable.getItem("firstName")); // 형진

myTable.setItem("lastName", "한");
console.log(myTable.table.length); // 3
console.log(myTable.getItem("lastName")); // 한

myTable.setItem("age", 29);
console.log(myTable.table.length); // 6
console.log(myTable.getItem("age")); // 29

myTable.setItem("birth", "1996-12-10");
console.log(myTable.table.length); // 6
console.log(myTable.getItem("birth")); // 1996-12-10
