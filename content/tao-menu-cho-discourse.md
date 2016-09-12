---
layout: Post
title: Tạo menu cho Discourse
date: 2015-01-09 00:10:59
tags: [discourse, css]
toc: false
---

# Giới thiệu

Có nhiều bạn hỏi mình về cái menu Discourse của mình. Hôm nay mình sẽ chia sẽ code với các bạn.
Menu sẽ tự động ản khi bạn trượt xuống nên yên tâm là sẽ không tốn quá nhiều diện tích.
Demo : [Hỏi Đáp Y Học](http://ask.hoidapyhoc.com)

# Tiến hành

Với công cụ tích hợp của Discourse thì việc sửa/ thêm style trở nên rất đơn giản.

1. Vào Admin Dashboard
2. Customize > CSS/HTML
3. Tạo 1 Style mới (ví dụ Toolbar)

![toolbar](/images/2015/01/toolba.jpg)

4. Ở CSS và CSS Mobile

```css
ul#top-navbar-links {
  margin: 0;
  padding: 0;
  float: right
}
#top-navbar-links li {
  list-style: none;
  display: inline;
  margin: 0 0 0 20px;
  padding: 0;
}

#top-navbar-links li a {
  font-size: 12px;
  line-height: 40px;
  font-family: "Helvetica Neue", helvetica, arial, sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  color: #FF4742;
  display: inline-block;
}

#top-navbar-links li a:hover,
#top-navbar-links li a:focus {
    color: #FF4742
}

#top-navbar-links li a .fa {
    font-size: 20px;
    vertical-align: -2px;
}
```

Ở `Header` và `Header Mobile`
Các bạn nhớ chỉnh lại link cho phù hợp. Muốn dụng icon các bạn có thể xem [Font AweSome](http://fortawesome.github.io/Font-Awesome/icons/) (tích hợp sẵn trong Discourse)

```html
<div id="top-navbar" class="container">
<ul id="top-navbar-links">
  <li><a href="http://hoidapyhoc.com/">Trang chủ</a></li>
  <li><a href="http://hoidapyhoc.com/quiz">Quiz - Kho đề trắc nghiệm</a></li>
  <li><a href="https://www.facebook.com/hoidapyhoc" target="_blank"><i class="fa fa-facebook-square"></i> Fanpage</a></li>
</ul>
</div>
```
