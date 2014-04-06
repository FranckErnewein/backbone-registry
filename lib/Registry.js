var Backbone = require('backbone');
var Collection = require('./Collection');

function Registry() {
  this.collections = {};
}

Registry.prototype = {
  createRegister: createRegister,
  getModel: getModel,
  getRegister: getRegister,
  link: link,
  unlink: unlink
};

function createRegister(nameSpace) {
  if (this.collections[nameSpace] instanceof Backbone.Collection) {
    return;
  }
  this.collections[nameSpace] = new Backbone.Collection();
}

function getModel(nameSpace, id) {
  return this.collections[nameSpace].get(id);
}

function getRegister(nameSpace) {
  return this.collections[nameSpace];
}

function link(collection, name) {
  var register = this.getRegister(name);
  if (collection.registry !== this) collection.registry = this;
  if (collection.nameSpaces !== name) collection.nameSpaces = name;
  register.listenTo(collection, 'add', register.add);
}

function unlink(collection, name) {
  var register = this.getRegister(name);
  register.stopListening(collection, 'add', register.add);
}


Registry.Collection = Collection;
module.exports = Registry;
