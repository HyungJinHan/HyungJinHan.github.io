function find(p: number): void {
  const percent: number = p / 100;
  const result = Math.ceil(Math.sqrt(2 * 365 * Math.log(1 / (1 - percent))));
  console.log(`${result}명이 모였을 때, ${p}% 확률로 생일이 겹침`);
}

find(10);
// 9명이 모였을 때, 10% 확률로 생일이 겹침

find(20);
// 13명이 모였을 때, 20% 확률로 생일이 겹침

find(30);
// 17명이 모였을 때, 30% 확률로 생일이 겹침

find(40);
// 20명이 모였을 때, 40% 확률로 생일이 겹침

find(50);
// 23명이 모였을 때, 50% 확률로 생일이 겹침

find(60);
// 26명이 모였을 때, 60% 확률로 생일이 겹침

find(70);
// 30명이 모였을 때, 70% 확률로 생일이 겹침

find(80);
// 35명이 모였을 때, 80% 확률로 생일이 겹침

find(90);
// 41명이 모였을 때, 90% 확률로 생일이 겹침

find(99);
// 58명이 모였을 때, 99% 확률로 생일이 겹침
