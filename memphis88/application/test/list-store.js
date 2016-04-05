var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

describe('ListStore', function() {
	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var ListStore;
	var spy;

	var createList = {
		type: Constants.CREATE_LIST,
		listName: 'a test list'
	};

	beforeEach(function() {
		Dispatcher = require('../app/dispatcher/dispatcher');
		spy = sinon.spy(Dispatcher, 'register');
		ListStore = require('../app/stores/list-store');
	});

	afterEach(function() {
		spy.restore();
	});

	it('registers a callback with the dispatcher', function() {
		Dispatcher.dispatch(createList);
		spy.should.have.been.called;
		spy.should.be.a('function');
	});

	it('get should return an empty object if list does not exist or not specified', function() {
		var list = ListStore.get();
		chai.expect(list).to.be.a('object');
		chai.expect(list).to.be.empty;
		list = ListStore.get('an invalid id');
		chai.expect(list).to.be.a('object');
		chai.expect(list).to.be.empty;
	});

	it('should create a list with specified name and have an id of type date', function() {
		var getAll = sinon.spy(ListStore, 'getAll');
		var list = ListStore.getAll();
		getAll.restore();
		list.should.be.a('array');
		list[0].should.be.a('object');
		list[0].name.should.equal('a test list');
	});
});