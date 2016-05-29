const debug     = require('debug');
const yo        = require('yo-yo');
const bel       = yo.createElement;
const onload    = require('on-load');
const delegate  = require('delegate');

const { EventEmitter } = require('events');

const { render, config, events, css } = require('./mixins');

export default class View extends EventEmitter {
  get data () {
    return Object.assign({}, this.props);
  }

  get defaults () {
    return {
      maoow: true
    };
  }

  get events () {
    return {
      'click a.btn': 'navigate'
    };
  }

  get namespace () {
    return `yoview:${this.options.name}`;
  }

  get name () {
    return (this.options && this.options.name) || 'foo';
  }

  constructor (options = {}) {
    super();

    // Expose tag template

    // Default options
    this.options = Object.assign({ name: 'view' }, options);

    // set logger
    this.debug = debug(this.namespace);
    // this.debug('Creating instance', options);

    // Default props
    this.props = Object.assign({}, this.defaults, options.defaults);

    // Initial element
    this.el = this.options.el || this.template(this.props);

    // Listen for dom insertion / removal
    onload(this.el, () => this.attached(), () => this.detached());

    // Init default stack of event listeners
    this.listeners = [];

    // Trigger created event
    this.created();
  }

  bindEvents () {
    var events = this.events;
    this.listeners = Object.keys(events).map((key) => {
      let parts = key.split(' ');
      let event = parts[0];
      let selector = parts.length > 1 ? parts.slice(1).join(' ') : '';
      let method = events[key];

      let handler = this[method];

      if (!handler) {
        console.warn('Event handler not found for "%s": %s', key, method);
        return { destroy: () => {} };
      }

      return delegate(this.el, selector, event, handler.bind(this), false);
    });
    return this;
  }

  unbindEvents () {
    if (!this.listeners) return;
    this.listeners.forEach((listener) => {
      listener.destroy();
    });
    return this;
  }

  navigate (e) {
    e.preventDefault();
    this.debug('navigate', arguments);
    return this;
  }

  createElement (tag = 'div', attrs = {}, children = []) {
    return bel(tag, attrs, children);
  }

  append (el) {
    if (el instanceof View) {
      // el = target.el;
      return this.el.appendChild(el.el);
    }

    this.el.appendChild(el);
    return this;
  }

  appendTo (target = document.body) {
    let el = target;
    if (target instanceof View) {
      el = target.el;
    }

    el.appendChild(this.el);
    return this;
  }

  remove () {
    let parent = this.el.parentNode;
    if (!parent) return this;
    parent.removeChild(this.el);
    return this;
  }

  empty () {
    this.el = this.createElement();
    return this;
  }

  static mixins (...mixins) {
    mixins.forEach((mixin) => {
      Object.assign(View.prototype, mixin);
    });
  }
}

View.mixins(config, css, events, render);
