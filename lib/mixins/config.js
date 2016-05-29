const config =  {
  set (name, value) {
    if (!value) {
      value = name;
      name = null;
    }

    let props = Object.assign({}, this.props);
    let previous, current;

    if (typeof name === 'string') {
      // this.debug('set', name, value, typeof value, value.length);
      previous = props[name];
      current = value;
      this.props[name] = value;
    } else {
      // this.debug('merge', value);
      previous = props;
      this.props = Object.assign({}, props, value);
      current = this.props;
    }

    this.attributeChanged(name, previous, current);
    return this;
  },

  get (name) {
    let data = Object.assign({}, this.props);
    return name ? data[name] : data;
  }
};

module.exports = config;
