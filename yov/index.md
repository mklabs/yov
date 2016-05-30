# YoV

Run local dev server

    git clone https://github.com/mklabs/yov.git && cd yov
    npm install
    npm start

It will run the following commands:

    watchify docs/app.js -p [livereactload] -o docs/bundle.js &
    list .

- [watchify](https://github.com/substack/watchify)
- [micro-list](https://github.com/zeit/micro-list#readme)
- [livereactload](https://github.com/milankinen/livereactload)

`watchify` will compile docs/app.js entry point to docs/bundle.js and
incrementally update the bundle on file changes. `livereactload` plugin
implements hot reloading for browserify.

Open `http://localhost:3000/docs/` to load the demo application.

---

[Demo](./examples/)

---

### View

```js
const View = require('yov');

// Define a View "shell"
class Shell extends View {

	// Define styles to inline on creation or attachment
	get styles() {
		return `
		.app {
			padding: 50px;
		}
		`;
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

Once added to the DOM, the view will update when `.set()` is called with model
information. It'll add or merge properties to `this.props` and passed through
templates and views..

