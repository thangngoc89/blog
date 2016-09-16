---
layout: Post
title: 'Học flux bằng truyện tranh'
date: 2016-09-18
feature-img: ./feature
tags: [javascript, cartoon]
---

Flux là một trong những chủ đề nóng hổi cũng như khó hiểu trong phát triển web hiện tại.
Bài viết này sẽ cố gắng để giải thích Flux theo cách đơn giản nhất.

## Vấn đề

Đầu tiên, mình sẽ giải thích vấn đề mà Flux sinh ra để giải quyết.
Flux là một quy trình để xử lí dữ liệu trong ứng dụng của bạn.
Flux và React cùng được phát triển tại Facebook. Nhiều lập trình viên dùng
cả hai trong ứng dụng, nhưng mà các bạn có thể dùng chúng riêng lẻ.
Flux và React được phát triển để giải quyết một số vấn đề mà Facebook gặp phải.


Trong số những vấn đề đó thì điển hình nhất là bug của thanh thông báo.
Bạn đăng nhập vào Facebook, bạn sẽ thấy thông báo trên biểu tượng chat.

![Thanh thông báo của Facebook](1-notification.jpg)

Kì lạ thay, bạn nhấn vào biểu tượng chat thì không có tin nhắn nào cả.
Sau khi lướt news feed vài phút thì thông báo xuất hiện lại.
Bạn nhấn vào biểu tượng chat lần nữa ... vẫn không có bất kì tin nhắn nào.
Vấn đề này cứ tiếp diễn thành một vòng lặp.
