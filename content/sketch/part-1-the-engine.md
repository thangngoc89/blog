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

> You might wondering what is the relation

```
$ ocaml
    OCaml version 4.02.0+dev12-2014-07-30

# 1 + 1;;
- : int = 2
```

Toplevel provides an interactive interface over the module Toploop. It works by compiling the input code into bytecode, executing and getting the result back.

# js_of_ocaml compilation

[js_of_ocaml](https://ocsigen.org/js_of_ocaml)
