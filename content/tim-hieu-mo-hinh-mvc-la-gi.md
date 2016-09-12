---
layout: Post
title: Mô hình MVC là gì?
date: 2015-01-04 14:58:21.000000000 -05:00
tags: [mvc]
---

Nếu bạn là một lập trình viên, nhất là lập trình web, sẽ rất khó để bạn có thể xin được việc nếu không biết mô hình MVC. Trong post này mình sẽ trình bày đến các bạn mô hình MVC là gì theo cách hiểu của mình qua một vài dự án sử dụng MVC?

# MVC là gì?

MVC là viết tắt của Model – View – Controller. Là một kiến trúc phần mềm hay mô hình thiết kế được sử dụng trong kỹ thuật phần mềm. Nói cho dễ hiểu, nó là mô hình phân bố source code thành 3 phần, mỗi thành phần có một nhiệm vụ riêng biệt và độc lập với các thành phần khác.

# Các thành phần trong MVC

## Controller

Giữ nhiệm vụ nhận điều hướng các yêu cầu từ người dùng và gọi đúng những phương thức xử lý chúng… Chẳng hạn thành phần này sẽ nhận request từ url và form để thao tác trực tiếp với Model.

## Model

Đây là thành phần chứa tất cả các nghiệp vụ logic, phương thức xử lý, truy xuất database, đối tượng mô tả dữ liệu như các Class, hàm xử lý…

## View

Đảm nhận việc hiển thị thông tin, tương tác với người dùng, nơi chứa tất cả các đối tượng GUI như textbox, images… Hiểu một cách đơn giản, nó là tập hợp các form hoặc các file HTML.

# Luồng đi trong MVC

Để giải thích, mình xin dùng 1 ví dụ đơn giản + hình minh họa sau.

![Mô hình MVC](/images/2015/01/mo-hinh-mvc.jpg)

Khi có một yêu cầu từ phía client gửi đến server, Bộ phận controller có nhiệm vụ nhận yêu cầu, xử lý yêu cầu đó. Và nếu cần, nó sẽ gọi đến phần model, vốn là bộ phần làm việc với Database..

Sau khi xử lý xong, toàn bộ kết quả được đẩy về phần View. Tại View, sẽ gen ra mã Html tạo nên giao diện, và trả toàn bộ html về trình duyệt để hiển thị.

# Ưu điểm và nhược điểm của MVC

## 1. Ưu điểm

Thể hiện tính chuyên nghiệp trong lập trình, phân tích thiết kế. Do được chia thành các thành phần độc lập nên giúp phát triển ứng dụng nhanh, đơn giản, dễ nâng cấp, bảo trì..

## 2. Nhược điểm

Đối với dự án nhỏ việc áp dụng mô hình MC gây cồng kềnh, tốn thời gian trong quá trình phát triển. Tốn thời gian trung chuyển dữ liệu của các thành phần.

# Tóm lại

Để lập trình chuyên nghiệp, làm việc trọng một nhóm nhiều người, việc áp dụng mô hình trong thiết kế là điều bắt buộc. MVC là một mô hình khá đơn giản và thích hợp cho những người chưa nhiều kinh nghiệm. Hy vọng qua bài giới thiệu này các bạn có những kiến thức cơ bản về mô hình thiết kế trong làm phần mềm.

Nguồn : [laptrinhvien.net](http://laptrinhvien.net/blog/tim-hieu-mo-hinh-mvc-la-gi/)
