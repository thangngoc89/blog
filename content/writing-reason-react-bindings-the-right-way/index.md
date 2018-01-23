---
layout: Post
title: 'Writing ReasonReact bindings "the right way"'

date: 2018-01-23 07:00:00
route: writing-reason-react-bindings-the-right-way
tags: [reasonml]
---

In this post, I'll show you how to write ReasonReact bindings for React.js components.

> For all of you who don't know about ReasonML: ReasonML is a syntactic sugar on top of OCaml toolchain.
>
> ReasonML/OCaml can be compiled into optimized Javascript with [Bucklescript](https://bucklescript.github.io/).
>
> You can learn more about it checkout this article by
> Dr. Axel Rauschmayer: [What is ReasonML?](http://2ality.com/2017/11/about-reasonml.html)

# The official way according to the docs

ReasonReact provides a great way to inteprop with React.js components with `ReasonReact.wrapJsForReason`. Here is [an example from the ReasonReact](https://reasonml.github.io/reason-react/docs/en/interop.html#reasonreact-using-reactjs)

```reason
/* PersonalInformation.re */
[@bs.module] external jsPersonalInformation : ReasonReact.reactClass = "./PersonalInformation.js";

let make = (~name: string, ~age: option(int)=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=jsPersonalInformation,
    ~props={
      "name": name,
      "age": Js.Nullable.from_opt(age)
    },
    children
  );
```

Now we'll use the above component like this:

```reason
<PersonalInformation name="Khoa Nguyen" age=Some(24) />
```

`PersonalInformation.js` should be called with these props:

```js
{
  name: "Khoa Nguyen";
  age: 24;
}
```

Everything is working as expected. Now let's try with a slightly different props:

```reason
<PersonalInformation name="Khoa Nguyen" age=None />
```

`PersonalInformation.js` should be called with these props:

```js
{
  name: "Khoa Nguyen";
  age: undefined;
}
```

`age` is now has `undefined` value. It's not so bad in most cases, but it could problematic.

Here is how I implemented my `PersonalInformation.js` component:

```js
// PersonalInformation.js
import React from "react";

const PersonalInformation = props => {
  let hasAge = props.hasOwnProperty("age");

  if (hasAge) {
    return (
      <p>
        My name is {props.name}. I'm {props.age} years old
      </p>
    );
  }

  return <p>My name is {props.name}</p>;
};

export default PersonalInformation;
```

I've made a CodeSandbox [here](https://codesandbox.io/s/9zqznp0mq4) for you to play with it.

With the the first example (`~age=Some(24)`), it renders **My name is Khoa Nguyen. I'm 24 years old** as expected.

But with the second example (`~age=None`), it renders **My name is Khoa Nguyen. I'm years old**.

What is going on?

Let's open node repl and try it out:

```js
❯ node
> let firstExample = {name: "Khoa Nguyen", age: 24};
undefined
> firstExample.hasOwnProperty("age")
true
> let secondExample = {name: "Khoa Nguyen", age: undefined};
undefined
> secondExample.hasOwnProperty("age")
true
> "age" in secondExample
true  
```

Ah. This totally makes sense. `age` property has value `undefined`.

Quick note:

I know that the above code is not idiomatic React code. I can reimplement the React component like this to fix it:

```js
<p>
  My name is {props.name}.
  {props.age && <span>I'm {props.age} years old</span>}
</p>
```

This should works even with `age = undefined`. But the fact that I have to change the original component to write binding isn't ideal. And the pattern I use here (`props.hasOwnPropty("age")`) is common for switching between controlled/uncontrolled mode of a component.

# "The right way" of writing ReasonReact bindings

Now we identify our problem, let's fix it.

We need to find a way for not defining `age` in props.

Lucky for us, Bucklescript provides a function named [**Special Creation Function**](https://bucklescript.github.io/docs/en/object.html#special-creation-function)

The idea is simple:

```reason
[@bs.obj] external makeProps : (~name: string, ~age: int=?, unit) => _ = "";

let props1 = makeProps(~name="Khoa Nguyen", ~age=24, ());
let props2 = makeProps(~name="Khoa Nguyen", ());
```

> Tips: You can try this on the playground at [https://reasonml.github.io/en/try.html](https://reasonml.github.io/en/try.html)

This is the compiled code from Bucklescript:

```js
var props1 = {
  name: "Khoa Nguyen",
  age: 24,
};

var props2 = {
  name: "Khoa Nguyen",
};
```

As you can see, Bucklescript create an object for us, no intermediate step. And `age` property is not in `props2`.

With this knowledge, we can rewrite our binding like this:

```reason
/* PersonalInformation.re */
[@bs.module] external jsPersonalInformation : ReasonReact.reactClass = "./PersonalInformation.js";

[@bs.obj] external makeProps : (~name: string, ~age: int=?, unit) => _ = "";

let make = (~name, ~age=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=jsPersonalInformation,
    ~props=makeProps(~name, ~age?, ()),
    children
  );
```

As you can see, I removed the type annotations in `make` and put it in `makeProps`. It's unreasonable to annotate types everywhere with a great compiler. Now, our binding works as expected.

# Transform props

The above is a simple case. We sometime need to apply some transformations to the props before passing them to React.js.
A common case must be transforming between `Js.boolean` and ReasonML's boolean.

Here is a small snippet on how you can do that:

```reason
/* PersonalInformation.re */
[@bs.module] external jsPersonalInformation : ReasonReact.reactClass = "./PersonalInformation.js";

[@bs.obj] external makeProps : (
 ~name: string,
 ~age: int=?,
 ~showAge: Js.boolean=?,
 unit
) => _ = "";

let make = (~name, ~age=?, showAge=?, children) =>
 ReasonReact.wrapJsForReason(
   ~reactClass=jsPersonalInformation,
   ~props=makeProps(
     ~name,
     ~age?,
     ~showAge=?Js.Option.map([@bs] (a => Js.Boolean.to_js_boolean(a)), showAge),
     ()
    ),
   children
 );
```

You can use this to make your code more idiomatic ReasonML by replacing string enums with polymorphic variants:

```reason
[@bs.deriving jsConverter]
type theme = [
  | `dark
  | `light
];

[@bs.obj] external makeProps : (
 ~name: string,
 ~age: int=?,
 ~theme: string=?,
 unit
) => _ = "";

let make = (~name, ~age=?, theme=?, children) =>
 ReasonReact.wrapJsForReason(
   ~reactClass=jsPersonalInformation,
   ~props=makeProps(
     ~name,
     ~age?,
     ~theme=?Js.Option.map([@bs] (a => themeToJs(a)), theme),
     ()
    ),
   children
 );
```

I think this is enough for this blog post. If you want to see more example of the pattern on writing ReasonReact binding, checkout my Ant Design binding here: [https://github.com/thangngoc89/bs-ant-design](https://github.com/thangngoc89/bs-ant-design)

This is my first time writing a blog post in English, so please let me know If I wrote anything that's incorrect.

You can reach me via Twitter([@khoanguyenme](https://twitter.com/khoanguyenme)) or **@thangngoc89** on Discord channel.
