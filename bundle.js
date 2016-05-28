const View = require('./view');

let view = window.view = new View({
  attrs: {
    'data-app': true
  },

  defaults: {
    title: 'Title!!!',
    name: 'Bob'
  }
});

view.set('name', 'Bob');
view.set({
  yoyo: 'is cool'
});

view.appendTo(document.body);
