/**
 * Mediator 클래스 : 중개자
 */
class ChatRoom {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  sendMessage(sender, message) {
    for (const user of this.users) {
      if (user !== sender) {
        user.receiveMessage(sender, message);
      }
    }
  }
}

/**
 * Colleague 클래스 : 사용자
 */
class User {
  constructor(name, chatRoom) {
    this.name = name;
    this.chatRoom = chatRoom;
  }

  sendMessage(message) {
    console.log(`${this.name}이(가) 메세지를 전송합니다: ${message}`);
    this.chatRoom.sendMessage(this, message);
  }

  receiveMessage(sender, message) {
    console.log(
      `${this.name}이(가) ${sender.name}로부터 메시지를 수신합니다: ${message}`
    );
  }
}

const chatRoom = new ChatRoom();

// 사용자 인스턴스 생성 및 중개자 설정
const user1 = new User("Alice", chatRoom);
const user2 = new User("Bob", chatRoom);
const user3 = new User("Charlie", chatRoom);

// 중개자에 사용자 추가
chatRoom.addUser(user1);
chatRoom.addUser(user2);
chatRoom.addUser(user3);

user1.sendMessage("Hello, World");
// Alice이(가) 메세지를 전송합니다: Hello, World
// Bob이(가) Alice로부터 메시지를 수신합니다: Hello, World
// Charlie이(가) Alice로부터 메시지를 수신합니다: Hello, World
