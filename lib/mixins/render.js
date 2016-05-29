const yo  = require('yo-yo');
const bel = require('bel');

module.exports = {
  hx: bel,

  sanitize: require('sanitize-html'),

  template ({ name, title }) {
    return this.hx`<div></div>`;
  },

  update () {
    let el = this.template(this.props);
    yo.update(this.el, el);
    return this;
  }
};
