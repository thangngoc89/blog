---
layout: Post
title: Facebook Comment Responsive
date: 2015-01-07 05:16:10.000000000 -05:00
tags: [css]
---

Mặc định thì Facebook Comment không hỗ trợ responsive, tuy nhiên với 1 ít hack với CSS và HTML5, Facebook Comment ngay lập tức sẽ hỗ trợ responsive.

# Lấy code Facebook Comments

Truy cập vào Facebook Developers tại : [https://developers.facebook.com/docs/plugins/comments?locale=vi_VN]

Giao diện chính xuất hiện:
![Facebook Comment](/images/2015/01/facebookcomment.jpg)

Ở đây có 4 nhưng chúng ta chỉ quan tâm đến :

* Number of Posts: Số comment được hiển thị mặc định (Càng nhỏ thì web càng ít tốn thời gian load)
* Color Scheme: Màu sắc. Có 2 loại là **light** và **Dark**

Kéo xuống dưới và nhấn **Get Code**
Facebook sẽ cung cấp cho chúng ta 2 đoạn code riêng biệt.

# Chèn code vào Website

Đầu tiên là chèn đoạn code này ngay sau tag `<body>`

```javascript
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&appId=383096061852800&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
```

Đoạn code còn lại, sẽ có dạng thế này :

```javascript

<div class="fb-comments"
  data-href="http://developers.facebook.com/docs/plugins/comments/"
  data-numposts="5"
  data-colorscheme="dark">
</div>

```

Chúng ta sẽ sửa thành:

```javascript
<div class="fb-comments"
  data-href="http://developers.facebook.com/docs/plugins/comments/"
  data-numposts="5"
  data-colorscheme="dark"
  data-width="100%">
</div>
```

Các bạn nhớ thay đoạn `data-href` thành URL của trang hiện tại (có thể thay bằng Javascript hoặc in ra bằng backend như PHP, Ruby...)

Chèn đoạn code đã sửa vào vị trí mong muốn trong website.

Cuối cùng là thêm vào CSS:

```css
/*Facebook comment*/
.fb_iframe_widget,
.fb_iframe_widget span,
.fb_iframe_widget span iframe[style] {
  min-width: 100% !important;
  width: 100% !important;
}
```

Mở ngay trình duyệt và thử nghiệm Facebook Comment Responsive thôi nào. :D
