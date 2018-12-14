---
layout: Post
title: '[Sketch.sh development] Part 1: Introduction'
date: 2018-12-10 07:00:00
tags: [sketch-sh]
---

This is post is part of **Sketch.sh development series**:

1. [Part 1: Introduction](/sketch/index.html)
2. [Part 2: The engine](/sketch/part-2-the-engine/)
3. Part 3: The optimization
4. Part 4: The links
5. Part 5: The packages
6. Part 6: The bridge

---

In the past few months, I have been building [Sketch.sh](https://sketch.sh) as a platform for sharing interactive ReasonML and OCaml program. It's like a Jupyter notebook with bells and whistles.

# So what makes Sketch.sh special? 

All code executions happen locally inside your browser, the server is used for storing and sharing the sketches. This is possible thanks to [js_of_ocaml](https://github.com/ocsigen/js_of_ocaml) ability to compile OCaml's Toploop/REPL to Javascript. 

# Why did I build it? 

I want to reduce the barrier for learning ReasonML as much as possible. Having a REPL right inside the browser would help trememdously with the adoption of the language. Newcomers could test the code the just read in the docs, seasoned programer could send the sketch links around and asking for help.

# What was the process for building it?

It was all started when I saw this website [http://ocsigen.org/js_of_ocaml/toplevel.html#version=4.06.0](http://ocsigen.org/js_of_ocaml/toplevel.html#version=4.06.0). It's OCaml's Toploop inside the browser. It was quite facinating that such thing is possible and I set out to build the elaquent with ReasonML syntax. 

After a very bumpy ride, I'm able to replicate that toplevel with ReasonML syntax and using ReasonReact for the UI. [It's still running here in case you want to give it a try](https://rtop.khoanguyen.me/).

I received many positive feedbacks with the product and someone asked me: 

> Hey, how about an editor? The terminal is extremely limited.

Fast forward a few months and we have [Sketch.sh](https://sketch.sh) like we do today.

# What's this post about? 

This is the first of many posts in this series where I'll talk about design decisions and the development process of Sketch.sh. I'm quite busy these days and I can't devote much time into developing Sketch.sh. I'm hoping that through this series, I can turn Sketch.sh into a truly community project. It's sad to see your product be abandoned.

# Acknowledgements

First of all, I want to thank you all contributors for helping me with the project.

- Matthias Kern ([@matthiaskern](https://github.com/matthiaskern))
- Peter Weinberg ([@no-stack-dub-sack](https://github.com/no-stack-dub-sack))
- Nimish Gupta ([@nimish-gupta](https://github.com/nimish-gupta))
- (and more...)(https://github.com/Sketch-sh/sketch-sh/graphs/contributors)

I also want to thank you Jordan Walke for being an nice mentor on building and executing my ideas, Gabriel Radanne for always answer my dumbs questions about OCaml's compiler internal, @hhugo (Js_of_ocaml's maintainer) for responding quickly and resolving the issues quickly.


# Conclusion

That's enough rants for today, stay tuned for the rest of the series.
