var expect = require('chai').expect;
var ListStore = require('../app/stores/list-store');
var sinon = require('sinon');

describe('List get', function() {
	it('should return an empty object if list does not exist', function() {
		var get = sinon.spy(ListStore, 'get');
		var list = ListStore.get();
		get.restore();
		sinon.assert.calledWith(get);
		expect(list).to.be.a('object');
		expect(list).to.be.empty;
	});
});