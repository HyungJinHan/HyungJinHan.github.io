/*
<예제 요구사항>

- 멀티 플랫폼을 지원하는GUI 도구를 만들 예정

- Mac 운영체제와 Windows 운영체제의 버튼을 만듦

- 버튼의 요구사항은 아래와 같음
  - 버튼에는 색상이 들어갈 수 있음
  - 버튼을 클릭하면 실행될 이벤트를 줄 수 있음
*/

/**
 * Abstraction
 */
interface IButton {
  onClick(): void;
}

/**
 * Implementation
 */
interface IColor {
  getColorCode(): string;
}

export { IButton, IColor };
