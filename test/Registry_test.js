var expect = require('expect.js');
var Registry = require('..');
var Backbone = require('backbone');

describe('Registry', function() {

  var registry = new Registry();
  registry.createRegister('users');

  describe('#createRegister', function() {
    it('Should add collections', function(done) {
      expect(registry.collections.users).to.be.a(Backbone.Collection);
      done();
    });
  });

  describe('#get', function() {
    var userId = 1;
    it('Should get nothing', function() {
      expect(registry.getModel('users', userId)).to.be(undefined);
    });
    it('Should get the user', function() {
      var user = new Backbone.Model({
        id: userId,
        name: 'John'
      });
      registry.getRegister('users').add(user);
      expect(registry.getModel('users', userId)).to.be(user);
    });
  });

  describe('#link and #unlink', function() {
    var cars = new Registry.Collection();
    registry.createRegister('cars');
    it('should not add to registry', function() {
      cars.add({
        id: 1,
        name: 'one'
      });
      expect(cars.length).to.be.equal(1);
      expect(registry.getRegister('cars').length).to.be.equal(0);
    });
    it('should add to registry', function() {
      registry.link(cars, 'cars');
      cars.add({
        id: 2,
        name: 'two'
      });
      expect(cars.length).to.be.equal(2);
      expect(registry.getRegister('cars').length).to.be.equal(1);
    });
    it('should add to registry', function() {
      var otherCars = new Registry.Collection();
      registry.link(otherCars, 'cars');
      otherCars.add({
        id: 2,
        name: 'two'
      });
      expect(otherCars.length).to.be.equal(1);
      expect(registry.getRegister('cars').length).to.be.equal(1);
      expect(cars.get(2) === otherCars.get(2)).to.be.ok; //jshint ignore:line
    });

    it('should not add to registry after unlink', function(){
    });
  });

});
