---
layout: Post
title: ! 'DigitalOcean : Cách đăng kí VPS và sử dụng promo code'
date: 2014-11-17 10:12:01
tags: [vps]
---

# VPS là gì ?

**VPS** (*Vitrual Private Servers*) là 1 server ảo có khả năng chạy 24/24 các chương trình mà bạn thiết lập. Bạn có thể chạy các chương trình để kiếm tiền hoặc đặt một website/blog lên đó khi mà bạn đã sử dụng vượt quá giới hạn của các gói shared host(thường là trên 5000 lượt truy cập/ ngày).

Thông thường, giá của một gói VPS đều giao động từ ít nhất $25/tháng cho đến vài trăm $ tuỳ theo nhu cầu sử dụng và uy tín của từng nhà cung cấp.
Vậy thì làm sao để sở hữu được một VPS với giá chỉ $5/tháng? Đó chính là sử dụng dịch vụ Cloud VPS tại **[DigitalOcean](https://www.digitalocean.com/?refcode=15d6dd64d9e4 "VPS chất lượng tại DigitalOcean").**

# Vì sao DigitalOcean lại rẻ?

Vì DigitalOcean cung cấp VPS dưới cấu trúc CloudVPS. Ưu điểm của CloudVPS là tiết kiệm chi phí, giá thành rẻ. Một số dịch vụ cạnh tranh của DigitalOcean cũng sử dụng công nghê CloudVPS như Linode, Amazon, Google Cloud Platform,…

# Hướng dẫn đăng kí tài khoản tại DigitalOcean

Rất đơn giản, các bạn hãy vào [trang chủ của DigitalOcean theo link referral của mình](https://www.digitalocean.com/?refcode=15d6dd64d9e4 "Digital Ocean"). Khi đăng kí theo link của mình, các bạn sẽ nhận được $10 vào tài khoản của mình.

Click vào nút **Sign Up** ở góc phải

![Đăng kí DigitalOcean](/images/2015/01/dang-ki-digitalocean_m4lnm2.jpg)

Điền email và mật khẩu cho tài khoản

![dang-ki-digitalocean1](/images/2015/01/dang-ki-digitalocean11_umiwdo.jpg)

Cuối cùng là bấm **Sign Up.** Bạn sẽ được chuyển thẳng tới trang quản lí của DigitalOcean luôn. Hãy nhớ xác nhận đăng kí qua email trước khi thực hiện bước tiếp theo nhé.

# Nhập Promo Code

DigitalOcean thường xuyên cung cấp các Promo Code trị giá $10 và $20 cho các tài khoản mới đăng kí. Các bạn hãy chuyển sang phần Billing trong menu bên trái.

![dangki-digitalocean 2](/images/2015/01/dangki-digitalocean-2_h4x7i9.jpg)

Kéo xuống dưới sẽ có phần nhập PromoCode :

![digitalocean-25credits](/images/2015/01/digitalocean-25credits_sqtkaq.jpg)

Ở thời điểm hiện tại thì Promocode **SFDOCOREOS25** có giá trị $25 đang còn hạn sử dụng. Nếu dùng PromoCode này các bạn sẽ có thêm được 5 tháng sử dụng gói 512 RAM của DigitalOcean. (yay)

Nếu Promo Code trên không sử được, hãy vào tìm [Promo Code mới cho Digital Ocean tại đây](http://www.newcoupons.info/category/digitalocean/ "DigitalOcean Promo Code")

# Nạp tiền và tạo VPS

## Nạp tiền

DigitalOcean yêu cầu bạn phải nạp tiền với số tiền tối thiểu là $5 để có thể sử dụng dịch vụ (dù bạn đã nhập Promo Code hay dùng link referreal của mình).

Để nạp tiền thì cũng trong trang Billing, trong mục **PayPal Payment **các bạn hãy chọn **Pay Now** để nạp $5 qua PayPal (mình khuyến khích các bạn dùng hình thức này). Ngoài PayPal thì các bạn có thể dùng Credit Card/Debit Card. Đặc biệt là không dùng VCC vì tài khoản của bạn sẽ bị suspend và yêu cầu gửi thông tin thật để xác nhận, vô cùng rắc rối.

Để thêm Credit Card thì các bạn nhấn **Add Credit Card** và điền đầy đủ thông tin vào

![dang-ki-digitalocean3](/images/2015/01/dang-ki-digitalocean3_ydzouk.jpg)

## Tạo VPS mới

DigitalOcean gọi các CloudVPS của mình là các Droplet. Sau khi đã nạp tiền vào tài khoản DigitalOcean. Hãy bấm vào nút **Create** bên trái để bắt đầu tại Droplet

![dang-ki-digitalocean4](/images/2015/01/dang-ki-digitalocean4_svlhcs.jpg)

Sau đó các bạn nhập thông tin sau:

![dang-ki-digitalocean5](http://res.cloudinary.com/khoanguyen/image/upload/v1420479956/dang-ki-digitalocean5_uwtirr.jpg)

* Hostname: Không nên nhập domain chính mà nên dùng 1 sub-domain. Nếu bạn không có sẵn domain và chỉ muốn dùng VPS để chạy các chương trình kiếm tiền thì cứ nhập 1 domain bất kì vào đó.
* Select Size: chọn gói VPS. Nếu mới bắt đầu, các bạn có thể chọn gói $5. Ở trong từng bài hướng dẫn VPS, mình sẽ nói rõ cấu hình tối thiểu để chạy các phần mềm kiếm tiền.

* Select Region: Chọn địa điểm đặt VPS. Nếu bạn đăng kí VPS cho mục đích chạy các phần mềm kiếm tiền thì chọn là New York còn nếu muốn phát triển trang web với traffic chính đến từ Việt Nam thì hãy chọn Singapore cho tốc độ nhanh nhất các bạn nhé.

* Select Image: Chọn hệ điều hành sẽ sử dụng

  * Ubuntu 14.04 64bits: Nếu chạy các phần mềm kiếm tiền.
  * CentOS 6.5 64bits: Nếu đặt 1 website vì có nhiều công cụ tối ưu hóa cho CentOS

* Add SSH key: Giúp nâng cao bảo mật (đăng nhập không cần nhập mật khẩu). Mình sẽ có bài hướng dẫn sau, nếu các bạn không thiếu lập ở đây thì sau này vẫn có thể thiết lập thêm.

Cuối cùng là bấm **Create Droplet** đợi khoản 60 giây, IP cùng với mật khẩu của tài khoản root sẽ được gửi tới cho bạn qua email.

# Control Panel quản lí của DigitalOcean

Control Panel sẽ có cấu trúc như hình sau.

![dang-ki-digitalocean6](http://res.cloudinary.com/khoanguyen/image/upload/v1420479953/dang-ki-digitalocean6_bhdpfk.jpg)

Dưới đây là sơ lược các chức năng:

1. **Console Access:** Truy cập vào SSH với tài khoản root ngay trên trình duyệt. Hữu ích khi bạn cấu hình sai dẫn đến không truy cập SSH được (ví dụ như cấu hình tường lửa sai)
2. **Power:** bật/tắt, restart droplets. Các bạn lưu ý là Droplets dù đã tắt vẫn bị tính tiền như Droplets đang chạy vì nó vẫn chiếm bộ nhớ và DigitalOcean phải dành riêng CPU/RAM dự phòng cho nó
3. **Access:** Trong đây sẽ có** Console Access** như mình đã nói ở trên và **Reset Root Password** để đổi mật khẩu tài khoản root/
4. **Resize:** Thay đổi gói Droplets, yêu cầu phải tắt Droplet trước.
5. **Snapshot:** Sao lưu/ phục hồi trạng thái hiện tại của Droplet, yêu cầu phải tắt Droplets trước.
6. **Cấu hình:** Droplet cơ bản đổi hostname, kernel.
7. **Graphs:** biểu đồ về Droplet gồm traffic, CPU, Disk
8. **Destroy:** Xóa bỏ vĩnh viễn Droplet

# Kết luận

Mình đã hướng dẫn các bạn cách đăng kí và tạo VPS với dịch vụ DigitalOcean, chúc các bạn kiếm tiền vui vẻ.
