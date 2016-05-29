const debug = require('debug');
debug.enable('yoview:*');

const Layout = require('./layout');
const Form = require('./form');

let app = document.querySelector('.js-main');

function init () {
  app.innerHTML = '';

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

init();

if (module.onReload) {
  module.onReload(() => {
    console.clear();
    app.innerHTML = '';
    init();
    return true;
  });
}
