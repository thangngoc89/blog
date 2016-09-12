---
layout: Post
title: 'Câu lệnh Bash bạn hay sử dụng'
date: 2016-01-26 07:00:00
tags: [bash]
toc: false
---

Nếu bạn muốn xem các câu lệnh bash được sử dụng nhiều nhất
hãy gõ lệnh sau vào Terminal (Linux và MacOSX đều chạy):

```shell
history | awk '{print $2}' | sort | uniq -c | sort -rn | head
```

Đây là danh sách những câu lệnh được dùng nhiều nhất của mình (Linux Mint)

```shell
213 npm
196 git
164 cd
 84 gitp
 74 gits
 54 gitc
 52 gita
 33 ll
 30 nah
 14 rm
```

Của bạn thì sao ? Hãy gửi dưới phần bình luận nhé
