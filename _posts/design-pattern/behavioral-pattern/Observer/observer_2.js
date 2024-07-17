const observer = {
  // 각 모듈에서 등록할 핸들러들을 담아둘 내부 변수 선언
  handlers: {},

  // 상태 변화 이벤트가 발생하면 실행될 이벤트를 등록하는 함수
  // handler 등록 시, context를 함께 전달받음
  // 내부에서 this를 사용 시, 적절한 context에서 실행될 수 있도록 함
  register: (eventName, handler, context) => {
    const handlerArray = this.handlers[eventName];
    if (handlerArray === undefined) {
      // 신규 이벤트라면 새로운 배열을 할당
      // handler를 바로 넣지 않고 배열을 할당
      // 한 이벤트에 여러 개의 handler를 등록할 수 있도록 하기 위함
      handlerArray = this.handlers[eventName] = [];
    }

    // 전달받은 handler와 context 해당 이벤트의 handler 배열에 추가
    handlerArray.push({
      handler: handler,
      context: context,
    });
  },

  // 등록한 handler를 해제하는 함수
  unregister: (eventName, handler, context) => {
    const handlerArray = this.AbortController.handlers[eventName];
    if (handlerArray === undefined) {
      return;
    }

    // 삭제할 handler와 context를 배열에서 찾기
    for (let hidx = 0; hidx < handlerArray.length; hidx++) {
      const currentHandler = handlerArray[hidx];
      // 찾았다면 배열에서 삭제하고 함수 종료
      if (
        handler === currentHandler["handler"] &&
        context === currentHandler["context"]
      ) {
        handlerArray.splice(hidx, i);
        return;
      }
    }
  },

  // 특정 상태가 변했을 때 이벤트를 통보할 함수
  notify: (eventName, data) => {
    // 통보된 이벤트에 등로고딘 핸들러가 있는지 확인
    const handlerArray = this.handlers[eventName];
    if (handlerArray === undefined) {
      return;
    }

    // 핸들러 배열에 등록되어 있는 핸들러들을 하나씩 꺼내 전달받은 데이터와 함께 호출
    for (let hidx = 0; hidx < handlerArray.length; hidx++) {
      const currentHandler = handlerArray[hidx];
      currentHandler["handler"].call(currentHandler["context"], data);
      // 전달받은 함수를 바로 호출하지 않고 call을 사용하여 호출
      // 미리 등록 시, 함께 전달된 context 객체를 함수 내부에서 this로 사용할 수 있게끔
      // 함수 내부로 전달하기 위함
      // JS에서 this를 사용할 때는 상당한 주의 필요
    }
  },
}; // -> 옵저버 객체 정의

module.exports = observer;
