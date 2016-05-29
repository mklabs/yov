const debug = require('debug');
debug.enable('yoview:*');

const Layout = require('./layout');
const Textarea = require('./textarea');

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
  let json = { foo: 'bar' };
  let txt = window.txt = new Textarea({
    defaults: { json }
  });

  layout.set('content', txt.el);
  return txt;
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
