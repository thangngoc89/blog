---
layout: Post
title: Quản lí các thư viện PHP với Composer
date: 2015-01-03 13:09:22
tags: [php, composer]
---

# Update

## 26/01/2016:

Các bạn có thể dùng [prestissimo](https://github.com/hirak/prestissimo) để tăng tốc độ cài đặt cho Composer (Parallel Composer)

Gõ dòng lệnh này vào:

```shell
composer global require hirak/prestissimo
```

credit: [@VuNhatMinh](http://kipalog.com/users/VuNhatMinh/mypage)

---

# Composer là gì?

Vài năm trước, nếu bạn có biết đến PHP, chắc hẳn bạn sẽ phải viết lại một mớ code cho các tác vụ cơ bản như xác thực người dùng (đăng nhập/đăng xuất/đăng kí), quản lí database, tích hợp với Amazon S3 …. và nhiều tác vụ cơ bản khác. Khi làm việc với các Framework như [Zend](http://framework.zend.com/), hoặc [Laravel](http://laravel.com/) or [Symfony](http://symfony.com/). Để dùng một thành phần của các framework cũng là một điều hết sức khó nhằn vì bạn phải đọc các class để lấy ra thành phần bạn thích (ví dụ như trong các project không dùng Laravel, mình luôn tích hợp Eloquent ORM để dễ dàng thao tác với database).

Và đây là lí do mà Composer ra đời. Nó giúp bạn quản lí từng package (gói code) riêng lẻ theo từng project. Composer sẽ tự động tải về và quản lí các thư viện mà bạn yêu cầu. Bạn chỉ cần tập trung vào ứng dụng chính cùa mình.

Cách quản lí này không phải là mới, thực tế thì Composer lấy ý tưởng từ các bộ quản lí như [npm](https://npmjs.org/) của [Node.js](http://nodejs.org/) và [Gem](http://gembundler.com/) của [Ruby](http://www.ruby-lang.org/).

> Có thể bạn biến đến  [PEAR](http://pear.php.net/). Nó cũng có chức năng quản lí các gói code cho PHP từ nhiều năm trước. Nhưng đã bị các lập trình viên từ chối sử dụng vì nhiều lí do. Đầu tiên là hầu hết các gói code trong PEAR đều cũ và không được cập nhật thường xuyên. Thứ hai, PEAR quản lí các gói code trên toàn hệ thống. Nói một cách dễ hiểu thì bạn có 1 project cũ dùng gói code A phiên bản 1.0. Sau đó bạn làm một project mới, và gói code A đó ra mắt phiên bản 2.0 với nhiều tính năng hơn. Tuy nhiên, nếu bạn dùng bản 2.0 cho project mới, project cũ sẽ tự động update gói code A lên bản 2.0. Điều này sẽ gây ra không ít thì nhiều sẽ làm cho ứng dụng của bạn hoạt động sai.
>
> Tham khảo : [Packages: The Way Forward for PHP](https://philsturgeon.uk/blog/2012/03/packages-the-way-forward-for-php/) bởi **Phil Sturgeon**

## Bước 1: Cài đặt Composer?

### Trên Unix (Mac OSX và Linux)

– Chuyển tới thư mục project của bạn và gõ lệnh

```shell
cd /path/to/my/project
curl -s http://getcomposer.org/installer | php
```

Phiên bản composer mới nhất sẽ được tải về máy bạn.

Để kiểm tra hãy gõ

```shell
php composer.phar
```

Danh sách các lệnh có sẵn sẽ hiển thị. Thật dễ dàng phải không nào.  
Tuy nhiên để tiện dùng thì các bạn gõ thêm lệnh sau:

```shell
sudo mv composer.phar /usr/bin/composer
```

Từ nay để sử dụng composer ở bất kì thư mục nào, bạn chỉ cần gõ `composer` Thay vì `php composer.phar`

### Trên Windows

Đơn giản là tải và cài đặt phiên bản Composer mới nhất tại [https://getcomposer.org/Composer-Setup.exe](https://getcomposer.org/Composer-Setup.exe "Download Composer")

Sau đó bạn có thể dùng composer qua lệnh `composer` trong CMD hoặc PowerShell

**Lưu ý:** Composer được viết bằng PHP nên bạn phải cài PHP trước khi cài Composer

## Bước 2 : File composer.json

File `composer.json` cũng có cấu trúc tương tự như file `package.json` của [npm](https://www.npmjs.com/) hay `Gemfile` của [Ruby](https://rubygems.org/)

Đây là cấu trúc cơ bản nhất của một file `composer.json`

```javascript
{
  "require":
   {
     "cocur/slugify": "*"
   }
}
```

Trong ví dụ trên chúng ta đang yêu cầu gói code `slugify` của tác giả `cocur` và chúng ta có thể dùng bất cứ phiên bản nào. Để xác định rõ phiên bản, chúng ta có thể thêm vào:

```javascript
"cocur/slugify": "1.0"
```

hoặc kết hợp cả 2

```javascript
"cocur/slugify": "1.0.*"
```

`1.0.*` có nghĩa là ta chấp nhận cái bản vá lỗi nhỏ như 1.0.2, 1.0.3 nhưng không nâng cấp lên bản 1.1

Các bạn có thể tìm hiểu thêm về cách yêu cầu phiên bản tại đây

## Bước 3: Cài đặt các package đã yêu cầu

Sau khi đã thiết lập các package cần thiết trong file `composer.json`. Hãy mở Terminal/CommandPrompt lên và gõ lệnh

```shell
composer install
```

Đợt 1 tí để Composer tải và cài đặt các package bạn đã yêu cầu (kèm với các package đi kèm). Tất cả các package được tải về sẽ nằm trong thư mục `vendor/` (thư mục nằm cùng cấp với file composer.json). Nếu thích bạn có thể đổi tên thư mục này tùy thích bằng cách cấu hình :

```javascript
{
  "require":
  {
    "cocur/slugify": "*"
  },
  "config" :
  {
    "vendor-dir" : "packages"
  }
}
```

## Bước 4: Autoloading

Đến đây thì mọi việc rất dễ dàng. Trong file chính của project, hãy thêm dòng này vào :

```php
include_once './vendor/autoload.php';
```

Tất cả các package bạn cần bây giờ đã được thêm vào project, sẵn sàng cho bạn sử dụng. Rất dễ dàng phải không nào?

**Lưu ý** : *Nếu ở trên bạn đã thay đổi thư mục vendor thì hãy nhớ chỉnh sửa đường dẫn include phù hợp.*

Ví dụ đơn giản sử dụng Slugify trong project của bạn :

```php
use CocurSlugifySlugify;
$slugify = new Slugify();
echo $slugify->slugify('Hello World!'); // hello-world
```

## Bước 5 : Cập nhật package

Việc cập nhật rất đơn giản, bạn chỉ cần gõ `composer update` , Composer sẽ tự động cập nhật các package cho bạn. Nếu muốn cập nhật lên các phiên bản mới hơn hoặc các bản release, hãy chỉnh sửa file `composer.json`

**Chú ý: Không bao giờ chạy lệnh** `composer update ` **trong môi trường thực tế (production) mà hãy kiểm tra trên máy để tránh tình trạng không tương thích.**

# Kết luận:

Với vài thao tác đơn giản, bạn đã có thể cài đặt cái package cần thiết. Composer giúp lập trình viên giảm bớt suy nghĩ về các package và chỉ tập trung vào ứng dụng chính của mình. Hiện tại, hầu hết các Framework đều hỗ trợ Composer, có thể kể đến như cái tên như : [CodeIgniter](http://codeigniter.com/), Symfony2, Laravel, FuelPHP…

Tham khảo: [TutsPlus](http://code.tutsplus.com/tutorials/easy-package-management-with-composer--net-25530)
