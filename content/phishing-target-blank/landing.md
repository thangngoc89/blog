---
layout: Page
title: Bạn vừa trở thành con mồi
feature-img: ./cover.jpg
route: phishing-target-blank/landing.html
---

Bạn bị chuyển tới trang này vì trang web bạn đã truy cập không được bảo vệ khỏi lỗ hổng [`window.opener`](https://developer.mozilla.org/en-US/docs/Web/API/Window/opener)
thông dụng. Lỗ hổng này có thể dễ dàng biến bạn thành nạn nhân của những cuộc lừa đảo trên mạng (phishing).

Trang web bạn vừa truy cập cho phép [khoanguyen.me](https://khoanguyen.me) chuyển hướng bạn đến bất kì trang web nào mà không cần sự đồng ý của bạn. Những trang được chuyển đến thường sẽ hiển thị một trang đang nhập và yêu cầu bạn đăng nhập lại. Bạn sẽ không bao giờ biết được mình đã bị mất mật khẩu.

Khi một trang web sử dụng `target="_blank"` để mở các liên kết qua một thẻ hoặc cửa sổ mới, trang web đó đã cấp quyền cho trang vừa mở truy cập vào `window` object thông qua [window.opener](https://developer.mozilla.org/en-US/docs/Web/API/Window/opener) API.

Để khắc phục tình trang này, mọi trang web cần phải thêm thuộc tính `rel="noopener noreferrer"` vào bất kì liên kết nào có `target="_blank"`. Mình không biết rõ tại sao lỗ hổng này vẫn còn tồn tại đến nay chưa được các trình duyệt khắc phục. Vì tính chất cực kì phổ biến của lỗ hổng, mình khuyến khích các bạn hãy báo cho lập trình viên của trang web vừa truy cập để khắc phục sớm nhất có thể.

Tìm hiểu thêm thông tin về lỗ hổng thông qua bài viết chi tiết của mình tại: https://khoanguyen.me/phishing-target-blank/

Hãy like và theo dõi fanpage [Khoa Nguyen dot me](https://fb.com/khoanguyendotme) để cập nhật những thông tin mới nhất về lập trình web và bảo mật.
