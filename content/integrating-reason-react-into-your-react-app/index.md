---
layout: Post
title: "Integrating ReasonReact into your React app"
route: integrating-reason-react-into-your-react-app
date: 2018-12-09 07:00:00
tags: [reasonml, reason-react]
---

I recently gave a talk at a local meetup about integrating ReasonReact into your React app. While researching for the talk, I find out that the resources for doing this is very limited so here we go.

> Please note that while this article shows you how to integrate ReasonReact into your existing React app, this works perfectly if you want to create new ReasonReact app with all bells and whistles.

> Also, this works for Parcel, your custom Webpack configuration or whatever build system you're using, as long as it knows how to package ES6 or commonjs module format.

# TL;DR

Here is final code, you can clone and start coding right away:

```
git clone https://github.com/thangngoc89/reason-react-starter my-app
cd my-app
npm install
```

Run `npm run start` and `npm run bsb:watch` in another tab

# Installations

Let's assume that you are using `create-react-app` version 2 for building your app because it's extremely hard to correctly config webpack, babel, jest, eslint and makes them work well together. 

So here is the installation instructions of `create-react-app`:

```
npx create-react-app my-app
cd my-app
```

For adding ReasonReact you would run this command:

```
npm install --save-dev bs-platform
npm install reason-react
```

> Although the official guide recommend that you install bs-platform globally, I strongly disagree with that. Global installations are bad and it could lead to many weird behaviors.

Next, you would make a file called `bsconfig.json` in the root of your project with this content:

```js
{
  "name": "my-app",
  "reason": {
    "react-jsx": 2
  },
  "sources": [
    {
      "dir": "src",
      "subdirs": true
    }
  ],
  "package-specs": [
    {
      "module": "es6",
      "in-source": true
    }
  ],
  "suffix": ".bs.js",
  "namespace": true,
  "bs-dependencies": [
    "reason-react",
  ],
  "refmt": 3,
}
```

Explaining the fields:

- `name` this should be matched with your `package.json` `name` field
- `react-jsx` this tells Bucklescript to use ReactJSX PPX version 2. I would suggest that you leave this as is.
- `sources`: this tells Bucklescript where to look for the `*.re` files. You need to list all the directories that contains your source code here.
- `package-specs`: 
  + `module`: could be `es6` or `commonjs`. `create-react-app` uses ES6 by default.
  + `in-source`: with this option turned on, Bucklescript will output a file right next to your `.re` file. This helps tremendously with require paths.
- `suffix`: could be `.bs.js` or `.js`. This is the suffix of the generated files. 

For more information about `bsconfig.json`, you can refer to its JSON API 

[https://bucklescript.github.io/bucklescript/docson/#https://bucklescript.github.io/bucklescript/docson/build-schema.json](https://bucklescript.github.io/bucklescript/docson/#https://bucklescript.github.io/bucklescript/docson/build-schema.json)

So our plan is that Bucklescript output `.js` files and your current build system would pick it up and do its job. 

You should add these command to the `scripts` section in `package.json`:

```
"scripts: {
  ...
  "bsb": "bsb -make-world",
  "bsb:watch": "bsb -make-world -w",
  "bsb:clean": "bsb -clean-world"
}
```

Now you can run `npm run bsb:watch` and `npm start` in another tab and making your awesome app with ReasonReact.

> You can use [Overmind](https://evilmartians.com/chronicles/introducing-overmind-and-hivemind) for keeping all the command in a single terminal tab. Or [tmux](https://github.com/tmux/tmux) for easily managing multiple terminal tabs.

# Usages

So this is the content inside `src` directory right now:

```
src
├── App.css
├── App.js
├── App.test.js
├── index.css
├── index.js
├── logo.svg
└── serviceWorker.js
```

Let's go ahead and create a new file called `Greetings.re`:

```reason
let component = ReasonReact.statelessComponent("Greetings");

let make = (~message, _children) => {
  ...component,
  render: _self => {
    <p> {ReasonReact.string("Message from ReasonReact " ++ message)} </p>;
  },
};
```

With `bsb` watcher running in the background, you'll see that a new file called `Greetings.bs.js` was created inside `src` folder. This is what the `in-source` option in `bsconfig.json` does. 

If you want to use `Greetings` inside the rest of your React app, you have to export it first with [`wrapReasonForJs`](https://reasonml.github.io/reason-react/docs/en/interop#reactjs-using-reasonreact) because ReasonReact and React components aren't compatible:

```reason
let component = ReasonReact.statelessComponent("Greetings");

let make = (~message, _children) => {
  ...component,
  render: _self => {
    <p> {ReasonReact.string("Message from ReasonReact " ++ message)} </p>;
  },
};

[@bs.deriving abstract]
type jsProps = {
  message: string,
  children: array(ReasonReact.reactElement),
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(~message=jsProps->messageGet, jsProps->childrenGet)
  );
```

> Tips: You can automatically generate `wrapReasonForJs` with a tool called [genType](https://github.com/cristianoc/genType)

Now, you can use Greetings inside `App.js`:

```js
import React, { Component } from "react";
import logo from "./logo.svg";
import Greetings from "./Greetings.bs";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Greetings message="Hello World" />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
```

That's it guys. Happy coding!
