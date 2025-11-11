package singleton_thread_safe;

class SingletonThreadSafe {
  private static SingletonThreadSafe instance;

  private SingletonThreadSafe() {}
  
  // synchronized 메서드
  public static synchronized SingletonThreadSafe getInstance() {
    if (instance == null) {
      instance = new SingletonThreadSafe();
    }

    return instance;
  }
}
