const View = require('..');

const cm = require('codemirror');
const cmcss = require('./codemirror.css');

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

class CodeMirrorView extends View {
  get style () {
    return this.csjs(cmcss);
  }

  constructor () {
    super();

    this.textarea = this.createElement('textarea', { autocomplete: 'off' });
    this.el = this.createElement('div', {}, [this.textarea]);

    this.codemirror = cm.fromTextArea(this.textarea, this.props.options);
    this.codemirror.on('change', this.changed.bind(this));
    this.codemirror.on('focus', this.focused.bind(this));
    this.codemirror.on('blur', this.blured.bind(this));
    this.codemirror.on('scroll', this.scrolled.bind(this));
    this.codemirror.setValue(this.props.defaultValue || this.props.value || '');

    this.on('attached', () => {
      this.debug('was attached');
    });
  }

  changed () {}
  focused () {}
  scrolled () {}
  blured () {}
}

export default class Textarea extends View {
  get defaults () {
    return { json: '{}' };
  }

  get style () {
    let ns = this.className;
    let color = this.options.color || 'pink';
    // style=" height: 600px; padding-top: ${padding}px; font-size: 12px; font-family: 12px Consolas, 'Liberation Mono', Menlo, Courier, monospace;"
    return this.csjs`
    .${ns} {
      width: 100%;
      color: ${color};
    }
    `;
  }

  constructor () {
    super();
    this.codemirror = new CodeMirrorView();
  }

  json (json) {
    json = typeof json === 'string' ? json : JSON.stringify(json);
    return `${json}`;
  }

  textarea ({ json, padding, foobar }) {
    if (!this.codemirror) return '';
    return this.codemirror.el;
    // return this.hx`<textarea name="description" value="This is a description.">${json}</textarea>`;
    // return this.hx`<pre><code>${this.json(json)}</code></pre>`;
  }

  template ({ json, padding, title, foobar }) {
    return this.hx`<form action="#" class="${this.classnames}">
      <div class="mdl-textfield mdl-js-textfield" style="width: 100%; padding-left: ${padding}px;">
        <label>${title}</label>
        ${this.textarea(this.props)}
      </div>
    </form>`;
  }
}
