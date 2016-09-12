---
layout: Post
title: Cài đặt Wine chạy các ứng dụng Windows trên Ubuntu
date: 2014-11-16 13:31:45
tags: [vps]
---

# Mở đầu

Chắc hẳn các bạn ai cũng biết, giá VPS linux thường rẻ hơn VPS Windows (phí bản quyền) nhưng hầu hết các ứng dụng kiếm tiền (cũng như các ứng dụng cơ bản khác) đều chỉ có thể chạy trên Windows.
**Wine** ra đời để giải quyết vấn đề này. Trong bài viết này mình sẽ hướng dẫn các bạn cách cài đặt Wine cũng như các ứng dụng Windows trên Wine.

# Yêu cầu:

- 1 VPS mới tinh chạy Ubuntu 14.04 64-bits
- Tối thiểu 512MB RAM
- Quyền root của VPS
- Tham khảo : Các VPS giá rẻ dùng để chạy các ứng dụng kiếm tiền (updating)

# Cài đặt Wine

- Cập nhật các resposity của Ubuntu

Đây là 1 thao tác các bạn nên sử dụng thường xuyên để đảm bảo cho VPS luôn ở trạng thái bảo mật cao nhất

```shell
apt-get update && apt-get upgrade
```

- Cài đặt nano (nếu chưa) để thuận tiện cho việc sửa file

```shell
apt-get install nano
```

- Cài đặt giao diện người dùng cho Ubuntu. Các bạn kiên nhẫn vì thao tác này tốn khá nhiều thời gian

```shell
apt-get install xorg lxde-core tightvncserver
```

- Cài đặt Wine

```shell
apt-get install wine
```

- Thêm người dùng mới dành cho VNC

```shell
adduser vnc
```

Gõ mật khẩu cho user mới 2 lần

- Kích hoạt VNC

```shell
tightvncserver :1
```

Gõ mật khẩu để đăng nhập VNC. Các bạn nên dùng giống với mật khẩu của user vnc luôn cho tiện

- Tắt VNC và bắt đầu config

tightvncserver -kill :1 nano ~/.vnc/xstartup

- Các bạn thêm các đoạn sau cuối file

```shell
lxterminal & /usr/bin/lxsession -s LXDE &
```

- Cuối cùng là khởi đăng lại VPS và đăng nhập vào user vnc với mật khẩu bạn đã tạo ở trên

```shell
reboot
```

- Kích hoạt VNC. Trong đó 800×640 là độ phân giải. Bạn có thể thay đổi nó tùy ý thích (độ phân giải càng cao càng hao tốn tài nguyên)

```shell
vncserver :1 -geometry 800x640 -depth 16 -pixelformat rgb565
```

- Các bạn có thể dùng 1 chương trình VNC bất kì để đăng nhập vào VPS của bạn theo địa chỉ 192.68.1.1:1 (thay đúng IP lại cho đúng nha)

![Cài đặt Wine trên Ubuntu](/images/2015/01/Screenshot_1_o7obkk.jpg)

# Cài đặt ứng dụng Windows trên Wine

Mặc định thì Wine không có sẵn trình duyệt nên các bạn có thể dùng các lệnh sau để tải và cài đặt Firefox:

Vẫn truy cập bằng user vnc gõ lệnh

```shell
cd Desktop wget -O installFirefox.exe https://download.mozilla.org/?product=firefox-stub&os=win&lang=en-US
```

Vào VNC các bạn sẽ thấy file installFirefox.exe có sẵn trên Desktop, nhấn phải chọn Wine Windows Program Loader và cài đặt như trên Windows .

# ![cài đặt firefox trên ubuntu](/images/2015/01/Screenshot_2_x7co9t.jpg)

Chỉ với khoảng 10-20 phút, các bạn đã có thể có 1 VPS giá rẻ dành để chạy các ứng dụng Windows.
