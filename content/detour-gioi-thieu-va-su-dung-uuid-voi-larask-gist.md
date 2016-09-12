---
layout: Post
title: 'Detour - Giới thiệu và sử dụng UUID'
date: 2015-03-13 10:00:00
description: '[Series] Larask Gist - Sử dụng UUID để bảo vệ những thông tin nhạy cảm của ứng dụng'
tags: [laravel]
---

> Đây là bài viết thứ 3 trong series [Laravel Gist](/gioi-thieu-series-larask-gist/).
> Các bạn có thể xem code của project tại [Github](http://github.com/larask/gist).

---

# Giới thiệu

Trong bài trước chúng ta đã tạo và chỉnh sửa migration file nhằm tạo 3 table

- users
- gists
- password_reset (migration của table này mặc định của Laravel 5 và chúng ta giữ nguyên mặc định)

Trước hết, hãy nhìn vào một địa chỉ của Github Gist : `https://gist.github.com/thangngoc89/db6493759aa0e9bdb59d` mỗi Gist được gắn một chuỗi hash duy nhất (ví dụ `db6493759aa0e9bdb59d`). Không có 2 gist có cùng 1 hash code.

Tuy nhiên, chúng ta không hề có cấu trúc nào để lưu trữ hash trong schema (cấu trúc của database). Cách giải quyết thường gặp nhất đó là tạo thêm 1 cột mới tên là `hash` trong gists và tạo 1 random hash mỗi khi có gists mới. Nhưng như vậy thì chúng ta có riêng 1 cột `id`  chỉ nhằm mục đích tự động tăng (auto-increment) mà không hề có bất kì chức năng nào khác trong table. Tại sao chúng ta không nhập chung cột `hash` và cột `id` thành một. Và set cột đó làm primary chính của table? :sound_nice:

Một lợi ích khác của cách này đó là người khác không thể biết tổng số record có trong table của bạn. Một dạng địa chỉ thường thấy của các blog home-growth (tự phát triển) có dạng `http://example.com/my-blog-slug-here/id`. Và `id` thường là auto-increment key (mà 99% là vậy). Nếu bạn là một công ty kinh doanh, đối thủ của bạn có thể dễ dàng tìm ra được tổng số record bằng cách tăng dần id lên tới khi có lỗi 404. :smile:

*Nhiều bạn sẽ nói đa số các blog đều không có phần `id` ở cuối tuy nhiên theo kinh nghiệm cá nhân, route như vậy là tối ưu nhất để tránh phiền phức về sau liên quan giữa `slug` và `title`*

Hay đơn giản là nhìn vào ứng dụng Gist của chúng ta. 1 Gist có thể có trạng thái public/private. Nhưng nếu chúng ta dùng auto-increment `id` thì private gist của dễ dàng tìm ra (giả sử chúng ta không check username).

# UUID

Dài dòng thế là đủ rồi. Bây giờ quay lại chủ đề chính. UUID là gì ? Là một chuẩn chung nhằm tạo ra các random-hash không trùng nhau (xác xuất gần bằng 0).  Nếu các bạn quan tâm, các bạn có thể tìm hiểu về chuẩn UUID [tại đây](http://tools.ietf.org/html/rfc4122).

Một chuỗi UUID cơ bản có dạng như sau: `6ba7b810-9dad-11d1-80b4-00c04fd430c8` gồm 36 kí tự. 32 kí tự thỏa mãn`[a-z0-9]` và chia thành 4 nhóm bởi 4 dấu - (hyphen). Vì 1 UUID khá dài nên chúng ta chỉ lấy 7 kí tự đầu tiên và hiển thị ra ngoài (vẫn lưu đầy đủ UUID trong database).

# Migrations

Chúng ta đã biết được cấu trúc của UUID một ID, hãy chỉnh sửa lại migration để áp dụng UUID vào Gist.

*Lưu ý: Chúng ta còn đang trong giai đoạn ban đầu, việc sửa đổi trực tiếp các file migration là chấp nhận được. Nếu như các bạn đang làm project đã được deploy (và có dữ liệu thực). Hãy tạo thêm 1 file migration mới và áp dụng các sửa đổi trong file này*

Việc sửa đổi file migration rất đơn giản, những chỗ nào kiểu dữ liệu là `INT(10)` mình sẽ chuyển thành `VARCHAR(36)`. Ở đây mình đã sửa đổi sẵn các file migration, các bạn có thể tham khảo thêm:

```php
// yyyy_mm_dd_xxxxxxx_create_users_table.php
public function up() {
  Schema::create('users', function(Blueprint $table) {
    $table->string('id',36)->index()->unique();
    $table->primary('id');
    $table->string('name');
    $table->string('username', 20)->nullable()->default(null)->unique();
    $table->string('email')->nullable()->default(null)->unique();
    $table->string('password', 60);
    $table->rememberToken();
    $table->timestamps();
  });
}
```

```php
// yyyy_mm_dd_xxxxxxx_create_gists_table.php
public function up() {
  Schema::create('gists', function(Blueprint $table) {
    $table->string('id',36)->index()->unique();
    $table->primary('id');
    $table->string('user_id',36)->nullable()->index();
    $table->string('title');
    $table->binary('content');
    $table->boolean('public');
    $table->timestamps();
    $table->softDeletes();
    $table->foreign('user_id')->references('id')->on('users')->onDelete('SET NULL');
  });
}
```

Xem 2 file đầy đủ tại [gist#e24d7b64ba](https://github.com/Larask/gist/commit/e24d7b64ba6ad2da1b1787fb2c98fceb90e01476)

# Model

Mặc định, Eloquent model sẽ dùng cột `id` auto-increment để làm khóa chính (primary key) của model. Chúng ta cần áp dụng thay đổi nhỏ để Eloquent có thể hiểu được chúng ta đang dùng UUID thay cho auto-increment value.

Trong file `app/Gist.php` thêm vào :

```php
public $incrementing = false;

public static function boot()
    {
      parent::boot();

        static::creating(function ($model) {

            $model->{$model->getKeyName()} = Uuid::generate(4);

        });
    }
```

Mình quên một chỗ là chúng ta sẽ dùng package
[Laravel-Uuid](https://github.com/webpatser/laravel-uuid) để tạo nhanh UUID.

Cài đặt nhanh:

`composer require webpatser/laravel-uuid`

Chúng ta không cần thêm `alias` cho `Uuid Facades` vì chúng ta hầu như không dùng nó (sẽ thêm khi cần thiết).

Và trong `app/Gist.php` nhớ import Class `Uuid` :

`use Webpatser\Uuid\Uuid;`

Ở đây có 2 chỗ chúng ta cần quan tâm, đó là

```php
public $incrementing = false;
```

Tức là báo cho Eloquent biết sẽ không có giá trị `auto-increment` [(chi tiết)](https://github.com/illuminate/database/blob/master/Eloquent/Model.php#L58-L63).

Tiếp theo là

```php

public static function boot()
    {
      parent::boot();

        static::creating(function ($model) {

            $model->{$model->getKeyName()} = Uuid::generate(4);

        });
    }
```

Đây được gọi là Model-events các bạn có thể [xem docs của Laravel 5.0](http://laravel.com/docs/5.0/eloquent#model-events) để hiểu rõ hơn. Model event xứng đáng một bài viết riêng. Mình chỉ giải thích ngắn gọn là trước khi một model được tạo (tức là 1 row trong table - xem lại bài trước về Active Record Pattern). Đoạn code chúng ta thêm vào sẽ tạo một Uuid và gắn vào primary key (lấy primary key bằng `$model->getKeyName()`).

# Refactor

Như vậy là chúng ta đã hoàn thành việc sự dụng Uuid trong Gist Model. Nhưng theo như file migration ở trên, chúng ta muốn sử dụng cho cả User Model. Giải pháp? Copy-paste phần code chúng ta sử ở Gist Model qua User Model. 100% là sẽ hoạt động. Nhưng giải sử chúng ta muốn thêm chức năng comment? Copy-paste tiếp à :D . Mình sẽ chỉ các bạn cách đơn giản hơn. Đầu tiên tạo file `app/UuidModel.php` với nội dung:

```php
<?php
namespace Gist;

use Illuminate\Database\Eloquent\Model;
use Webpatser\Uuid\Uuid;

class UuidModel extends Model {

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {

            $model->{$model->getKeyName()} = Uuid::generate(4);

        });
    }

}
```

Sau đó trong Gist Model thay vì ban đầu là

```php
<?php

class Gist extends Model{}
```

Chúng ta sửa lại :

```php
<?php

class Gist extends UuidModel
{
  public $incrementing = false;
}
```

Làm tương tự với User Model. Như vậy từ nay, khi muốn sử dụng Uuid cho bất cứ Model nào, chúng ta chỉ đơn giản làm như vậy.

*Lưu ý: `public $incrementing = false;` có thể đặt tại `app/UuidModel.php` nhưng vì li do nào đó mà nó làm fail PHPUnit nên mình tạm thời đặt nó ở đây. Sẽ refactor tiếp khi cần thiết*

# Kết luận

Qua bài này, chúng ta đã biết được cách sử dụng Uuid với Eloquent Model. Chúng ta đã sửa và thêm vào không quá 20 dòng code. Tất cả đều nhờ vào sự "thần kì" của Laravel.
