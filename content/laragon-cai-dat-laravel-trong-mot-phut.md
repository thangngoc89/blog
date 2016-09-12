---
layout: Post
title: 'Laragon - Cài đặt Laravel trong 1 phút'
date: 2015-03-11 20:00:00
description: 'Hướng dẫn cài đặt Laragon - Laravel 5/4.2 trong một phút'
tags: [laravel]
---

# Giới thiệu

Laravel là một framework mạnh mẽ, giúp cho việc viết code trở nên "thú vị" hơn cũng như ít code hơn. Nhưng đối với các bạn mới bắt đầu tìm hiểu về Laravel từ nền tảng PHP cơ bản hay từ các framework khác chuyển qua thì việc cài đặt Laravel là cả 1 vấn đề. Bao gồm 1 webserver PHP cơ bản (từ PHP 5.4.0 thì PHP có built-in webserver tích hợp nên bước này có thể bỏ qua), Composer, Mcrypt, thiết lập Virtual host,...

Thông thường trên các hệ điều hành *NIX (Linux, MacOS). Bạn có thể dễ dàng cài đặt chúng qua

[Laragon](http://laragon.org) ra đời nhằm mục đích khắc phục điều đó. Và theo video trên trang chủ thì bạn chỉ mất 1 phút để cài đặt xong Laragon.

@[youtube](XuYkGdrXmKg)

*một điều thú vị là tác giả Laragon hình như là 1 người Việt (Le Ngoc Khoa) - chưa có thông tin chính xác*

# Tính năng Laragon

Laragon đi kèm với các phần mềm sau (theo thông tin tại thời điểm viết bài này) :

- Laravel 5 và 4.2
- Apache 2.4.10
- MySQL (MariaDB 10.0.15)
- PHP 5.6.5
- Memcached 1.4.5
- Redis 2.8.17
- Composer

Điều mình thích nhất là khả năng tự động tạo virtual host mỗi khi tạo project mới. Không còn lần mò, copy/paste file host tự động nữa.

**Isolated Enviroment :** Laragon không ảnh hưởng tới hệ điều hành. Bạn có thể dễ dàng copy nó qua folder khác thì nó vẫn hoạt động bình thường. (dạng như là portable software)

# Cài đặt

Laragon tương thích với các phiên bản Windows sau :

- Windows 7
- Windows 8
- Windows 8.1
- Windows 10
(hỗ trợ cả 32-bits và 64-bits)

Download và cài đặt Laragon như một phần mềm bình thường:

[http://sourceforge.net/projects/laragon/](http://sourceforge.net/projects/laragon/)

# Thiết lập

Mở Laragon sau khi cài đặt và giao diện chính sẽ xuất hiện :

![Giao diện chính Laragon](http://laragon.org/themes/multi/assets/images/screenshot/laragon-main-interface.png)

Các bạn có thể bấm

- Web để truy cập vào webserver
- Database để truy cập phpmyadmin (user: root, không có mật khẩu).
- Shell để kích hoạt Cmder (một command line với giao diện thân thiện hơn Command Prompt mặc định của Windows)

# Cài đặt Laravel

![Cài đặt Laravel với Laragon](http://laragon.org/themes/multi/assets/images/screenshot/laragon-laravel-windows.png)

Bấm chuột phải vào biểu tượng Laragon ở thanh công cụ (gần đồng hồ). >> Laravel >> Create project >> Laravel 5/4.2

Gõ tên project của bạn vào (ví dụ khoanguyen). Chờ một chút , Laragon sẽ tạo 1 project mới trong thư mục con www của Laragon (mặc định là C:/lamp/www). Nếu ần đầu tiên cài Laravel thì sẽ hơi lâu, composer sẽ phải tải tất cả dependency về, các lần sau sẽ nhanh hơn nhiều do đã có sẵn trong máy (cached).

Sau khi Laragon cài đặt xong, thử mở trình duyệt lên, truy cập vào địa chỉ :

```noob
http://tên-project.dev
```

(mình đặt tên project là khoanguyen thì sẽ truy cập vào [http://khoanguyen.dev](http://khoanguyen.dev) )

Và một cách thần kì, giao diện Laravel chào mừng của Laravel ngay lập tức xuất hiện:

Laravel 5
![Laravel 5](https://wiki.bitnami.com/@api/deki/files/1143/=laravel5-welcome.png "Laravel 5")

 hay Laravel 4.2

![Laravel 4.2](/images/2015/01/laravel-welcome.png "Laravel 5")

> Sự thần kì này có được là do tính năng Auto Virtual Hosts

Laragon sẽ tự động tạo virtual host với tên miền là tên folder trong thư mục www của bạn.

# Kết luận

Laragon giúp tiết kiệm rất nhiều thời gian khi làm quen, viết code PHP và Laravel. Hãy trải nghiệm Laragon và chia sẽ với bạn bè nhé.
