// Lifecycle callbacks
//
// createdCallback          - The behavior you define occurs when
//                            the element is registered.
// attachedCallback         - The behavior occurs when the element
//                            is inserted into the DOM.
// detachedCallback         - The behavior occurs when the element
//                            is removed from the DOM.
// attributeChangedCallback - The behavior occurs when an attribute
module.exports = {
  created () {
    // this.debug('created', this.el);
    this.emit('created');
  },

  attached () {
    // this.debug('attached', this.el);
    this.bindEvents();

    this.injectCSS();
    this.update();
    this.emit('attached');
  },

  detached () {
    // this.debug('detached', this.el);
    this.unbindEvents();
    this.emit('detached');
  },

  attributeChanged (name, prev, current) {
    this.update();
    this.emit('change', name, prev, current);
  }
};
