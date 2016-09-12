---
layout: Post
title: ! 'Cài đặt và thiết lập cơ bản cho Larask Gist'
date:   2015-03-12 18:00:00
description: ! 'Hướng dẫn cài đặt Laravel 5 và thiết lập cơ bản cho ứng dụng'
tags: [laravel]
---

Đây là bài viết trong [series Larask Gist](/gioi-thieu-series-larask-gist/).
Toàn bộ source code của bài viết này bạn có thể xem tại đây: [Larask Gist](https://github.com/Larask/gist/)

# Cài đặt

Trong series này mình sẽ dùng Laragon để hướng dẫn. Vì vậy nếu bạn nào chưa cài đặt Laragon hãy [cài đặt ngay theo hướng dẫn](/laragon-cai-dat-laravel-trong-mot-phut/). (nếu máy bạn đủ khả năng ảo hóa, hãy sử dụng Homestead thay thế)

Dùng Laragon tạo một project mới tên là `gist`. Chờ để Laragon (thực tế là composer) tải và cài đặt Laravel. Mở trình duyệt và truy cập vào `gist.dev`. Nếu xuất hiện màn hinh chào mừng của Laravel là bạn đã thành công.

![Welcome to Laravel](/images/2015-12-03-larask-gist-cai-dat-va-cau-hinh-co-ban/welcome-laravel.jpg)

# Cấu hình cơ bản

## Đổi tên app (namespace)

Việc đầu tiên cần làm sau khi cài ứng dụng là đổi tên. Thay vì sử dụng tên mặc định là `App` chúng ta sẽ đổi nó thành `Gist`

```shell
php artisan app:name Gist
```

```shell
Application name set!
```

Từ bây giờ, toàn bộ ứng dụng của chúng ta sẽ có namespace là `Gist`

### Cấu hình các thông số

Ngày nay, git là version control thông dụng. Và bạn sẽ không muốn các thông tin như cấu hình database, mật khẩu, API key được công khai (ví dụ trên Github hay Bitbucket khi push code). Và bạn cũng không muốn phải sửa các thông số này thường xuyên khi deploy ứng dụng do sự khác nhau giữa các môi trường làm việc (ví dụ local và production).

Laravel tích hợp sẵn `.dotenv` để giúp bạn làm thực hiện việc này dễ dàng nhất. Mỗi mỗi trường sẽ có 1 file `.env` ở thư mục gốc lưu các thông tin quan trọng.

Cách hoạt động của file `.env` rất đơn giản. Hãy mở file `/config/database.php` các bạn sẽ thấy dòng này :

```php
'mysql' => [
  'driver'    => 'mysql',
  'host'      => env('DB_HOST', 'localhost'),
  'database'  => env('DB_DATABASE', 'forge'),
  'username'  => env('DB_USERNAME', 'forge'),
  'password'  => env('DB_PASSWORD', ''),
  'charset'   => 'utf8',
  'collation' => 'utf8_unicode_ci',
  'prefix'    => '',
  'strict'    => false,
],
```

File `.env` đi kèm sau khi cài Laravel thành công sẽ có nội dung như sau:

```shell
APP_ENV=local
APP_DEBUG=true
APP_KEY=rTPeTeKYrhiu61RyvFeyGkbZF2KS2Fe2

DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret

CACHE_DRIVER=file
SESSION_DRIVER=file
```

*Lưu ý: Luôn luôn giữ bí mật APP_KEY của bạn*

Laravel dùng hàm `env('DB_HOST', 'localhost')` để lấy giá trị `DB_HOST` trong file `.env`. Nếu không có giá trị này,  giá trị mặc định là `localhost` sẽ được dùng. Các bạn có thể bỏ trống biến thứ 2 của hàm `env` và khi đó giá trị mặc định trả về sẽ là `null`

```php
/**
 * Gets the value of an environment variable. Supports boolean, empty and null.
 *
 * @param  string  $key
 * @param  mixed   $default
 * @return mixed
 */
function env($key, $default = null) {
  // some thing here
}
```

Trong file `.env` chúng ta sẽ cấu hình các mục

```shell
DB_HOST=localhost
DB_DATABASE=gist
DB_USERNAME=root
DB_PASSWORD=
```

Phù hợp với cấu hình mysql của bạn. (nếu bạn sử dụng PostgreSQL, SQLite,...) Hãy thay đổi `default` cho phù hợp trong `config/database.php`

Kiểm tra kết nối database thành công bằng cách chạy lệnh sau vào Cmder

```shell
php artisan tinker
>>> DB::Statement("SHOW TABLES")
true
```

*Lưu ý: `SHOW TABLES` là câu lệnh của MySQL để hiển thị tất cả table trong database hiện tại (gist), nếu các bạn sử dụng các loại database khác. Câu lệnh này phải được thay đổi cho phù hợp*

```php
DB::Statement($command)
```

Dùng để chạy một câu query.

### Cài ide-helper package

Để các IDE có thể "hiểu" được những gì chúng ta đang code và có các type hint thì chúng ta cần cài package hỗ trợ. Ở đây mình sẽ dùng [barryvdh/laravel-ide-helper](https://github.com/barryvdh/laravel-ide-helper) .

Trong Cmder:

```shell
composer require barryvdh/laravel-ide-helper --dev
```

Option --dev để composer hiểu chúng ta chỉ cần package này khi develop.

Mở file `'Gist\Providers\AppServiceProvider'` trong method `register()` chúng ta sẽ thêm vào :

```php
if ($this->app->environment() == 'local') {
  $this->app->register('Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider');
}
```

Tiếp tục trong Cmder:

```shell
php artisan ide-helper:generate
```

Lệnh trên sẽ tạo file _ide_helpers.php trong thư mục gốc giúp các IDE có thể hiểu được Laravel.
Bạn cần phải chạy lệnh trên mỗi lần cài đặt thêm package mới.
Nhưng bạn cài đặt package bằng Composer phải không?
Hãy để Composer làm điểu đó cho bạn.

Mở file `composer.json` và sửa `post-update-cmd` giống như bạn dưới (chính xác thứ tự các dòng nhé)

```javascript
"post-update-cmd":[
  "php artisan clear-compiled",
  "php artisan ide-helper:generate",
  "php artisan optimize"
]
```

Cuối cùng là add file `_ide_helper.php` vào cuối file `.gitignore`  để cho git không theo dõi file này, tránh các rắc rối về commit/merge về sau.

# Kết luận

Nếu bạn đọc được đến đây thì bạn đã sẵn sàng để chinh phục Laravel rồi đấy.
