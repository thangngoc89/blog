---
layout: Post
title: Cách flush DNS trên Ubuntu
date: 2016-09-10
tags: [til, ubuntu]
---

Trên Windows mọi phiên bản thì đơn giản là dòng lệnh thế này:

```sh
ipconfig /flushdns
```

Ubuntu 14.04 - 16.10.1

```sh
sudo /etc/init.d/dns-clean restart
sudo /etc/init.d/networking force-reload
```

Ubuntu 12.04 trở xuống

```sh
sudo /etc/init.d/nscd restart
sudo /etc/init.d/dnsmasq restart
```
