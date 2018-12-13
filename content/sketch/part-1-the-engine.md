---
layout: Post
title: '[Sketch.sh development] Part 1: The engine'
date: 2018-12-10 07:00:00
tags: [sketch-sh, reasonml]
---

> This post is part 1 of [Sketch.sh development series](https://khoanguyen.me/sketch)

Alright folks, in the first post, I introduced briefly about [js_of_ocaml](https://ocsigen.org/js_of_ocaml) being used for executing the code in the browser. I call this part of the code base [**Sketch engine**](https://github.com/Sketch-sh/engine). In this post, I'm going to explain in depth about it as well as building ourselves a naive version of Sketch engine.

# Overview about OCaml's REPL

Official distribution of OCaml comes with a built-in REPL (OCaml folks usually call them Toplevel). you can execute it by typing `ocaml` in your shell. Though it works, the user interface is very primitive so [utop](https://opam.ocaml.org/blog/about-utop/) was born to address the problem. utop has an excellent user interface with context aware code completion and better typing experience. I have to say that utop is the best REPL I have used.

> You might wondering what is the relation between `rtop` and `utop`? 
> 
> `rtop` is an `utop` version that supports ReasonML syntax. 
> We'll explore about it closely in this post as well.

```
$ ocaml
    OCaml version 4.02.0+dev12-2014-07-30

# 1 + 1;;
- : int = 2
```

Toplevel provides an interactive interface over the module Toploop. It works by compiling the input code into **bytecode**, executing and getting the result back.

# js_of_ocaml

[js_of_ocaml](https://ocsigen.org/js_of_ocaml) is a compiler for compiling OCaml **bytecode** to Javascript. Bytecode backend is relatively stable so maintaining js_of_ocaml for newer compiler releases doesn't require much effort.

For compiling from OCaml bytecode to Javascript with js_of_ocaml, you need to link the package `js_of_ocaml` and the ppx `js_of_ocaml-ppx` with ocamlc.

```sh
ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml-ppx \
    -linkpkg -o my_app.byte my_app.ml
```

Next you call js_of_ocaml on the output bytecode like this:

```
js_of_ocaml my_app.byte
```

And you'll a `my_app.js` file ready to be embed in your website.

# Building instructions

The code example in the post is [here]()

# First version of Sketch engine

So getting back to our Sketch engine, `Toploop` can be compiled to Javascript by default and that's great because it's the heart of our Sketch engine. In the early version of Sketch engine, I used `JsooTop` module which is an abstraction over `Toploop` module providing by `js_of_ocaml-toplevel` package.

Our first version of the engine is simple, you expose a function that take the source code and return the result:


```reason
open Js_of_ocaml;

let execute: Js.t(Js.js_string) => Js.t(Js.js_string) = code => {
  let code = Js.to_string(code);
  let buffer = Buffer.create(100);
  let formatter = Format.formatter_of_buffer(buffer);
  JsooTop.execute(true, formatter, code);
  let result = Buffer.contents(buffer)
  Js.string(result);
};
```

Because js_of_ocaml doesn't use Javascript types for representing OCaml types even basic ones like string, int,... You need to convert from `Js.t(Js.js_string)` to `string`:

```reason
let code = Js.to_string(code);
```

Next, we need a formatter for storing the evaluated result of the code:

```reason
let buffer = Buffer.create(100);
let formatter = Format.formatter_of_buffer(buffer);
```

Notice how we need to pass a buffer to the formatter? Buffers are extensible strings, you create it with an estimated initial size. Don't worry about the size that much, it will grow to fit the dataset. 

The next step would be executing the code with `JsooTop.execute` function:

```reason
JsooTop.execute(true, formatter, code);
```

Buffers are mutable so we can get the result back as a string like this:

```reason
let result = Buffer.contents(buffer)
```

Finally, convert from `string` to `Js.t(Js.js_string)` and return it. That's pretty simple right? We get ourselves a working engine in 8 lines of code. Asides from the main `execute` function, you need to have these lines as well:

```reason
JsooTop.initialize();
let () = Js.export_all(
  [%js {
    val execute = execute
  }]
);
```

The first line is for initialization of the toplevel, it does several things like polulating the toplevel environment, setting up look up paths,... but we don't need to worry about it right now.

The next line, we are telling js_of_ocaml that "Hey, we want the `execute` function to be callable in Javascript side" and `js_of_ocaml` exports it as `window.execute` if you embed the script or `const { execute } = require("./engine.jsoo.js")` if you're requiring it from Node.js.

You can build our first version of the engine with this command:

```
esy dune build one/engine.bc.js --profile release
```

The generated file is located in `_build/default/one/engine.bc.js`, let's try that in Node REPL:

```bash
❯ node
> const { execute } = require("./_build/default/one/engine.bc.js")
undefined

> execute("1 + 1;;")
'- : int = 2\n'

> execute(`print_endline "Hello world from OCaml";;`);
Hello world from OCaml
'- : unit = ()\n'

> execute(`syntax error`);
File "", line 1, characters 12-12:
Error: Syntax error
''

> execute(`let add = (+);; add 1 2;; add 3 4;;`);
'val add : int -> int -> int = <fun>\n- : int = 3\n- : int = 7\n'
```

Great! So we got ourselves a usable engine that you embed in your website or calling it from Node.js. But this naive version of this engine has some limitations:

- Errors and logs (stdout, stderr in OCaml) is printed directly to Javascript console, we want to catch them and return them as result of `execute` function for displaying in the UI.
- It executes all code at once. We want it to return the result for each individual statement (they are called phrases in OCaml term).
- It doesn't support ReasonML syntax.

# Turn `stdout` and `stderr` into return value



