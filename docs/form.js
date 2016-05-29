const View = require('.');

const CodeMirrorView = require('./codemirror');

export default class Form extends View {
  get defaults () {
    return {
      name: 'YoV',
      unread: 2,
      total: 15
    };
  }

  get className () {
    return 'yov-form';
  }

  get style () {
    let ns = this.className;
    return this.csjs`
    .${ns} .textfield {
      width: 100%;
      height: 800px;
    }

    .${ns} .title {
      text-align: center;
    }
    `;
  }

  constructor () {
    super();
    this.codemirror = new CodeMirrorView();

    this.on('change', (name, prev, current) => {
      if (name !== 'json') return;
      this.codemirror.val(current);
    });

    let evt = 'change:editor';
    this.codemirror.on(evt, this.emit.bind(this, evt));
  }

  json (json) {
    json = typeof json === 'string' ? json : JSON.stringify(json);
    return `${json}`;
  }

  textarea ({ json, padding, foobar }) {
    if (!this.codemirror) return '';
    return this.codemirror.el;
  }

  template ({ json, padding, title, foobar }) {
    let styles = this.style;
    let textfield = styles.textfield;
    let titleClass = styles.title;

    return this.hx`<form action="#" class="${this.classnames()}">
      <div class="${textfield.classNames} mdl-textfield mdl-js-textfield">
        <h3 class="${titleClass}"">${title}</h3>

        ${this.textarea(this.props)}
      </div>
    </form>`;
  }
}
