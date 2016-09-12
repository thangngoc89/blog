---
layout: Post
title: 'Tạo logo Slack động với CSS3'
date: 2016-02-02 19:51:00
image: '/images/2016/slack-logo/slack-featured.png'
tags: [css]
draft: true
---

# Demo

<iframe height='268' scrolling='no' src='//codepen.io/thangngoc89/embed/QyBQQg/?height=268&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='http://codepen.io/thangngoc89/pen/QyBQQg/'>Slack logo with pure CSS3</a> by Khoa Nguyen (<a href='http://codepen.io/thangngoc89'>@thangngoc89</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

# Slack & The Logo

Slack là một cái tên khá nổi bây giờ. Slack giúp cho việc giao tiếp giữa
các thành viên trong nhóm trở nên dễ dàng hơn. Mình chọn Slack logo để viết bài
vì Slack logo được dùng làm loading indicator trong chính app Slack, một ý tưởng
cực kì hay

Nếu bạn nhìn vào logo, nó bao gồm 4 chấm màu. Các chấm này dãn rộng thành que,
sau đó co nhỏ lại và trở về vị trí ban đầu. Chúng chồng lên nhau một tí
và toàn bộ logo được xoay nghiêng. Với vài phép toán đơn giản cùng với sự hỗ trợ
của SASS, tạo một logo cùng với hiệu ứng động như vậy là không quá khó.
Mình hy vọng là sau bài này, các bạn sẽ tự tin hơn với việc dùng hiệu ứng động
của CSS trong các dự án tiếp theo. Bắt đầu nào !

# HTML

Như mình đã nói ở trên, logo gồm 4 chấm/que với 4 màu khác nhau. Các chấm này sẽ nằm trong 1 thẻ `<div>` cha. Mỗi chấm sẽ có 1 class CSS riêng giúp chúng ta có thể định vị trí, màu sắc và hiệu
ứng riêng lẻ. Đây là phần HTML:

```html
<div class="c-slack">
  <span class="c-slack__dot c-slack__dot--a"></span>
  <span class="c-slack__dot c-slack__dot--b"></span>
  <span class="c-slack__dot c-slack__dot--c"></span>
  <span class="c-slack__dot c-slack__dot--d"></span>
</div>
```

Tới lúc này thì bạn sẽ không thấy bất cứ thứ gì cả. Chúng ta cần CSS.

# Thiết kế các biến SASS và định dạng cho `<div>` cha

Mình sẽ dùng SASS (chính xác hơn là SCSS) để tạo biến và làm các
phép toán. Nó sẽ giúp ích cho chúng ta rất nhiều trong bài viết này.
Vài biến mà chúng ta cần dùng:

1. Kích cỡ logo. Mình chọn 96px để tạo thành 1 container hình vuông
2. Kích cỡ của các chấm. 18px là phù hợp với kích thước 96px.
3. Logo sẽ được xoay nghiêng. Theo đo đạc trên logo gốc của đó sẽ là 15 độ
4. Chúng ta cũng cần thời gian để hoàn thành hiệu ứng động. 2 giây
là khá ổn.
5. Cuối cùng, logo sẽ gồm 4 mày. Mình cũng thiết lập biến cho
4 màu này để đơn giản hóa vấn đề.

Đây là toàn bộ các biến chúng ta sẽ sử dụng:

```scss
// variables

$slack-size: 96px;
$dot-diameter: 18px;
$slack-angle: 15deg;
$duration: 2s;

$slack-blue: #6ecadc;
$slack-yellow: #e9a820;
$slack-pink: #e01563;
$slack-green: #3eb991;
```
