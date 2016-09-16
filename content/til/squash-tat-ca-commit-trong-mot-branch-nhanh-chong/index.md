---
layout: Post
title: Squash tất cả commit trong một branch nhanh chóng
date: 2016-09-16
tags: [til, git]
---

Bình thường:

```sh
git rebase -i master
```

Chọn `r` (rename) để đặt lại tên cho commit đầu
Chọn `f` (fixup) hoặc `s` (squash) trên từng commit

![](rebase.png)

Nhanh hơn

```sh
git reset --soft master
git commit -m "Tên cho commit đầu ở đây"
```
