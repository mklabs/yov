const debug = require('debug');
debug.enable('yoview:*');
const Layout = require('./layout');
const Textarea = require('./textarea');

let app = document.querySelector('.js-main');

let layout = new Layout({
  name: 'layout',

  defaults: {
    content: 'foo'
  }
});

layout.appendTo(app);
layout.set('content', 'Maoow');

let txt = new Textarea();
txt.appendTo(layout);
