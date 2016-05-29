const csjs      = require('csjs');
const insertcss = require('insert-css');

module.exports = {

  csjs: csjs,

  // Style
  get style () {
    return csjs`
    .foo {
      font-size: 45px;
      color: red;
    }
    `;
  },

  get css () {
    return csjs.getCss(this.style);
  },

  get className () {
    let options = this.options || {};
    let { name, className } = options;
    return className || 'yov-' + name || '';
  },

  get classnames () {
    let styles = this.style[this.className];
    return styles ? styles.toString() : this.className;
  },

  injectCSS () {
    let css = this.css;
    this.debug('Added css to head: %s', this.name);
    insertcss(css);
  }
};
