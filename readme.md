# YoV

> Reactive views built on [yo-yo](https://github.com/maxogden/yo-yo) /
> [bel](https://github.com/shama/bel)

Little codemirror demo: [yov](http://mkla.bz/yov/)

> wip

## Dev

Run local dev server

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
