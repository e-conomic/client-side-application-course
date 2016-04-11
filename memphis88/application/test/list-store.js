describe('ListStore', function() {
	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var ListStore;
	var registerStub;
	var dispatchSpy;

	var createList = {
		type: Constants.CREATE_LIST,
		listName: 'a test list'
	};

	beforeEach(function() {
		Dispatcher = require('../app/dispatcher/dispatcher');
		ListStore = rewire('../app/stores/list-store');
		registerStub = sinon.stub(Dispatcher, 'register');
		dispatchSpy = sinon.spy(Dispatcher, 'dispatch');
		Dispatcher.register(ListStore);
	});

	afterEach(function() {
		registerStub.restore();
		dispatchSpy.restore();
	});

	it('registers a callback with the dispatcher', sinon.test(function() {
		registerStub.should.have.been.calledOnce;
	}));

	it('get should return an empty object if list does not exist or not specified', sinon.test(function() {
		var list = ListStore.get();
		expect(list).to.be.a('object');
		expect(list).to.be.empty;
		list = ListStore.get('an invalid id');
		expect(list).to.be.a('object');
		expect(list).to.be.empty;
	}));

	it('should create a list with specified name and have an id of type Number', sinon.test(function() {
		registerStub.should.have.been.calledOnce;
		Dispatcher.dispatch(createList);
		var list = ListStore.getAll();
		list.should.be.a('array');
		list[0].should.be.a('object');
		list[0].name.should.equal('a test list');
		list[0].id.should.be.a('Number');
	}));
});