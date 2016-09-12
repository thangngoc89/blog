---
layout: Post
title: "json ⊄ js"
date: 2016-02-19 23:22:00
tags: [js, json]
translate:
  url: "https://medium.com/joys-of-javascript/json-js-42a28471221d#.m23ozaapw"
  author: "Dan Pupius"
---

Mọi người thường nói rằng JSON là một phần nhỏ (subset) của Javascript.

Vấn đề là nó không phải như vậy.

Dựa vào [spec](http://www.json.org/) của JSON, một chuỗi có thể chứa bất cứ kí tự unicode nào ngoại trừ `"` hoặc `/` hoặc kí tự điều khiển.

Điều là có nghĩa là chuỗi dưới đây hoàn toàn hợp lệ với JSON:

<script src="https://gist.github.com/thangngoc89/b136d0aabdbff3d8afa4.js"></script>

Hãy thử copy chuỗi trên và dán vào console, gán cho nó 1 biến bất kì. Thử đi, mình sẽ chờ.

Yup. `“SyntaxError: Unexpected token ILLEGAL”.`

Vấn đề nằm ở 2 kí tự unicode được được Javascript định nghĩa là kí tự kết thúc dòng: kí tự kết thúc dòng `\u2028` và kí tự phân cách đoạn văn `u2029`. Chuỗi trên nếu được escape thì sẽ như thế này `own\u2028ed`.

# Vấn đề nằm ở đâu ?

JSON hiện tại được dùng như là một cách thuận tiện định dạng dữ liệu và hầu hết trường hợp không dùng JSON dựa trên **JSON là một phần nhỏ của JS**. Tuy nhiên, có vài trường hợp nó sẽ gây ra vấn đề.

Trong [JSONP](http://en.wikipedia.org/wiki/JSONP) (JSON with padding), server gửi dữ liệu kèm với một callback sẽ được chạy ở trang yêu cầu dữ liệu:

```js
handleResponse({"status": "ok", "id": 123456});
```

Vài thư viện javascript sử dụng một phương thức không an toàn, nhưng nhanh, parse JSON sử dụng `eval` để hỗ trợ các trình duyệt cũ:

```js
function unsafeParse(json) {
 return eval("(" + json + ")");
}
```

Và trường hợp thông dụng nhất là chèn các dữ liệu từ được tạo ra từ server để tránh phải gửi thêm request mới.

```js
var GLOBALS = {
 "userid": 123456,
 "twitterName": "dpup",
 "role": "editor"
};
```

Trong tất cả trường hợp trên, một kí tự kết thúc dòng sẽ gây lỗi phiên mã, và gần như là sẽ làm cho trang web của bạn không hoạt động.

# Xử lí thế nào ?

> JSON is done. JSON will not be revised.
>
> *Douglas Crockford*, [2009](https://mail.mozilla.org/pipermail/es-discuss/2009-June/009451.html)

Mặc dù trích dẫn ở trên thuộc một cuộc thảo luận khác, tuy nhiên nó vẫn đúng với vấn đề này. Dù tốt hay xấu mình chúng ta buộc phải sử dụng JSON.

Vì vậy, chúng ta cần một cách để xử lí.

Một phương án là sẽ esape tất cả kí tự không phải là kí tự ASCII. Ví dụ như với [hàm escapeString của Closure](https://github.com/google/closure-library/blob/master/closure/goog/string/string.js#L1003)

Hoặc chúng ta có thể coi 2 kí tự trên là vấn đề, và dùng một hàm tương tự như bạn dưới để xử lí:

```js
function jsStringify(obj) {
 return JSON.stringify(obj)
 .replace(/\u2028/g, '\\u2028')
 .replace(/\u2029/g, '\\u2029');
}
```
