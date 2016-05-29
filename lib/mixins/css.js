const csjs      = require('csjs');
const insertcss = require('insert-css');

module.exports = {

  csjs: csjs,

  // Style
  get style () {
    return csjs``;
  },

  get className () {
    let options = this.options || {};
    let { name, className } = options;
    return className || 'yov-' + name || '';
  },

  injectCSS (css) {
    css = css || this.css();
    this.debug('Added css to head: %s', this.name);
    insertcss(css);
  },

  css () {
    return csjs.getCss(this.style);
  },

  classnames (style = this.style) {
    let name = this.className;
    let styles = style[name] || style;
    let classnames = styles ? styles.toString() : '';
    return classnames;
  }
};
