---
layout: Post
title: 'Database Seeder - Tạo dummy data - Larask Gist'
date: 2015-03-13 17:00:00
description: '[Series] Larask Gist - Thiết lập Database Seeder , chuẩn bị dummy data'
tags: [laravel]
---

Đây là bài viết thứ 4 trong series [Laravel Gist](/gioi-thieu-series-larask-gist/) .

Các bạn có thể xem code của project tại [Github](http://github.com/larask/gist).

--------

# Giới thiệu

Chúng ta đã tạo migration, model và cả sử dụng Uuid trong model
nhưng chúng ta vẫn chưa có bất cứ dữ liệu nào để sử dụng.

Làm sao để biết ứng dụng của chúng ta chạy đúng theo mong muốn?

Làm sao để kiểm tra mọi trường hợp, mọi kiểu data mà user có thể nhập vào?
Chúng ta có thể tạo data bằng tay rồi sau đó import vào database.

Đó là một công việc hết sức nhàm chán và tốn thời gian.
Để mình chỉ cho các bạn các nhanh hơn.

# Trước khi bắt đầu

Hãy chạy lệnh `php artisan migrate:refresh` để áp dụng schema mà chúng ta đã thay đổi trong bài trước. Lệnh `migrate:refresh` thực tế là chạy 2 lệnh sau lần lượt: `migrate:rollback` và `migrate`. Không có gì mới ở đây cả.

# Database Seeder

Các bạn có thể hiểu database seeder là class chứa code để tạo ra dummy data. Khi chạy lệnh `php artisan db:seed`, Laravel sẽ gọi method `run()` trong file `database/seeds/DatabaseSeeder.php` .  Tuy nhiên, để tiện quản lí, chúng ta sẽ tạo riêng cho mỗi table 1 file và gọi các file này từ `DatabaseSeeder`.

# Tạo seeder

Ở [bài trước](/model-va-migration-trong-laravel-5-gist/) chúng ta có lệnh `php artisan make:model` để tạo nhanh model và migration cho model. Laravel đi kèm với 1 danh sách các lệnh để tạo nhanh các file. Các bạn có thể xem toàn bộ lệnh của `artisan` bằng cách chạy lệnh `php artisan`. Nhưng rất tiếc, không có lệnh tạo database seeder. Chúng ta sẽ cài đặt package [Laravel 5 Generators Extended](https://github.com/laracasts/Laravel-5-Generators-Extended) để có được lệnh này. Về phần cài đặt, các bạn có thể xem readme để cài đặt.

Sau khi cài đặt xong. Chúng ta đã có thể sử dụng `php artisan make:seed`. Ở đây, mình sẽ chạy 2 lệnh sau để tạo seeder cho User và Gist.

```shell
php artisan make:seed gist
php artisan make:seed user
```

Sau khi hoàn thành chúng ta sẽ có 2 file `UserTableSeeder.php` và `GistTableSeeder.php` trong `app/database/seeds`. Mở file `DatabaseSeeder.php` trong cùng thư mục và thêm vào trong method `run()` :

```php
$this->call(UserTableSeeder::class);
$this->call(GistTableSeeder::class);
```

File `DatabaseSeeder.php` của chúng ta lúc này :

```php
<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Model::unguard();

    $this->call(UserTableSeeder::class);
    $this->call(GistTableSeeder::class);
  }
}
```

Từ này, mỗi khi chúng ta chạy lệnh `php artisan db:seed`, method `run()` trong `UserTableSeeder` và `GistTableSeeder` sẽ được gọi theo thứ tự.

# Dummy Data

Bây giờ là phần quan trọng nhất, dummy data. Và để thuận tiện, chung1ta tiếp tục sử dụng 1 package khác của Laracasts : [Test Dummy](https://github.com/laracasts/TestDummy).

Sau khi cài đặt, các bạn mở class `UserTableSeeder` và thêm vào method `run()` đoạn :

```php
TestDummy::times(100)->create('Gist\User');`
```

Nhớ import class TestDummy vào:

```php
use Laracasts\TestDummy\Factory as TestDummy;
```

Mục đích của đoạn code trên là sẽ tạo 100 record cho `Gist\User` của chúng ta. Tuy nhiên, `TestDummy` không thần kì tới mức có thể xác định được loại data nào cần sử dụng mà chúng ta cần phải định nghĩa chúng.

## TestDummy Factories

Tạo file `tests/factories/factories.php`. Trong class `UserTableSeeder` chúng ta cần `Gist\User` factory. Vì vậy trong file `factories.php` chúng ta sẽ định nghĩa factory này như sau:

```php
<?php

$factory('Gist\User', [
  'name' => $faker->sentence,
  'username' => $faker->unique()->userName,
  'email' => $faker->unique()->email,
  'password' => $faker->words, // $faker->password doesn't work
]);
```

*Lưu ý: Tên factory chính là namespace của model*

Các bạn đang thắc mắc `$faker` là gì? Đó là 1 instance của package [fzaninotto/Faker](https://github.com/fzaninotto/Faker) dùng để tạo các thông tin ngẫu nhiên như là `lorem ipsum` . Các bạn có thể xem đầy đủ các loại thông tin mà Faker hỗ trợ trong file readme.

OK. Thử chạy `php artisan db:seed`, nếu ko có lỗi gì xảy ra chúng ta sẽ thấy 100 row trong table users. Thật là dễ dàng phải không nào?

Chúng ta tiếp tục thực hiện tương tự đối với `Gist` Model.

```php
<?php
// app/database/seeders/GistTableSeeder.php

use Illuminate\Database\Seeder;
use Laracasts\TestDummy\Factory as TestDummy;

class GistTableSeeder extends Seeder {
  public function run() {
      TestDummy::times(100)->create('Gist\Gist');
  }
}
```

Trong file `tests/factories/factories.php` thêm vào :

```php
$factory('Gist\Gist', [
  'title' => $faker->sentence,
  'content' => $faker->paragraph,
  'public' => $faker->boolean,
  'user_id' => 'factory:Gist\User',
]);
```

Mục cần chúng ta cần chú ý đó chính là `user_id` . `factory:Gist\User` sẽ chỉ `TestDummy` lấy 1 id của `Gist\User` factory chèn vào đó. Như vậy chúng ta đã có `Gist\Gist` factory.

Chạy thử: `php artisan db:seed` và 100 row sẽ xuất hiện trong `gists` table. Nhưng có 2 vấn đề xảy ra:

1. Trong `users` table, 100 row mới sẽ xuất hiện và chúng ta có tất cả 200 rows trong `users` table.
2. Tất cả  `user_id` đều giống nhau trong `gists` table.

Chúng ta sẽ lần lượt giải quyết chúng trong các phần tiếp theo.

## Truncate Table

Để tránh việc có thêm 100 dòng mỗi khi chạy `db:seed` chúng ta sẽ chạy lệnh `TRUNCATE TABLE table-name` trước khi seed.

Mở class `DatabaseSeeder` và thêm vào đầu method `run()`

```php
DB::statement('TRUNCATE TABLE users');
DB::statement('TRUNCATE TABLE gists');
```

Thử chạy và lỗi `constraint` sẽ xuất hiện do foreign constrain giữa `users` table và `gists` table.

Chúng ta có để đổi vị trí của 2 dòng code cho nhau để khắc phục lỗi constraint. Tuy nhiên đó không phải giải pháp lâu dài, vì khi ứng dụng phát triển, các table có quan hệ chặt chẽ với nhau và chúng ta không thể nào xác định được table nào `truncate` trước sẽ không bị lỗi. Giải pháp của chúng ta là sẽ tắt kiểm tra `foreign key` trước khi `truncate` và bật lại nó sau khi đã hoàn thành.

Đây là method `run()` hoàn chỉnh sau khi đã tích hợp lệnh :

```php
public function run()
{
  DB::statement('SET FOREIGN_KEY_CHECKS=0');

  DB::statement('TRUNCATE TABLE users');
  DB::statement('TRUNCATE TABLE gists');

  DB::statement('SET FOREIGN_KEY_CHECKS=0');

  Model::unguard();

  $this->call(UserTableSeeder::class);
  $this->call(GistTableSeeder::class);
}
```

## Tạo user_id khác nhau

Như chúng ta đã biết ở trên thì khi chạy `db:seed` tất cả `user_id` trong `gists` table sẽ giống nhau. Đây không phải là lỗi mà là cơ chế hoạt động của `TestDummy`. Để khắc phục, thay vì ra lệnh cho `TestDummy` tạo 100 row thì chúng ta sẽ chạy `TestDummy` 100 lần, mỗi lần tạo 1 row.

```php
<?php

use Illuminate\Database\Seeder;
use Laracasts\TestDummy\Factory as TestDummy;

class GistTableSeeder extends Seeder {
  public function run() {
    foreach(range(0,100) as $index) {
        TestDummy::times(1)->create('Gist\Gist');
    }
  }
}
```

Tuy nhiên, đoạn code trên vẫn chưa tối ưu lắm vì 1 user chỉ có 1 Gist. (có thể `TestDummy` sẽ chọn lại 1 user_id bị trùng nhưng xác suất là rất thấp). Để tạo ra 1 database ngẫu nhiên hơn nữa. Chúng ta sẽ dùng function `rand()`.

```php
<?php

use Illuminate\Database\Seeder;
use Laracasts\TestDummy\Factory as TestDummy;

class GistTableSeeder extends Seeder {
  public function run() {
    foreach(range(0,100) as $index) {
      TestDummy::times(rand(1,5))->create('Gist\Gist');
    }
  }
}
```

Như vậy, chúng ta sẽ chạy `TestDummy` 100 lần, mỗi lần `TestDummy` sẽ thêm vào ngẫu nhiên 1-5 records. Các bạn có thể muốn giảm 100 xuống 1 con số thấp hơn để khỏi mất công chờ.

# Kết luận

Qua bài này, các bạn đã biết được cách dùng `TestDummy` kết hợp với `Faker` để tạo dummy data phục vụ cho việc develop và testing.

Mình và anh [Nam](http://blog.luuhoangnam.com/) đã push vài commit để hiển thị các database này ra ngoài dưới dạng json. Các bạn có thể clone về, cài đặt như bình thường (xem file readme) và truy cập vào route `/trending` để xem thử.
