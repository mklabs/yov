const View = require('..');

const cm = require('codemirror');
const cmcss = require('../codemirror.css');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

export default class CodeMirrorView extends View {
  get style () {
    return `
    .yov-codemirror {
      height: 100%;
    }

    .yov-codemirror .CodeMirror {
      height: 100%;
      padding-top: 25px;
      padding-left: 45px;
    }

    ${cmcss}`;
  }

  get name () {
    return 'codemirror';
  }

  constructor () {
    super();

    let className = 'yov-codemirror';

    this.textarea = this.createElement('textarea', { autocomplete: 'off' });
    this.el = this.createElement('div', { className }, [this.textarea]);

    this.codemirror = cm.fromTextArea(this.textarea, this.props.options);
    this.codemirror.on('change', this.changed.bind(this));
    this.codemirror.on('focus', this.focused.bind(this));
    this.codemirror.on('blur', this.blured.bind(this));
    this.codemirror.on('scroll', this.scrolled.bind(this));
    this.codemirror.setValue(this.props.defaultValue || this.props.value || '');

    this.injectCSS(this.style);
  }

  val (value) {
    if (!value) return this.codemirror.getValue();
    value = typeof value !== 'string' ? JSON.stringify(value, null, 2) : value;
    this.codemirror.setValue(value);
    return this;
  }

  changed () {
    this.debug('Codemirror editor changed');
    this.emit('change:editor', this.val());
  }

  blured () {
    this.debug('Codemirror blur');
  }

  focused () {}
  scrolled () {}
}

