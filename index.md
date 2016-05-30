# YoV

Reactive ViewModel component powered by
[yo-yo](https://github.com/maxogden/yo-yo), [bel](https://github.com/shama/bel)
and [csjs](https://github.com/rtsao/csjs#readme) ([CodeMirror Demo](./examples/))

`Yov` is a bit like an hybrid between `Backbone.View` and `React.Component`,
but using [ES6 tagged template
litterals](https://github.com/maxogden/yo-yo#tagged-template-literals) instead
of JSX.

- Simple and flexible ES6 tagged template engine with [bel](https://github.com/shama/bel)
- Events binding using [delegate](https://github.com/zenorocha/delegate)
- CSS style inline injection using [insert-css](https://github.com/substack/insert-css)
- Modular, scoped styles powered by [csjs](https://github.com/rtsao/csjs#features)
- Real-time [udpates](https://github.com/maxogden/yo-yo#dynamic-updates) on model changes
- Attach / detach event handlers triggered when an element has been inserted or
  removed from the DOM, thanks to [on-load](https://github.com/shama/on-load)
- Views are EventEmitters (`.on()` / `.emit()`)
- Easy view compositions

### Get started

Drop the following script tag on your page, exposing the lib as `window.Yov`:

```html
<script defer src="https://cdn.rawgit.com/mklabs/yov/gh-pages/yov-0.0.1.js"></script>
```

### Yov Views

YoV is intended to be inherited from to provide your own View class. Using ES6,
you can take advantages of tagges templates, getters, parameters destructuring, etc.

<iframe
  sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
  frameborder="0" name="JS Bin Output " src="http://jsbin.com/kuvojuy/embed?js,output"
  style="height: 550px; border: 1px solid #aaa;">
>
</iframe>

Here is a basic [example](http://jsbin.com/lidote/embed?output,js) to define a "Shell" layout.

<iframe
  sandbox="allow-modals allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts"
  frameborder="0" name="JS Bin Output " src="http://jsbin.com/lidote/embed?output,js"
  style="height: 550px; border: 1px solid #aaa;">
</iframe>

The view will update itself when `.set()` is called with model information.
It'll add or merge properties to `this.props` which is passed through templates and
views.

`this.styles` is used to inline CSS in the document `<head>` when the element
is added to the DOM.

...

---

[Work in progress](https://github.com/mklabs/yov/issues/1)


