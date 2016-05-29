const View = require('.');

const Demo = require('./demo');

export default class Layout extends View {

  get style () {
    return `
    .mdl-layout .mdl-layout__header-row {
      padding-left: 20px;
    }`;
  }

  constructor () {
    super();

    this.demo = new Demo();
    this.injectCSS(this.style);
  }

  demoEl (props) {
    this.demo = this.demo || new Demo();
    return this.demo.template(props);
  }

  template (props) {
    let { content } = props;
    content = content || '';

    return this.hx`
    <div class="mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
      <header class="mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">YoV - Tiny ViewModel component for yo-yo</span>
          <div class="mdl-layout-spacer"></div>
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
            <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
              <input class="mdl-textfield__input" type="text" id="search">
              <label class="mdl-textfield__label" for="search">Enter your query...</label>
            </div>
          </div>
        </div>
      </header>
      <main class="mdl-layout__content">
        <div class="mdl-grid">
          <div class="mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--6-col">
            ${this.demoEl(props)}
          </div>
          <div class="mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--6-col">
            ${content}
          </div>

          <div class="mdl-cell mdl-cell--12-col mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800">
            <p class="mdl-typography--display-2-color-contrast" style="padding: 20px;">
              Or open up your console and play with <code>form</code> and <code>layout</code> variables. These are the view instance we see above.

              <pre class="mdl-color--grey-200 mdl-color-text--accent" style="padding-left: 15px;"><code>
form.set('title', 'woot');
layout.demo.set({ name: 'Morane', unread: 1456, total: 12569 });
              </code></pre>
            </p>
          </div>
        </div>
      </main>
    </div>`;
  }

  static create (opts) {
    return new Layout(opts);
  }
}
