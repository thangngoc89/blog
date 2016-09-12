---
layout: Post
title: 'Tìm hiểu định dạng MDict (MDD/MDX)'
date: 2016-04-05 07:00:00
route: tim-hieu-dinh-dang-mdict
tags: [algorithm]
toc: false
---

[MDict](http://www.octopus-studio.com/index.en.htm) là một phần mềm đọc tự điển cho định dạng MDD và MDX (cũng do MDict tạo ra) với khả năng tra những danh mục từ điển hàng nghìn từ một cách siêu nhanh và đã rất nổi tiếng từ thời Window Mobile 5.0.

Từ lâu mình thắc mắc tại sao MDict có thể làm điều đó trong một điều kiện bộ nhớ chật hẹp của thiết bị di động. Đáng buồn là tuy phần mềm MDict là freeware nhưng định dạng MDD và MDX lại là close source. Tuy nhiên cộng đồng open source đã reversed engineer nó và cho ra một bản mô tả (có thể coi gần như là đầy đủ) cho 2 định dạng này. Bây giờ note lại ở đây cho dễ tìm kiếm sau này.

- [An Analysis of MDX/MDD File Format](https://bitbucket.org/xwang/mdict-analysis) : bài đầu tiên. Cho ra một cái nhìn tổng quát về định dạng MDD/MDX. Kèm với đó là một parser bằng Python.
- [Write Mdict](https://github.com/zhansliu/writemdict/): Một bảng mô tả định khác tập trung hoàn thiện bài ở trên bằng các mô tả cách tạo ra file MDD/MDX kèm theo đó là một writer bằng Python
- Cách parser bằng ngôn ngữ khác:

  - [C++ từ golden dict](https://github.com/goldendict/goldendict/blob/30dad341d1ba1e8e672733f8451efeaba902746c/mdictparser.cc)
  - [C. NET class](https://mdict.codeplex.com/)
  - [Javascript có thể chạy trên parser. Rất mượt](https://github.com/fengdh/mdict-js)

Bước tiếp theo của mình: Viết một cái app bằng React Native đơn giản có thể đọc định dạng này kèm với bookmark vì mấy phần mềm có sẵn trên Android một là quá lởm, hai là quảng cáo mà lại yêu cầu gửi tiền qua Paypal sẽ nhận được code kích hoạt bản pro (wtf thời nào rồi mà không dùng Google Play Payment)

Mình không có development environment của React Native cho iOS nên anh em nào có hứng thú mình có thể làm chung.

P/S: Nếu còn hứng thú thì port nó thành cross-platform desktop app chạy trên Electron (vì mình có thể :)) )
