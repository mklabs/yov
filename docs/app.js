const Layout = require('./layout');
const Form   = require('./form');
const debug  = require('debug');
const log    = debug('yov');
const marked = require('marked');

const Shell = require('./shell');

let routes = {};
routes.index = '/';
routes.example = /^examples\//;

// todo: abstract in an App controller / router
init();

function init () {
  let app = window.app = document.querySelector('.js-main');
  let pathname = location.pathname;
  log('Init pages >> %s', pathname, app);

	// clean up baseURL before routing
  pathname = pathname.replace(/^\/yov\//, '');

  let match = Object.keys(routes).find((name) => {
    let regex = routes[name];
    if (typeof regex === 'string') return regex === pathname;
    return regex.test(pathname.slice(1));
  });

  if (!match) return debug('Not Found!');
  if (match === 'index') return index();
  else if (match === 'example') return example();
}

function index () {
  let app = document.querySelector('.js-main');
  let layout = window.layout = new Shell({ name: 'layout' });
  layout.appendTo(app);

  return fetch('./index.md')
    .then((res) => res.text())
    .then((markdown) => marked(markdown))
    .then((html) => {
      layout.set({
        title: 'YoV',
        body: html,
        subheading: layout.createElement('span', {}, ['#readme'])
      });
    });
}

function example () {
  let app = document.querySelector('.js-main');

  let layout = window.layout = new Layout({
    name: 'layout',

    defaults: {
      content: 'foobar'
    }
  });

  // Add content when attached to the dom
  layout.on('attached', () => textarea(layout));

  // Register to the detached event, triggered on removal
  layout.on('detached', () => {
    layout.debug('Layout detached from dom', this);
  });

  // Add to dom
  layout.appendTo(app);
}

function textarea (layout) {
  let form = window.form = new Form();
  layout.set('content', form.el);
  form.set('json', form.data);
  form.on('change:editor', update.bind(null, layout, form));
}

function update (view, form, json) {
  let data = {};
  try {
    data = JSON.parse(json);
  } catch (e) {
    view.debug('Invalid JSON: %s', e.message);
    view.debug(e.stack);
  }

  // todo: fix that
  // quick hack to update the nested el, have to deal with it in the View component.
  view.demo.el = document.querySelector('.js-demo');
  view.demo.set(data);
}

if (module.onReload) {
  module.onReload(() => {
    console.clear();
    window.app.innerHTML = '';
    init();
    return false;
  });
}
