---
layout: Post
title: "React.Component với React.createClass"
date: 2016-02-19 00:39:00
tags: [reactjs]
translate:
  url: http://reactjsnews.com/composing-components/
  author: "Naman Goel & Zach Silveira"
---

# Giới thiệu

React hỗ trợ 2 cách để tạo Component.
Bạn có thể kế thừa từ class `React.Component` hoặc là
dùng cú pháp cũ `React.createClass` đã có từ khi React ra đời.
Có lí do nào cụ thể để dùng một cú pháp thay vì cú pháp còn lại?

Thực tế, nó hoàn toàn phụ thuộc vào bạn.

Theo quan điểm của mình thì nó chẳng có khác biệt gì lớn.
Trong hầu hết mọi trường hợp, sự khác biệt giữa `React.createClass`
và `class X extends React.Component` chỉ là cú pháp. Nếu bạn
không dùng mixin hoặc decorator thường xuyên thì chỉ việc dùng cấu
trúc nào bạn thích nhất.

Ngoài ra, có vài lí do thực sự buộc bạn phải chọn một cú pháp
nhất định.

Có vài tính năng bạn sẽ không thể sử dụng khi dùng ES6 class như là
mixin, hàm autoBound và `this.isMounted`. ES6 class cũng có nghĩa là
bạn sẽ phải phụ thuộc vào một công cụ build (như Babel). Nếu bạn
không dùng JSX, và đã viết ES5 code không cần chuyển đổi, đây thực
sự là một lí do quan trọng.

Nhưng trước khi nêu ra những ưu điểm và nhược điểm,
cần phải nói rõ rằng dùng ES6 class thay vì `React.createClass`
KHÔNG làm code của bạn mất đi, hoặc có thêm tính hướng đối tượng
(Object oriented). Nó chỉ là sự khác biệt về cú pháp, nó có ít tính
năng hơn, nhưng điều quan trọng là bạn đang dùng
`constructor pattern` thay vì `factory pattern`. Vì vậy, nếu bạn muốn
code của bạn rõ ràng hơn, đây chính là một điều không thể bàn cãi đối với bạn.

Mặt khác, ES6 class giúp bạn có thể dễ dàng thừa kế (inheritane).
Nhưng mình khuyên là đừng làm như vậy, hãy bỏ ngay ý tưởng dùng
ES6 class chỉ để thực hiện một chuỗi thừa kế dài, hãy dùng
`React.createClass` và kèm với mixin.

# Lí do để dùng `React.createClass`

## "Tôi thích hàm auto-binding"

Đây là một lí do chính đáng, tuy nhiên bạn có thể autobind với ES6 class
[(bài viết từ React)](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding)

```js
class Counter extends React.Component {
  constructor () {
    super();
    this.tick = this.tick.bind(this);
  }
  tick () {
    ...
  }
  ...
}
```

Sử dụng Babel `stage: 0` bạn có thể viết class như thế này:

```js
class Counter extends React.Component {
  tick = () => {
    ...
  }
  ...
}
```

Nếu bạn không thích `stage: 0`, có lựa chọn khác dành cho bạn.
Ví dụ như là dùng
[autobind decorator](https://github.com/andreypopp/autobind-decorator)

Decorator cũng là `stage: 0` nhưng bạn thực sự không cần stage 0
dể dùng `autobind decorator`

```js
class Counter extends React.Component {
  tick () {
    ...
  }
  ...
}

export default autobind(Counter)
```

## "Tôi thích mixins"

Đây gần như là lí do chính mọi người vẫn sử dụng `React.createClass`.
Có rất nhiều code React vẫn còn dựa trên mixins. Tuy nhiên, bạn có thể dùng
[React-mixin](https://www.npmjs.com/package/react-mixin)
để có mixin với ES6 class

## `this.isMounted`

Bạn chẳng bao giờ sử dụng `this.isMounted` cả, và khi bạn cần, nó
cũng rất dễ để thêm vào.

```js
class Counter extends React.Component {
  componentDidMount () {
    this.isMounted = true
  }
  tick () {
    ...
  }
  ...
}
```

Bản thân mình chẳng bao giờ sử dụng tính năng này.

# Lí do để chuyển sang dùng cú pháp ES6

## Autobinding?

Vấn đề về `context` trong Javascript khá là nhức nhối. Việc
tự động `autobinding` được `React.createClass` thực hiện đôi
khi gây khó hiểu cho những bạn mới làm quên, và sự rắc rối của
binding có thể làm bạn khó hiểu trong nhiều tháng liền.
Với ES6 class, bạn phải tự thực hiện binding. Điều này giúp
code của bạn rõ ràng hơn, ít "thần kì" hơn. Và sẽ giúp cho các
lập trình viên mới tiếp xúc với React biết thực "chuyện gì đang xảy ra". Bằng sự trợ giúp của Babel với các tính năng của
ES6/7, binding thủ công không còn là một vấn đề lớn.

## Bỏ qua Mixins, hãy dùng Higher-Order-Components

Nếu bạn có xem qua bất cứ thảo luận nào về ES6 class, bạn sẽ
thấy mọi người nói bạn dùng **kết hợp** (composition) thay cho **thừa kế**.
Bạn có thể đã thấy meme này

![compose all the things](/images/2016/react-component-vs-create-class/compose-all-the-things.png)

Sự thật thì thừa kế là một cách tồi tệ để viết code. Nó đến lỗi, lỗi thời và khó hiểu. Nó buộc bạn phải viết theo một
cách giống nhau. Mixins chắc chắn là một giải phải tốt hơn
(thừa kế), nhưng các lập trình viện thừa lạm dụng chúng để
làm những thứ có thể dễ dàng đạt được với kết hợp. Và điều
quan trọng nhất là Higher-Order-Component có thể dùng với cả
hai cách tạo Component và cả pure functions.

> Đọc thêm
> [Mixins are dead long live higher oder components](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.ki6u85yvc)

## Không còn code thừa (No Cruft)

Loại bỏ những tính năng hiếm khi sử dụng như `this.isMounted`
sẽ giúp React nhẹ hơn và linh hoạt hơn. Theo thời gian, điều
này sẽ giúp React nhanh hơn. Mình biết là tất cả chúng ta đều
yêu React, nhưng chúng ta cũng muốn có tốc độ phải không nào ?

## FlowTypes

Đây là điều mà mình thích nhất. Trong một thời gian dài, mình
đã cố tình bỏ qua Typescript và Flow, nhưng sau khi mất nguyên
một ngày vì gõ sai tên `sự kiện` (event), mình bắt đầu dùng
Flow và chưa bao giờ nhìn lại. Flow giúp bạn thực hiện chuyển
đổi một cách chậm chạp, theo từng file. Và đừng xem thường, nó
sẽ giúp bạn tìm ra hàng tá lỗi mà bạn chưa từng biết đến sự
tồn tại.

Nhưng điều này giúp ích gì khi dùng ES6 class ?
Flowtype và Typescript sẽ dễ dàng hơn nếu bạn đang dùng ES6 class.

Đây là một ví dụ:

ES6 class

```js
class X extends React.Component {
  someProp: string | number;
  state: SomeType;
  props: SomeType;
  ...
}
```

React.createClass

```js
React.createClass({
  someProp: (0: string | number),
  ...
})
```

Và sự thật là bạn không thể định kiểu (type) cho props và state với
flow khi dùng React.createClass. Thay và đó, Flow phụ thuộc
vào hàng tá code để có thể xác định kiểu bằng việc đọc `propTypes`.
Thực tế thì nó chưa bao giờ làm tốt như vậy. Và đừng có nghĩ đến việc
kiểm tra kiểu (type checking) với state. Nó đơn giản là không thể.

# Kết luận

Cả 2 kiểu tạo component như trên đều sẽ không biến mất trong
tương lại gần. Nếu ES6 class trở thành cách mà mọi người chọn
thay vì `createClass`, Javascript cần nhiều hơn là một `sugar syntax`
(tạm dịch là cú pháp thân thuộc), nó cần `class` thực sự.
Mình chọn viết component bằng ES6 class vì nó nhìn gọn hơn,
không cần đặt dấu phẩy và sau mỗi hàm, và những điều hạn chế
kể trên với cú pháp này không ảnh hướng nhiều đến mình.
