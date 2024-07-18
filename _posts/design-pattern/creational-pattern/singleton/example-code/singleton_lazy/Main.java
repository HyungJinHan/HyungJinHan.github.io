package singleton_lazy;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// 싱글턴 객체
class SingletonLazy {
    private static SingletonLazy instance;

    private SingletonLazy() {}

    public static SingletonLazy getInstance() {
        if (instance == null) {
            instance = new SingletonLazy(); // 오직 1개의 객체만 생성
        }

        return instance;
    }
}

public class Main {
    public static void main(String[] args) {
        // 1. 싱글턴 객체를 담을 배열
        SingletonLazy[] singleton = new SingletonLazy[10];

        // 2. 스레드 풀 생성
        ExecutorService service = Executors.newCachedThreadPool();

        // 3. 반복문을 통해 10개의 스레드가 동시에 인스턴스 생성
        for (int i = 0; i < 10; i++) {
            final int num = i;
            service.submit(() -> {
                singleton[num] = SingletonLazy.getInstance();
            });
        }

        // 4. 종료
        service.shutdown();
		
        // 5. 싱글턴 객체 주소 출력
        for(SingletonLazy s : singleton) {
            System.out.println(s.toString());
        }
    }
}

// singleton_lazy.SingletonLazy@7f31245a
// singleton_lazy.SingletonLazy@6d6f6e28
// ---------------------------------------> 싱글턴 클래스인데 객체 두 개가 만들어짐
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28
// singleton_lazy.SingletonLazy@6d6f6e28