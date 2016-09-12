---
layout: Post
title: "Tổng quan ES6 qua 350 điểm"
date: 2016-02-21 20:20:00
tags: [js]
draft: true
translate:
  url: "https://ponyfoo.com/articles/es6"
  author: "Pony Foo"
---

# Giới thiệu

- ES6, còn được biết với tên Harmony, `es-next`, ES2015 là bản mô tả mới nhất của Javascript
- Bản mô tả ES6 hoàn thành vào tháng 6 năm 2015 (vì vậy mới gọi là ES2015)
- Các bản mô tả tiếp theo của Javascript sẽ được đặt tên theo dạng ES[YYYY], ví dụ ES2016 cho ES7

  - Sẽ cập nhật mỗi năm, tính năng nào không hoàn thành sẽ bị hoãn lại tới năm tiếp theo
  - Vì ES6 được bắt đầu trước khi cách gọi mới này ra đời nên chúng ta vẫn thường gọi là ES6
  - Bắt đầu từ ES2016 (ES7), chúng ta nên bắt đầu dùng dạng ES[YYYY] để gọi tên phiên bản Javascript.
  - Lý do quan trọng nhất khi đặt tên như vậy là để gây áp lực, và buộc các trình duyệt phải thêm tính năng mới vào nhanh hơn.

# Công cụ

- Để làm việc với ES6 ngay từ bây giờ, bạn cần transpiler **Javascript-to-Javascript**
- Transpiler có chức năng

  - Biên dịch code của bạn từ phiên bản mới nhất (của Javascript) về phiên bản cũ hơn
  - Khi mà trình duyệt đã tương thích với phiên bản mới, chúng ta sẽ biên dịch từ ES2016 và ES2017 về ES6, ... và tiếp tục như vậy.
  - Hỗ trợ source map
  - Bạn có thể tự tin viết code ES6 và dùng trong thực tế ngay từ bây giờ (tuy nhiên, trình duyệt sẽ nhận được code ES5)

- Babel (một transpiler) có một tính năng mà không có đối thủ nào cạnh tranh được: xuất ra code mà bạn **có thể đọc được**

  - Dùng `babel` để biên dịch ES6 xuống ES5
  - Dùng `babelify` kết hợp với `babel` cùng với Gulp, Grunt, hoặc npm run trong khi build.
  - Dùng Node.js v4.x.x sẽ có native support cho ES6 (:+1: cho V8)
  - Dùng `babel-node` với bất kì phiên bản node nào, sẽ biên dịch module xuống ES5
  - Babel có một kho plugins và hệ sinh thái phong phú.

# Destructuring

- `var {foo} = pony` tương đượng với `var foo = pony.foo`
- `var {foo: baz} = pony` tương đương với `var baz = pony.foo`
- Bạn có thể cung cấp giá trị mặc định , `var {foo='bar'} = baz` cho ra `foo: 'bar'` nếu `baz.foo === undefined`
- Bạn có thể lấy bao nhiêu giá trị tùy thích `var {foo, bar: baz} = {foo: 0, bar: 1}` cho ra `foo: 0` và `baz: 1`
- Bạn có thể lấy giá trị lồng vào nhau. `var {foo: {bar}} = { foo: { bar: 'baz' } }` cho ra  `bar: 'baz'`
- Bạn cũng có thể đặt tên cho nó. `var {foo: {bar: deep}} = { foo: { bar: 'baz' } }` cho ra `deep: 'baz'`
- Thuộc tính không tình thấy sẽ cho ra `undefined` như bình thường. Ví dụ `var {foo} = {}`
- Giá trị lồng vào nhau không tồn tại sẽ cho ra lỗi, ví dụ: `var {foo: {bar}} = {}`
- Mảng cũng tương tự, `[a, b] = [0, 1]` cho ra `a: 0` và `b: 1`
- Bạn có thể bỏ qua các giá trị trong mảng, `[a, , b] = [0, 1, 2]`, cho ra `a: 0` và `b: 2`
- Bạn có thể thay đổi vị trí mà không cần biết trung gian `[a, b] = [b, a]`
- Bạn cũng có thể destruct các tham số của hàm

  - Gán giá trị mặc định cho hàm `function foo (bar=2) {}`
  - Giá trị mặc định cũng có thể là object `function foo (bar={ a: 1, b: 2 }) {}`
  - Chúng ta có thể destruct biến `bar` ở trên hoàn toàn thế này `function foo ({ a=1, b=2 }) {}`
  - Hoặc có thể đặt giá trị mặt định là một object rỗng nếu như không có bất kì tham số nào `function foo ({ a=1, b=2 } = {}) {}`

# Spread Operator and Rest Parameters

- Rest Parameters (tạm dịch là các tham số còn lại) sẽ `arguments` tốt hơn

  - Bạn có thể định nghĩa nó trong hàm thế này `function foo (...everything) {}`
  - `everything` là một mảng gồm tất cả tham số được gửi đến hàm `foo`
  - Bạn có thể đặt tên cho vài tham số trước `...everything` thế này `function foo (bar, ...rest) {}`
  - Các tham số đã được đặt tên sẽ được loại ra khỏi `...rest`
  - `...rest` phải là tham số cuối cùng trong danh sách
- Spread operator giống như là ma thuật, nó cũng có cú pháp `...`

  - Không cần dùng `.apply` khi gọi method, `fn(...[1, 2, 3])` tương đương với `fn(1, 2, 3)`
  - Dễ gộp mạng hơn `[1, 2, ...[3, 4, 5], 6, 7]`
  - Chuyển đổi các biến dạng mảng hoặc `iterable` thành mảng, ví dụ: `[...document.querySelectorAll('img')]`
  - Có thể dùng khi destruct, `[a, , ...rest] = [1, 2, 3, 4, 5]` cho ra `a: 1` và `rest: [3, 4, 5]`
  - Cần thiết khi dùng `new Date` thế này `new Date(...[2015, 31, 8])`

# Arrow function

- Tạo hàm nhanh chóng thế này `param => returnValue`
- Hữu ích khi lập trình hàm (funtional programing) `[1, 2].map(x => x * 2)`
- Có nhiều cách để dùng, có thể làm bạn rối lúc đầu

  - `p1 => expr` khi chỉ có một tham số
  - `p1 => expr` có nghĩa là hàm sẽ trả về kết quả `expr`
  - Để trả về một object, đặt nó trong một cặp ngoặc `() => ({ foo: 'bar' })` nếu không sẽ bị lỗi cú pháp
  - Cặp ngoặc có thể dùng khi bạn có không, một, hai hoặc nhiều tham số hơn `() => expr or (p1, p2) => expr`
  - Cặp ngoặc bên phải có nghĩa là khối code có thể có nhiều dòng `() => {}`
  - Khi bạn dùng khối code, sẽ không có `return` tự động, bạn phải thêm vào như mọi khi `() => { return 'foo' }`
- You can’t name arrow functions statically, but runtimes are now much better at inferring names for most methods.
- Scope trong arrow function chính là scope của chính arrow function

  - `this` trong arrow function sẽ giống với `this` ở parent scope.
  - `this` không thể thay đổi bằng `.call`, `.apply`, hoặc là các phương thức tương tự.

> Xem thêm: [http://kipalog.com/posts/ECMA-Script-6-fat-arrow-function]

# Template Literals

- Bạn có thể định nghĩa chuỗi với dấu `` ` `` (backtick), thay vì kiểu cũ là `"` và `'`
- Chuỗi mà bao trong dấu backtick gọi là template literals
- Template literals có thể gồm nhiều dòng
- Template literals cho phép bạn đặt biến vào thế này `khoanguyen.me is ${rating}` (với `rating` là một biến)
- Bạn có thể đặt vào bất cứ thứ gì hợp lệ với Javascript trong cặp ngoặc như `${2 * 3}` hoặc `${foo()}`
- Bạn có thể thay đổi kết quả kết template literals

  - Thêm vào trước `fn` thế này ``fn`foo, ${bar} and ${baz}```
  - `fn` sẽ được gọi với tham số  `template, ...expressions`
  - `template` là `['foo, ', ' and ', '']` và `expressions` là `[bar, baz]`
  - Kết quả trả về của `fn` sẽ trở thành giá trị của template literal.
- Tổng kết lại thì định nghĩa chuỗi với template literals tốt hơn so với việc dùng cặp nháy đơn hay nháy kép

# Object Literals

- Thay vì phải viết `{ foo: foo }`, bây giờ bạn chỉ cần viết  `{ foo }` – đây được gọi *property value shorthand* (tạm dịch: định nhanh giá trị của thuộc tính)
- Tính toán tên thuộc tính (*Computed property names*), `{ [prefix + 'Foo']: 'bar' }`, khi `prefix: 'moz'`, sẽ cho ra kết quả `{ mozFoo: 'bar' }`
- Bạn không thể kết hợp computed property names và property value shorthands, `{ [foo] }` là không hợp lệ
- Bạn có thể định method cho object literal bằng cú pháp nhanh này: `{ foo () {} }`

# Class

- Không phải là class như OOP, chỉ là một cú pháp gọn hơn dựa trên prototype
- Cú pháp giống như định object `class Foo {}`
- Instance methods – `new Foo().bar` – được định nghĩa nhờ cú pháp *object literal* như trên `class Foo { bar () {} }`
- Static methods – `Foo.isPonyFoo()` – cần thêm `static` vào trước, `class Foo { static isPonyFoo () {} }`
- Constructor  `class Foo { constructor () { /* initialize instance */ } }`
- Thừa kế nhờ cấu trúc thế này `class PonyFoo extends Foo {}`

# Let và Const

- `let` và `const` là hai cách khác ngoài `var` để khởi tạo biến.
- `let` là `block-scoped` thay vì `lexically scoped` như hàm.
- `let` gắn với `block` hiện tại, trong khi `var` gắn với `block` của hàm
- “Temporal Dead Zone” (gọi tắt TDZ)

  - Bắt đầu ở `block` mà `let foo` được khởi tạo
  - Kết thúc khi thực hiện câu lệnh khởi tạo `let foo`
  - Cố gắng truy cập hoặc gán biến trong vùng TDZ (tức là trước câu lên `let foo`) sẽ gây ra lỗi
  - Giúp tránh các lỗi đau đầu khi biến bị thay đổi trước khi nó được khởi tạo (có thể hiểu như là `"use strict"`)
- `const` cũng là `block-scoped` gắn và ràng buộc bởi TDZ
- Khi dùng `const`, biến cần phải gắn giá trị ngay khi khởi tạo `const foo = 'bar'`
- Gán giá trị cho `const` sau khi khởi tạo sẽ gây lỗi một ách im lặng hay `throw` trong `"use strict"`.
- Giá trị của biến `const` không phải là hằng định (immutable)

  - `const foo = { bar: 'baz' }; foo.bar = 'boo'` sẽ không `throw` lỗi
- Khởi tạo biến cùng tên sẽ `throw` lỗi
- Định tạo ra để khắc phục vấn đề ghi đè biến.

# Symbol

- Một kiểu dữ liệu mới của ES6
- Bạn có thể khởi tạo symbol thế này `var symbol = Symbol()`
- Bạn có thể thêm chú thích để dễ debug `Symbol('ponyfoo')`
- Symbol là hằng định và độc nhất. `Symbol(), Symbol(), Symbol('foo') và Symbol('foo')` cả 4 giá trị trên khác nhau hoàn toàn.
- `typeof Symbol() === 'symbol'`
- You can also create global symbols with Symbol.for(key)
If a symbol with the provided key already existed, you get that one back
Otherwise, a new symbol is created, using key as its description as well
Symbol.keyFor(symbol) is the inverse function, taking a symbol and returning its key
Global symbols are as global as it gets, or cross-realm. Single registry used to look up these symbols across the runtime
`window context`
`eval context`
`<iframe> context, Symbol.for('foo') === iframe.contentWindow.Symbol.for('foo')`
There’s also “well-known” symbols
Not on the global registry, accessible through Symbol[name], e.g: Symbol.iterator
Cross-realm, meaning Symbol.iterator === iframe.contentWindow.Symbol.iterator
Used by specification to define protocols, such as the iterable protocol over Symbol.iterator
They’re not actually well-known – in colloquial terms
Iterating over symbol properties is hard, but not impossible and definitely not private
Symbols are hidden to all pre-ES6 “reflection” methods
Symbols are accessible through Object.getOwnPropertySymbols
You won’t stumble upon them but you will find them if actively looking
