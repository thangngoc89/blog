---
layout: Post
title: "[Video] RunAbove : Kích hoạt Remote Desktop"
date: 2014-11-21 07:34:20
tags: [vps]
---

Mặc định thì trên 1 tài khoản mới và VPS mới tạo thì Remote Desktop không được kích. Điều này gây khó khăn cho một số bạn. Bài viết này mình sẽ hướng dẫn cách kích hoạt Remote Desktop trên RunAbove nhé.

Đối với các bạn chưa biết RunAbove là gì thì vui lòng xem [Hướng dẫn đăng kí và tạo VPS với RunAbove tại đây](/runabove-6-thang-vps-windows-mien-phi/ "RunAbove : 6 tháng VPS 2GB RAM Windows miễn phí")

# Hướng dẫn kích hoạt

## Bật Remote Desktop trên VPS

Đầu tiên bạn vào Panel của RunAbove, chọn VPS của RunAbove, chọn VPS bạn cần thiết lập Remote Desktop và nhấn **Open a Remote Access**

noVNC sẽ hiện ra. Nó giống như là Remote Desktop nhưng hoạt động trên trình duyệt web và thao tác cũng khá khó khăn.

![setup runabove 1](/images/2015/01/setup-runabove-1_jyga0d.jpg)]

> Kéo xuống cuối và chọn Next

![setup runabove 1](/images/2015/01/setup-runabove-2_rfymt7.jpg)]

Nhấn I accept để tiếp tục

Nhập mật khẩu mới cho tài khoản Administrator rồi tiếp tục (đây chính là mật khẩu bạn dùng để login Remote Desktop sau này).

![runabove-remotedesktop](/images/2015/01/runabove-remotedesktop_rlkqjl.jpg)

Tiếp theo, cửa sổ login sẽ xuất hiện

![setup runabove 1](/images/2015/01/setup-runabove-3_xnb0om.jpg)

Kéo trình duyệt lên trên đầu sẽ thấy nút Send **Ctrl + Alt + Delete.** Nhấn vào đó để đăng nhập

![setup runabove 4](/images/2015/01/setup-runabove-4_rxxrkb.jpg)

Khung đăng nhập hiện ra, hãy login với mật khẩu bạn vừa tạo khi nãy

![setup runabove 5](/images/2015/01/setup-runabove-5_gwutki.jpg)

Chúc mừng. Bạn đã login vào VPS lần đầu tiên.

Tiếp đến là cấu hình Remote Desktop. Trong ứng dụng **Server Manager** xuất hiện khi vừa đăng nhập vào VPS. Chọn **Local Server** trong menu bên trái

![setup runabove 6](/images/2015/01/setup-runabove-6_dn4obx.jpg)

Chọn Local Server

Bấm vào **Disabled** ở mục Remote Desktop

![setup runabove 7](/images/2015/01/setup-runabove-7_btsyrt.jpg)

Cửa sổ cấu hình Remote Desktop sẽ hiện lên, tùy chọn như trong hình

![Runabove enable remote desktop](/images/2015/01/setup-runabove-9_hqbecs.jpg)

Bấm **OK **và đợi trạng thái của **Remote Desktop** trong **Local Server** chuyển thành **Enable.**

![runabove-remotedesktop](/images/2015/01/runabove-remotedesktop21_rtioqd.jpg)

## Cấu hình Security Groups trong Cpanel

Chuyển qua lại panel của RunAbove, chuyển sang chế độ **Expert Mode**

![runabove-remotedesktop](/images/2015/01/runabove-remotedesktop3_n3trw8.jpg)

Chuyển tới phần **Acccess and Security** bên trái. Nhớ chọn đúng Server Location mà VPS bạn đang dùng (BHS và SGH).

![runabove-remotedesktop4](/images/2015/01/runabove-remotedesktop4_lw48tu.jpg)

Bấm **Edit Rules** ở mục default. Cấu hình như bên dưới và nhấn ADD. Nhớ kiểm tra kĩ Port 3389 nhé

![runabove-remotedesktop5](/images/2015/01/runabove-remotedesktop5_byllmd.jpg)

Xong rồi đó. Hãy mở Remote Desktop lên và login vào VPS như bình thường (user Administrator/pass bạn vừa tạo)

# Video

@[youtube](Snu1oUgvk8o)
