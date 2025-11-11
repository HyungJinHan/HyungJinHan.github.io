package singleton_double_checked_locking;

class SingletonDoubleCheckedLocking {
  private static volatile SingletonDoubleCheckedLocking instance; // volatile 키워드 적용

  private SingletonDoubleCheckedLocking() {}
  
  public static SingletonDoubleCheckedLocking getInstance() {
    if (instance == null) {
      // 메서드에 동기화를 거는 것이 아닌, Singleton 클래스 자체에 동기화를 걸어둠
      synchronized (SingletonDoubleCheckedLocking.class) {
        if (instance == null) {
          instance = new SingletonDoubleCheckedLocking();
          // 최초 초기화만 동기화 작업이 일어나서 리소스 낭비를 최소화
        }
      }
    }

    return instance; // 최초 초기화가 되면 앞으로 생성된 인스턴스만 반환
  }
}