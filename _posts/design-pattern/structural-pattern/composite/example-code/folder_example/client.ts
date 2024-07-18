import { Folder } from "./composite";
import { File } from "./leaf";

class Client {
  public static main(_args?: []): void {
    const root: Folder = new Folder("root");

    const file_1: File = new File("file_1", 10);

    const sub_1: Folder = new Folder("sub_1");
    const sub_2: Folder = new Folder("sub_2");

    root.add(sub_1);
    root.add(file_1);
    root.add(sub_2);

    const file_1_1: File = new File("file_1_1", 10);
    const file_1_2: File = new File("file_1_2", 10);

    sub_1.add(file_1_1);
    sub_1.add(file_1_2);

    const file_2_1: File = new File("file_2_1", 10);

    sub_2.add(file_2_1);

    // 전체 dir 출력
    root.print("");
  }
}

Client.main();
// 📂 root (40KB)
//    📂 sub_1 (20KB)
//       📄 file_1_1 (10KB)
//       📄 file_1_2 (10KB)
//    📄 file_1 (10KB)
//    📂 sub_2 (10KB)
//       📄 file_2_1 (10KB)
