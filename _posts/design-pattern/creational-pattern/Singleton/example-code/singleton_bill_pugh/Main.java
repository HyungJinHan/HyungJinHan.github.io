package singleton_bill_pugh;

 class SingletonBillPugh {
   private SingletonBillPugh() {}
  
   // static 내부 클래스를 이용
   // Holder로 만들어, 클래스가 메모리에 로드되지 않고 getInstance 메서드가 호출되어야 로드됨
   private static class SingleInstanceHolder {
     private static final SingletonBillPugh INSTANCE = new SingletonBillPugh();
   }
   
   public static SingletonBillPugh getInstance() {
     return SingleInstanceHolder.INSTANCE;
   }
}