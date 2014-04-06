var expect = require('expect.js');
var Registry = require('..');

describe('RegistryCollection', function() {
  var registry = new Registry();
  registry.createRegister('users');
  var Adults;
  before(function() {
    Adults = Registry.Collection.extend({
      registry: registry,
      nameSpace: 'users',
      condition: function(user) {
        return user.get('age') && user.get('age') > 18;
      }
    });
  });
  describe('#_prepareModel', function() {
    it('Should be empty', function() {
      var adults = new Adults();
      expect(adults.length).to.be.equal(0);
    });
  });
});
