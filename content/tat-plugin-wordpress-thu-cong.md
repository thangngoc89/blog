---
layout: Post
title: Tắt plugin Wordpress khi không vào được Bảng điều khiển
date: 2014-11-16 14:25:54
tags: [wordpress]
---

Hôm qua mình có nghịch với mấy cái plugin WordPress và kết quả là không truy cập vào Bảng điểu khiển (Admin Dashboard) được nữa. Nên chẳng thể nào tắt plugin ấy đi được. Sau một hồi tìm kiếm, mình tìm ra tới 2 giải pháp để tắt plugin WordPress mà không cần truy cập và Bảng điều khiển. Mời các bạn tham khảo nếu đang gặp trường hợp này nhé.

# Tắt thông qua các trình quản lí file

Bạn có thể dùng bất cứ công cụ quản lí file nào cũng được (FTP, SSH, cPanel,…) . Nguyên tắc cơ bản chính là đổi tên của thư mục plugin. Khi đó, WordPress sẽ tự động tắt plugin cho bạn.

Truy cập vào thư mục

wp-content/plugins

Thư mục này sẽ liệt kê tất cả các plugin đã được cài đặt trên site của bạn cả kích hoạt và không kích hoạt.

![disable-wordpress-plugin-1](/images/2014/11/disable-wordpress-plugins-1.jpg)

Ví dụ: muốn tắt plugin TinyMCE-Advanced thì chỉ cần đổi tên thư mục **tinymmce-advanced** thành bất cứ tên gì các bạn muốn ví dụ **tinymmce-advanced-disabled**

Thử truy cập vào Bảng điều khiển, bạn sẽ thấy thông báo plugin **TinyMCE-Advanced** đã được tắt đi

![disable-wordpress-plugin-2](/images/2015/01/disable-wordpress-plugins-2_dohhca.jpg)]

# Tắt thông qua cơ sở dữ liệu

Đăng nhập vào phpMyAdmin và chọn database của site WordPress bạn đang sử dụng.

**Lưu ý:** Cần sao lưu lại cơ sở dữ liệu trước khi thực hiện bất kì thao tác nào bên dưới

Nhấn chọn nút SQL ở thanh công cụ phía trên.

![disable-wordpress-plugins-4](/images/2015/01/disable-wordpress-plugins-4_yzlefg.jpg)

Xóa hết các lệnh có sẵn và gõ lệnh sau đây vào khung lệnh

```mysql
SELECT * FROM wp_options WHERE option_name = 'active_plugins';
```

![disable-wordpress-plugins-5](/images/2015/01/disable-wordpress-plugins-5_ov7h0r.jpg)

Xóa bỏ hết và ghi nội dung sau đây vào khung đỏ

```sql
a:0:{}
```

Nhấn Go.

Thao tác trên là các bạn đã tắt toàn bộ plugin của WordPress. Các bạn có thể bật lại từng plugin sau khi đăng nhập trong Bảng Điều Khiển.

# Kết luận

Vọc phá plugin là một điều nên làm nhưng mà các bạn hãy cẩn thận. Luôn nhớ Backup cơ sở dữ liệu và file trước khi thực hiện bất kì thao tác nào trên site WordPress.

Nếu có thắc mắc gì hãy gửi trả lời bên dưới các bạn nhé
