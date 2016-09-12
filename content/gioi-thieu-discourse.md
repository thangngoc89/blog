---
layout: Post
title: Giới thiệu Discourse
date: 2014-12-01 17:53:10
tags: [discourse]
---

# Discourse là gì?

Discourse là một dự án mã nguồn mở để xây dựng một nền tảng thảo luận online có thể dùng với các mục đích sau :

* Danh sách gửi mail
* Một diễn đàn thảo luận
* Một chat room

Mục tiêu của Discourse là trở thành Wordpress trong thế giới mã nguồn Forum.

# Tính năng nổi bật

Các bạn có thể xem đầy đủ các tính năng của Discourse [tại đây](http://www.discourse.org/about/). Mình sẽ chỉ liệt kê các tính năng nổi bật nhất đổi với Discourse:

* Không có phân trang: infinite scroll được sử dụng một cách triệt để trong Discourse, tất cả chỉ có cuộn lện và cuộn xuống
* Hỗ trợ điện thoại 100%, giảo diện Responsive
* Trust System và chống Spam: Discourse có một khái niệm mới là Trust System, thành viên mới đăng kí sẽ bị hạn chế nhiều thứ như số hình ảnh, số link có thể đăng, nếu cứ lặp lại việc đăng link thì tài khoản đó sẽ bị khóa một cách tự động và ẩn bài viết. Mình làm admin gần như không cần làm gì. Mọi hoạt động Spam gần như được phát hiện chính xác.
* Backup tự động theo ngày: Một điểm + rất lớn đối với Discourse
* Đăng bài ở mọi nơi: Bạn có thể viết bài mới và di chuyển qua lại giữa các trang (ví dụ như để Trích dẫn bài viết) một các thoải mái. Không cần phải vào từng chuyên mục để viết bài.
* Cập nhật dễ dàng (Nhờ Docker và Github)
* Tích hợp với Blog : có thể dùng Discourse làm hệ thống comment của Blog (bất cứ blog nào có thể chỉnh sửa HTML, có plugin riêng dành cho Wordpress)

## Hạn chế :

* Số lượng plugin còn hạn chế và nhanh chóng bị lỗi vì tốc độ cập nhập chóng mặt của Discourse. Nhiều plugin, các tác giả phải thông báo rằng chỉ cập nhật cho các bạn ổn định của Discourse
* Không có theme tùy chỉnh. Tất cả những gì bạn có thể làm với giao diện của Discourse là thêm CSS và HTML, không có theme riêng để bạn thay đổi.

## Công nghệ:

### Backend

* Framework: Ruby on Rails
* Database: Pogrest
* Cache: Redis

### Frontend

[EmberJS](http://emberjs.com)

> Ngoài Discourse , hiện tại mình đang theo dõi Flarum cũng với mục tiêu định hình lại forum
> Các bạn có thể tham khảo dự án tại: [http://flarum.org]

## Các trang liên quan

* Trang chủ: [http://discourse.org]
* Trang dùng thử: [http://try.discourse.org] (bạn có thể vào đây và viết bất cứ bài nào bạn thích, thử nghiệm bất cứ tính năng nào, các bài viết sẽ được xóa mỗi ngày)
* Hỗ trợ: [http://meta.discourse.org] (đây gần như là nơi duy nhất bạn cần truy cập để tìm hiểu về plugin, các thông báo chính thức...)
* ~~Forum của mình: [http://ask.hoidapyhoc.com] (Một forum dành cho sinh viên Y)~~
