const debug    = require('debug');
const config   = require('./config');
const yo       = require('yo-yo');
const bel      = yo.createElement;
const onload   = require('on-load');
const delegate = require('delegate');

const { EventEmitter } = require('events');
export default class View extends EventEmitter {

  // Style
  get style () {
    return `
    .foo {
      font-size: 45px;
      color: red;
    }
    `;
  }

  // Template
  get template () {
    let attrs = this.data;
    let { name, title } = attrs;

    return yo`
    <div class="meow">
      <h1>${title}</h1>
      <h2>${this.get('name')}</h2>

      <a href="foo" class="btn">Hello ${this.get('name')}!</a>
      <p>Hello ${this.data.name}!</p>
      <p>Hello ${name}!</p>
    </div>
`;
  }

  get data () {
    return Object.assign({}, this.attrs);
  }

  get defaults () {
    return {
      maoow: true
    };
  }

  get events () {
    return {
      'click a.btn': 'navigate',
      'dbclick': 'alert'
    };
  }

  get namespace () {
    let name = this.options.name;
    return `yoview${name ? ':' + name : ''}`;
  }

  constructor (options = {}) {
    super();

    this.options = options;
    this.debug = debug(this.namespace);
    this.yo = yo;

    this.debug('Creating instance', options, this.namespace);
    this.attrs = Object.assign({}, this.defaults, options.defaults);
    this.el = this.options.el || this.createElement('div', {
      className: 'container'
    });

    onload(this.el, () => {
      this.attached();
    }, () => {
      this.detached();
    });

    this.created();
  }

  render () {
    this.update();
    return this;
  }

  bindEvents () {
    var events = this.events;
    this.debug('binding events', events);
    this.listeners = Object.keys(events).map((key) => {
      let parts = key.split(' ');
      let event = parts[0];
      let selector = parts.length > 1 ? parts.slice(1).join(' ') : '';
      let method = events[key];

      let handler = this[method];

      if (!handler) {
        return console.warn('Event handler not found for "%s": %s', key, method);
      }

      return delegate(this.el, selector, event, handler.bind(this), false);
    });
  }

  unbindEvents () {
    if (!this.listeners) return;

    this.listeners.forEach((listener) => {
      listener.destroy();
    });
  }

  navigate (e) {
    e.preventDefault();
    this.debug('navigate', arguments);
  }

  alert (e) {
    this.debug('alert!', arguments);
  }

  createElement (el, attrs = {}) {
    return bel('div', attrs);
  }

  update () {
    this.debug('Udpate view', this.el);
    yo.update(this.el, this.template);
    return this;
  }

  appendTo (target = document.body) {
    console.log(target, this.el);
    this.update();
    console.log(target, this.el);
    target.appendChild(this.el);
    return this;
  }

  remove () {
    let parent = this.el.parentNode;
    if (!parent) return this;
    parent.removeChild(this.el);
    return this;
  }

  // Lifecycle callbacks
  //
  // createdCallback          - The behavior you define occurs when the element is registered.
  // attachedCallback         - The behavior occurs when the element is inserted into the DOM.
  // detachedCallback         - The behavior occurs when the element is removed from the DOM.
  // attributeChangedCallback - The behavior occurs when an attribute of the element is added, changed, or removed
  created () { this.debug('created', this); }

  attached () {
    this.debug('attached', this.el);
    this.bindEvents();
  }

  detached () {
    this.debug('detached', this);
    this.unbindEvents();
  }

  // created () {}
  // attached () {}
  // detached () {}

  attributeChanged (name, prev, current) {
    this.debug('attributeChanged', name);
    this.update();
  }
}

Object.assign(View.prototype, config);
