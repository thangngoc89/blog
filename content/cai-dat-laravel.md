---
layout: Post
title: '[Laravel cơ bản] Cài đặt Laravel'
date: 2015-01-05 19:36:03
description: 'Cài đặt Laravel - Series Laravel cơ bản'
tags: [laravel]
---

# Update 11/03/2015

Phương pháp cài đặt này không còn được khuyến khích. Các bạn hãy xem cách cài đặt bằng Laragon [tại đây](/laragon-cai-dat-laravel-trong-mot-phut/)

---

Trong bài viết này, mình sẽ hướng dẫn các bạn tạo một project Laravel mới để chuẩn bị cho việc chinh phục Laravel

# 1. Chuẩn bị

- Composer [(hướng dẫn)](/quan-li-cac-thu-vien-php-voi-composer/ "Quản lí các thư viện PHP với Composer").
- Một webserver với :

  - PHP >= 5.4
  - MCrypt PHP Extension

- Một localhost chạy PHP chắc chắn là không thể thiếu
 đối với các bạn đã biết PHP cơ bản.

> Nếu các bạn chưa cài, hãy cài vào máy trước khi tiếp tục.
> Cá nhân mình hay sử dụng WampServer.
> Các bạn có thể tải về từ trang chủ [trang chủ](http://www.wampserver.com/en/)

# 2. Cài đặt Laravel

Mở `CommandPrompt` lên tại thư mục gốc của localhost (với WampServer là thư mục `www`, các server khác có thể là `htdocs`, `public`, …). Gõ lệnh sau

```shell
composer create-project laravel/laravel laravelproject --prefer-dist
```

Composer sẽ tự động tải và cài đặt Laravel kèm với các thành phần đi kèm vào thư mục `laravelproject` (các bạn có thể đổi tên thư mục này tùy ý)

Mở trình duyệt lên truy cập vào địa chỉ [http://localhost/laravelproject/public](http://localhost/laravelproject/public) . Nếu thấy hình bên dưới là bạn đã cái đặt thành công Laravel. (Để tiện cho việc lập trình, các bạn hãy tạo một Virtual Host với tên miền như `laravel.dev`)

![laravel-welcome](/images/2015/01/laravel-welcome.png)

# 3. Cấu hình

## Cấu hình cơ bản

Chuyển vào thư mục Laravel

```shell
cd laravelproject
```

Gõ lệnh sau để tạo một key ngâu nhiên trong `app/config/app.php`
(giúp mã hóa session và các thông tin khác)

```shell
php artisan key:generate
```

Mở file `app/config/app.php`, ở đây có một số mục bạn cần chú ý như :

`app.debug` bật debug chi tiết giúp bạn dễ dàng kiểm soát lỗi. Nếu giá trị `false` thì chỉ có một thông báo ngắn với lỗi 500 được xuất ra (Internal Servel Error)

```php
'timezone' => 'Asia/Ho_Chi_Minh'
```

(Chỉnh thành giờ Việt Nam)

## Pretty URL (URL Rewrite)

Mặc định thì trong thư mục `/public` đã có file cấu hình `.htaccess` dành cho Apache để sử dụng Pretty URL. Nhưng nếu không có thì bạn có thể cấu hình như sau :

### Apache

```noop
Options +FollowSymLinks
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.php [L]
```

Lưu ý: `mod_rewrite` phải được bật trong Apache thì Pretty URL mới có hiệu lực

### Nginx

Thêm thông tin sau vào file `nginx.conf` (lưu ý, đây không phải cấu hình hoàn chỉnh dành cho Nginx)

```noop
location / {
  try_files $uri $uri/ /index.php?$query_string;
}
```

## Database

Laravel Eloquent được xây dựng trên PDO nên hỗ trợ nhiều loại database (MySQL, PogresSQL, SQLite)...và bạn có thể kết hợp sử dụng nhiều database cùng lúc trong ứng dụng.

Để cấu hình, các bạn mở file `app/config/database.php`. Ở đây bạn chỉ cần quan tâm đến 2 mục đó là `app.default` và `app.mysql`.

- Mục `app.default` có nghĩa là database được Laravel sử dụng mặc định
- Mục `app.connections` : cấu hình các kết nối. Bạn hãy tạo 1 database mới rồi nhập các thông số phù hợp vào. Ở đây mình chọn `mysql` là mặc định và cấu hình:

```php
'mysql' => array(
  'driver'    => 'mysql',
  'host'      => 'localhost',
  'database'  => 'laravel',
  'username'  => 'root',
  'password'  => '',
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => '',
),
```

Xong rồi đó. Chào mừng bạn đến với Laravel.
