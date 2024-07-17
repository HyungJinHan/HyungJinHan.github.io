export class Memory {
  public static size: number = 0; // 메모리 사용량

  public static print_memory(): void {
    console.log("총 메모리 사용량 : " + Memory.size + "MB" + "\n");
  }
}
