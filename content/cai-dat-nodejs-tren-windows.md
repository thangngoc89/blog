---
layout: Post
title: Cài đặt Node.JS trên Windows
date: 2015-01-04 23:48:11.000000000 -05:00
tags: [js]
toc: false
---

Hôm qua mình có cài lại máy, kéo theo đó là một số chương trình cho việc lập trình trong đó có [NodeJS](http://nodejs.org/).

Nhưng mà khi cài vào mình phải dùng Node.JS Command Prompt được đi kèm thì mới gọi được lệnh `node` và `npm` (Node Packaged Modules).
Sau một hồi search Google thì mình đã tìm ra được giải phải hiệu quả nhất.

* Rất đơn giản, truy cập vào thư mục cài đặt Node.JS, mặc định:

  * Nếu bạn cài bản x86 thì đó là `C:\Program Files (x86)\nodejs\`
  * Nếu bạn cài bản x86 thì đó là `C:\Program Files\nodejs\`

* Đè phím `SHIFT` và nhấn chuột phải > `Open command windows here`
* Gõ vào các lệnh sau:

```shell
set path=%PATH%;%CD%  
setx path “%PATH%”  
```

Xong rồi. Thử vào bất cứ thư mục nào gõ các lệnh sau để kiểm tra:

```shell
$ node -v
v0.10.35
$ npm -v
1.48.28
```

Nếu bạn chưa cài đặt Node.JS hãy tải từ [trang chủ](http://nodejs.org/download/)

Nguồn [http://www.hacksparrow.com/install-node-js-and-npm-on-windows.html]
