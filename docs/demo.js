const View = require('..');

export default class Demo extends View {
  get name () {
    return 'demo';
  }

  get defaults () {
    return {
      name: 'YoV',
      unread: 2,
      total: 15
    };
  }


  get style () {
    return this.csjs`
    .yov-demo {
      padding-top: 25px;
    }
    `;
  }

  template (props) {
    let data = this.data;
    let { unread, total, name } = data;

    return this.hx`<div class="mdl-grid js-demo">
      <div class="mdl-cell mdl-cell--12-col">
        <h3>Hello ${name}!</h3>
      </div>

      <div class="mdl-cell mdl-cell--8-col">
        <p>You have ${unread} / ${total} unread messages.</p>
      </div>
      <div class="mdl-cell mdl-cell--4-col">
        ${this.badge(unread, 'unread')}
        ${this.badge(total, 'total')}
      </div>
    </div>`;
  }

  badge (number, label) {
    return this.hx`<span class="mdl-badge" data-badge="${number}" style="margin-left: 12px;">
      ${label}
    </span>`;
  }
}

