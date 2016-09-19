---
layout: Post
title: Xóa tất cả các git branch trừ master
date: 2016-09-19
tags: [til, git]
---

Mình thường tạo ra rất nhiều branch khi làm việc với git. Nhiều khi vài chục
branch cùng một lúc.

![](git-branch-mess.png)

Nếu các bạn muốn xóa nhanh tất cả các branch và chỉ chừa lại branch master,
câu lệnh dưới đây dành cho bạn:

```sh
git checkout master && git branch -D `git branch | grep -v master`
```

**!! Câu lệnh trên chạy mà không có bất cứ cảnh báo nào**
