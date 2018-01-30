---
layout: Post
title: "ReasonML toolchain"
route: reasonml-toolchain
date: 2018-01-30 07:00:00
tags: [reasonml, reason-react]
---

[ReasonML](https://reasonml.github.io/) advertises itself as **Syntax and toolchain for OCaml**. In this article, I'll try my best to explain what ReasonML offers to the OCaml toolchain.

# What is ReasonML?

ReasonML is a new dialect of OCaml which aims as Javascript developer. It was initiated by Facebook as a way to improve how front end developers write code by avoiding lots of bugs caused by Javascript not having a sound type system. For a more in-depth explanation and introduction to ReasonML, you can take a look as [this series by Dr. Axel Rauschmayer](http://2ality.com/2017/11/about-reasonml.html)

# What do you mean by a new dialect of OCaml?

Take a look at this diagram (credit to Dr. Axel Rauschmayer):

![](./reasonml-architechture.png)

OCaml's compiler is pretty unique, it's a set of pluggable parts that can be replaced and used together. This allows ReasonML to be a new dialect on top of OCaml toolchain, it's not a new language (unlike Flow, Typescript,.... which compiles to Javascript). The only different between ReasonML and OCaml is the syntax. All semantics are the same. `refmt` turns RE files into OCaml AST so any tools that works with OCaml would work with ReasonML syntax without modification. Some tools like dune (jbuilder) supports ReasonML out-of-the-box, which means it runs `refmt` for you under the hood.

You can reach me via Twitter([@khoanguyenme](https://twitter.com/khoanguyenme)) or **@thangngoc89** on Discord channel.
