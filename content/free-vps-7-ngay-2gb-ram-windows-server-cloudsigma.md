---
layout: Post
title: Free VPS 7 ngày 2GB RAM Windows Server từ CloudSigma
date: 2014-11-24 16:46:11.000000000 -05:00
tags: [vps]
toc: false
---

Hiện tại CloudSigma đang có chương trình free trial VPS với các thông số như sau:

- 2GB RAM
- CPU 2GHz
- Bandwidth 5 GB (vừa đủ để anh em nhà mình chiến hitleap trong 1 tuần)

Mình đã tạo cỡ 10 tài khoản với 10 VPS chạy tới hôm nay là ngày thứ 5 và mọi thứ vẫn bình thường.

**Yêu cầu duy nhất:** Có 1 email của công ty, mình lấy luôn email của 2 domain của mình là khoanguyen.me và tienganhratde.com. Các bạn có thể search để thử các dạng “disposable email” như 10minutemail để thử xem sao nhé

Sau đây mình sẽ hướng dẫn anh em đăng kí trên trang này:

- Vào trang chủ : [https://www.cloudsigma.com/](https://www.cloudsigma.com/ "CloudSigma HomePage"). Nhấn vào **Start My Cloud**

![cloudsigma](http://res.cloudinary.com/khoanguyen/image/upload/v1420479682/1_fmxsy8.jpg)

- Cửa sổ chào mừng của CloudSigma hiện lên, chọn **Create and Start a server**
![cloudsigma](/images/2015/01/cloudsigma.jpg)

- Nó sẽ hiện ra khung mới kèm với hướng dẫn, cứ nhấn nút **Stop tutorial** ở bên dưới cho lẹ.  
![cloudsigma](/images/2015/01/cloudsigma2.jpg)

- Điền email vào khung, lưu ý, không dùng những dịch vụ email free như gmail, yahoo nhé. Các bạn thử email nào hoạt động thì báo lại cho mình hen  
![cloudsigma](/images/2015/01/cloudsigma4.jpg)

- Nhấn Sign Up rồi vào Email nhấn link kích hoạt
![cloudsigma](/images/2015/01/cloudsigma5.jpg)

- Sau khi nhấn vào link trong email, bạn sẽ được dẫn tới trang mới, nhập mật khẩu mới vào.  
![cloudsigma](/images/2015/01/cloudsigma6.jpg)

- Xác nhận bằng số điện thoại. Ở đây mình dùng textPlus ([Android](http://www.oni.vn/9hERb) | [iPhone](http://www.oni.vn/G2gK2) | [Windows Phone](http://www.oni.vn/xZw0S)) ,
tạo tài khoản rồi kích hoạt email, vào **Setting > Contact Info** để lấy cho bạn 1 số điện thoại US (bất cứ soft nào chức năng tương tự đều có thể dùng được)

- Mình chọn gọi tự động vì nhắn SMS gần 1 tiếng mới nhận được (đối với textPlus). Nó gọi tới thì nhấn 1 và nghe. Nó nói giọng Anh, mà đọc theo kiểu sồ đếm chứ không đọc từng số cho bạn nghe. (Hơi khó 1 xíu). Nghe lanh62 đầu không được thì nhấn số 2 nó đọc lần nữa. Nghe không được nữa thì bầm trên web cho nó gọi lại
![cloudsigma](/images/2015/01/cloudsigma7.jpg)

- Xác nhận xong ra giống vậy, nhấn vào **My Server** ở trên cùng
![cloudsigma](http://res.cloudinary.com/khoanguyen/image/upload/v1420479551/8_m2tcyj.jpg)

- Bấm **Create** và điền các thông tin vào
![cloudsigma](/images/2015/01/cloudsigma10.jpg)

- Chuyển qua tab **Drives** chọn như trong hình (Attach Drive > Drive from Marketplace)  
![cloudsigma](/images/2015/01/cloudsigma11.jpg)

- Ở đây mình chọn Windows Server Standard 2008 with SP2, các bạn có thể chọn lên Windows Server 2012 R1 cũng được. Do dùng quen bản 2008 rồi nên mình chọn.  
![cloudsigma](/images/2015/01/cloudsigma12.jpg)

- Tạo xong đợi 5 phút, rồi bấm **Start**
![cloudsigma](/images/2015/01/cloudsigma13.jpg)

- Ở đây bạn có 3 lựa chọn, 1 là bấm như trong hình để khởi động VNC lên trong trình duyệt

- Hoặc là dùng trình VNC bất kì với link trong mục VNC Link, mật khẩu trong VNC Password.

- Hoặc là Remote Desktop tới Public IP
![13](/images/2015/01/131_cr07m9.jpg)

- Tìm mật khẩu tài khoản mật định: Dù bạn có dùng cách nào thì cũng cần có tài khoản mặc định để đăng nhập vào

- Chuyển qua tab My Drives ở trên cùng (Cùng hàng với My Server). Rê chuột lên VPS của bạn để lấy mật khẩu/tài khoản mặc định
![17](/images/2015/01/171_uj8tkb.jpg)

- Ở bước này, dù bạn có chọn cách kết nối nào trong 3 cách kết nối phía trên thì cũng giống nhau nhé. Trong hình mình đang dùng **Remote Desktop**
[![cloudsigma](/images/2015/01/14_cg0qej.jpg)](/images/2015/01/14_cg0qej.jpg)
![cloudsigma](/images/2015/01/15_m12czg.jpg)

- **I Agree** >> Nhập tên máy vào (gì cũng được) >> **Start**
![cloudsigma](http://res.cloudinary.com/khoanguyen/image/upload/v1420479397/16_u89fzz.jpg)

- Bấm **CTRL + ALT +DELETE** để đăng nhập, nếu dùng VNC thì sẽ có 1 nút riêng để bạn truyền tổ hợp đó vào
![cloudsigma](/images/2015/01/cloudsigma9.jpg)

Sau khi nhập mật khẩu mật định rồi, nó sẽ yêu cầu bạn đổi mật khẩu mới, hãy nhập 1 mật khẩu của riêng bạn.

Xong rồi. Tới đây là bạn đã có 1 con VPS ngon lành trong 7 ngày. Kiếm cỡ 10k hitleap dễ như chơi. Chỉ cần lập lại quy trình trên để kiếm được nhiều VPS hơn nhé.
