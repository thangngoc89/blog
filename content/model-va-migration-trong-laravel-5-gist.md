---
layout: Post
title: ! 'Migration và Model trong Laravel 5 - Larask Gist'
date:   2015-03-12 19:00:00
description: ! 'Hướng dẫn tạo và sử dụng migration trong Laravel 5 - Series Larask Gist'
tags: [laravel]
---

Đây là bài viết thứ hai trong series [Larask Gist](/gioi-thieu-series-larask-gist/) .

Các bạn có thể xem code của toàn bộ bài viết tại [github](https://github.com/Larask/gist/tree/d3e5e96139fce98e028834035bb41759fd49b62e)

# Model

Trong [mô hình MVC](/tim-hieu-mo-hinh-mvc-la-gi/) thì Model đóng vai trò giao tiếp với database. Laravel đi kèm với Eloquent, một [ORM](http://yhoc.co/orm-eloquent)  với Active Record Pattern. [(xem chi tiết về các pattern ORM)](http://yhoc.co/active-record-data-mapper) . Trong Active Record Pattern thì mỗi object sẽ đại diện cho một dòng trong table. Điều này làm cho việc tương tác với database dễ hơn bao giờ hết.

Laravel 5 đi kèm với model User mặc định `app/User.php` và class này sẽ đại diện cho User trong toàn bộ ứng dụng của bạn.

# Migration

Bạn quản lí code bằng git như database, một thành phần quan trọng không kém là database thì không được như vậy. Vì vậy migration được tạo ra để quản lí sự thay đổi cấu trúc dữ liệu. Việc sử dụng migration sẽ giúp bạn giảm nhẹ công việc khi deploy ứng dụng.

Lấy ví dụ như một ngày đẹp trời, bạn muốn thêm vào database table `dogs`. Ở localhost, bạn vào phpmyadmin (hay bất cứ công cụ quản lí nào bạn sử dụng, kể cả cli) chạy query tạo ra table `dogs`. Sau khi thêm vào code để sử dụng table mới này.
Bạn muốn up code lên host/vps. Okie. Push code lên github, pull code trên vps(hoặc dùng webhooks để tự động hóa luôn). Còn database thì sao? Ừm lên phpmyadmin của vps chạy query tiếp. Nhưng ... query chính xác là gì :disappointed: ?

Nếu bạn sử dụng migration ngay từ đầu thì việc duy nhất bạn cần làm trên cả local và host/vps là chạy lên `php artisan migrate` để thực hiện việc cập nhật database.

# Tạo migration và model

Bây giờ chúng ta suy nghĩ về cấu trúc của ứng dụng. Ứng dụng của chúng ta tập trung về Gist nên chúng ta sẽ đặt tên table sẽ là `gists` và model sẽ là `Gist`. Như vậy chúng ta cần làm 2 việc :

- Tạo model `Gist`
- Dùng migration để tạo ra table `gists`

Laravel 5 cung cấp cho chúng ta công cụ tiện dụng để làm việc này. Mở Cmder :

```shell
php artisan make:model Gist

Model created successfully.
Created Migration: yyyy_mm_dd_xxxxxx_create_gists_table
```

Các bạn sẽ thấy xuất hiện 2 file mới là `app/Gist.php` và `database/migrations/yyyy_mm_dd_xxxxxx_create_gists_table.php` với `yyyy_mm_dd_xxxxxx` là thời điểm migration này được tạo ra.

# Thiết lập cấu trúc dữ liệu

## Users table

- Trước hết chúng ta hãy xem qua cấu trúc của file `database/migrations/2014_10_12_100000_create_user_table.php`

```php
/**
  * Run the migrations.
  *
  * @return void
  */
  public function up () {
    Schema::create('users', function(Blueprint $table) {
      $table->increments('id');
      $table->string('name');
      $table->string('email')->unique();
      $table->string('password', 60);
      $table->rememberToken();
      $table->timestamps();
    });
  }

/**
  * Reverse the migrations.
  *
  * @return void
  */

  public function down() {
    Schema::drop('users');
  }
```

Class này có 2 function là `up()` và `down()`.

Function `up()` sẽ được gọi khi bạn chạy lệnh `php artisan migrate`
còn function `down()` sẽ được gọi khi bạn chạy lệnh `php artisan migrate:rollback` .

Các tên hàm theo mình thấy là rất dễ hiểu rồi. Nhìn vào các bạn có thể tưởng tượng được cấu trúc table `users` như thế nào.

Mình sẽ sửa table `users` này như sau :

- Thêm một cột `username` kiểu `var_char(20)` với `unique key`.
- Cho phép email có thể `NULL`  (believe me about this)
- Index và unsigned cột `id`

Và mình có function `up()` hoàn chỉnh:

```php
/**
  * Run the migrations.
  *
  * @return void
  */
  public function up() {
    Schema::create('users', function(Blueprint $table) {
      $table->increments('id')->index();
      $table->string('name');
      $table->string('username', 20)->nullable()->default(null)->unique();
      $table->string('email')->nullable()->default(null)->unique();
      $table->string('password', 60);
      $table->rememberToken();
      $table->timestamps();
    });
  }
```

Nguyên nhân mình cho 2 cột `email` và `username` nullable là sau này,
nếu bạn muốn tích hợp chức năng login với Facebook/Google+/Twitter ...
thì nhiều khi các dịch vụ này sẽ không cung cấp email hay username (nhất là Facebook).
Vì vậy, cứ để cho nó null sau này sẽ tính sau.

Các bạn có thể xem các lệnh khác nhau của
[class Schema tại đây](http://laravel.com/docs/5.0/schema)

## Gists table

Chúng ta sẽ đi nhanh qua phần này, ở đây mình có sẵn file migration cho gists table

```php
<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGistsTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('gists', function(Blueprint $table) {
      $table->increments('id')->index();
      $table->unsignedInteger('user_id')->nullable()->index();
      $table->string('title');
      $table->longText('content');
      $table->boolean('public');
      $table->timestamps();
      $table->softDeletes();
      $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::drop('gists');
  }
}
```

Ở đây chúng ta có cột `public` với kiểu boolean để chứa trạng thái public/private của gists.

`$table->softDeletes();` dùng để tạo một cột `deleted_at` (chúng ta sẽ nói về vấn đề này sau).

Cuối cùng là `$table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');` để set foreign constraint giữa `gists` table và `users` table. Ở đây mình muốn khi user bị xóa ra khỏi database thì gists của họ vẫn còn tồn tại trong hệ thống.

Okie. So far so good. Mở Cmder lên và gõ lệnh

```shell
php artisan migrate
```

Vào kiểm tra trong phpmyadmin, mọi cấu trúc đã có ở trong table. Laravel sẽ tự động tạo thêm table `migrations` để quản lí migrations cho bạn. Bạn không cần quan tâm về table này

Gõ lệnh

```shell
php artisan migrate:rollback
```

Kiểm tra lại trong database. Toàn bộ cấu trúc đã biến mất (trừ table `migrations` ). Yay me.

# Kết luận

Bằng việc sử dụng, kết hợp model và migration trong Laravel, việc lập trình của bạn sẽ dễ dàng hơn bao giờ hết. Nếu bạn làm việc theo team. Mọi thay đổi về cấu trúc database của được cập nhật đến mọi thành viên của nhóm một cách nhanh chóng.
