var Parent = require('backbone').Collection;

module.exports = Parent.extend({
  initialize: initialize,
  getRegister: getRegister,
  preFetch: preFetch,
  fetch: fetch,
  _prepareModel: _prepareModel
});

function initialize(data, options) {
  if (options && options.registry) {
    this.registry = options.registry;
  }
  if (options && options.nameSpaces) {
    this.nameSpaces = options.nameSpaces;
  }
  Parent.prototype.initialize.call(this, data, options);
}

function getRegister() {
  return this.registry.getRegister(this.nameSpaces);
}

function preFetch(options) {
  if (this.getRegister() && typeof this.condition == 'function') {
    this.add(this.getRegister().filter(this.condition));
  }
}

function fetch(options) {
  this.preFetch();
  return Parent.prototype.fetch.call(this, options);
}

function _prepareModel(attrs, options) {
  var Model = this.model;
  var model;
  if (attrs instanceof Model) return attrs;
  if (this.registry) {
    model = this.getRegister().get(attrs[Model.prototype.idAttribute]);
  }
  return Parent.prototype._prepareModel.call(this, model || attrs, options);
}
