const debug = require('debug')('tilt:config');

const config =  {
  set (name, value) {
    if (!value) {
      value = name;
      name = null;
    }

    let attrs = Object.assign({}, this.attrs);
    let previous, current;

    if (typeof name === 'string') {
      debug('set', name, value);
      previous = attrs[name];
      current = value;
      this.attrs[name] = value;
    } else {
      debug('merge', value);
      previous = attrs;
      this.attrs = Object.assign({}, attrs, value);
      current = this.attrs;
    }

    this.attributeChanged(name, previous, current);
    return this;
  },

  get (name) {
    let data = Object.assign({}, this.attrs);
    return name ? data[name] : data;
  }
};

module.exports = config;
