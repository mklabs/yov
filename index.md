# YoV

Reactive ViewModel component powered by
[yo-yo](https://github.com/maxogden/yo-yo), [bel](https://github.com/shama/bel)
and [csjs](https://github.com/rtsao/csjs#readme)

```html
<script defer src="https://cdn.rawgit.com/mklabs/yov/gh-pages/yov-0.0.1.js"></script>
```

`Yov` is a bit like an hybrid between `Backbone.View` and `React.Component`,
but using [ES6 tagged template
litterals](https://github.com/maxogden/yo-yo#tagged-template-literals) instead
of JSX.

- Simple and flexible ES6 tagged template engine with [bel](https://github.com/shama/bel)
- Events binding using [delegate](https://github.com/zenorocha/delegate)
- CSS style inline injection using [insert-css](https://github.com/substack/insert-css)
- Modular, scoped styles with powered by [csjs](https://github.com/rtsao/csjs#features)
- Real-time [udpates](https://github.com/maxogden/yo-yo#dynamic-updates) on model changes
- Attach / detach event handlers triggered when an element has been inserted or
  removed from the DOM, thanks to [on-load](https://github.com/shama/on-load)
- Views are EventEmitters (`.on()` / `.emit()`)
- Easy view compositions

```js
var view = new Yov({
  name: 'Layout',

  templates() {
    return this.hx`
		<main>
			<h1>${title}</h2>
			Hello ${name}
		</main>`;
  },

  defaults: {
    title: 'Yov!',
    name: 'John Doe'
  }
});

view.set('name', 'Jane Doe');

view.set({
  title: 'Woot!'
});

view.on('attached', function() {
  console.log('Added to the DOM');
});

view.appendTo(document.body);
```

---

[CodeMirror Demo](./examples/)

---

### Yov Views

YoV is intended to be inherited from to provide your own View class. Using ES6,
you can take advantages of tagges templates, getters, parameters destructuring, etc.

Here is a basic example to define a "Shell" layout to hold your application views.

```js
const View = require('yov');

// Define a View "shell"
class Shell extends View {

	// Define styles to inline on creation or attachment
	get styles() {
		return `
		.app {
			padding: 50px;
		}`;
	}

	// Define a template method using ES6 tagged template string with this.hx
	// factory (bel)
	template({ title, content }) {
		return this.hx`
		<main class="app js-main">
			<h1>${title}</h2>

			${content}
		</main>
		`;
	}
}


// Init
let layout = new Shell({ name: 'layout' });
layout.appendTo(document.body);

layout.set('title', 'Yov!')
```

The view will update itself when `.set()` is called with model information.
It'll add or merge properties to `this.props` which passed through templates and
views.

`this.styles` is used to inline CSS in the document `<head>` when the element
is added to the DOM.

...

---

[Work in progress](https://github.com/mklabs/yov/issues/1)


