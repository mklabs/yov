const View = require('..');

export default class Shell extends View {
  get style () {
    return `.padded-content {
      border-radius: 2px;
      padding: 80px 56px;
      margin-bottom: 80px;
    }

		.marked > h1 {
			display: none;
		}

		.header-desc {

		}

    .mdl-layout .subheading {
			margin-top: 80px;
		}

    .mdl-layout .mdl-layout__header-row {
      padding-left: 20px;
    }`;
  }

  created () {
    this.injectCSS(this.style);
  }

  template (props) {
    let content = props.body || '';
    if (content) {
      content = this.hx`<div class="marked"></div>`;
      content.innerHTML = props.body;
    }

    return this.hx`
    <div class="mdl-layout mdl-layout--fixed-header mdl-js-layout mdl-color--grey-100">
      <header class="mdl-layout__header mdl-layout__header--scroll mdl-color--grey-100 mdl-color-text--grey-800">
        <div class="mdl-layout__header-row mdl-grid">
						<div class="mdl-cell mdl-cell--1-col"></div>
						<div class="mdl-cell mdl-cell--10-col">
							<h1 class="mdl-layout-title">
								<span class="mdl-typography--display-2">${props.title}</div>
								<span class="header-desc mdl-typography--caption-color-contrast">Tiny ViewModel component for yo-yo</span></h1>
							<div class="mdl-layout-spacer"></div>
							${props.navlist}
						</div>
        </div>
      </header>

			<div class="mdl-grid subheading">
				<div class="mdl-cell mdl-cell--12-col">
					<p class="mdl-typography--display-1-color-contrast">
						${props.subheading}
					</p>
				</div>
			</div>

      <main class="mdl-layout__content">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--hide-tablet mdl-cell--hide-phone"></div>
          <div class="mdl-color--white mdl-shadow--4dp content mdl-color-text--grey-800 mdl-cell mdl-cell--10-col padded-content">
            ${content}
          </div>
        </div>
      </main>
    </div>`;
  }
}
