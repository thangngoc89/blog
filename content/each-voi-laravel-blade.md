---
layout: Post
title: '@each với Laravel Blade'
date: 2015-03-16 10:00:00
description: 'Sử dụng @each trong Laravel Blade để giúp template gọn gàng hơn'
tags: [laravel]
toc: false
---

Làm việc với Laravel, khi bạn gửi 1 collection ra view thì có 2 trường hợp xảy ra

1. Loop qua collection và hiển thị kết quả
2. Nếu collection trả về kết quả là `null` thì
hiển thị một thông báo dạng như là `Không có kết quả nào` ....

Đây chắc hẳn là cấu trúc mọi người thường dùng :

```blade
@if (count($records))
    @foreach ($records as $record)
        @include('record.item', $record)
    @endforeach
@else
    @include('record.no-items')
@endif
```

Cấu trúc trên không có gì sai,
nhưng mình sẽ giới thiệu một cấu trúc khác, không **rối** như vậy:

```blade
// record/list.blade.php
<ul>
    @each('record.item', $records, 'record', 'record.no-items')
</ul>

// record/item.blade.php
<li>{{ $record->title }}</li>

// record/no-items.blade.php
<li>Không có kết quả nào</li>
```

Bạn thấy đấy, từ 1 cấu trúc nested với `if .. esle` bạn có thể viết lại nó chỉ trong 1 dòng với `@each`

Nguồn: [laravel-news](https://laravel-news.com/2014/09/laravel-blade/)
