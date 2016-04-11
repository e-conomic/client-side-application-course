describe('List actions', function() {
	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var ListActions;
	var createListSpy;
	var dispatchStub;

	var list = 'A test list';

	beforeEach(function() {
		Constants = require('../app/dispatcher/constants');
		Dispatcher = require('../app/dispatcher/dispatcher');
		ListActions = require('../app/actions/list-actions');
		createListSpy = sinon.spy(ListActions, 'createList');
		dispatchStub = sinon.stub(Dispatcher, 'dispatch');
	});

	afterEach(function() {
		createListSpy.restore();
		dispatchStub.restore();
	});

	it('should test if dispatch is called with proper arguments', sinon.test(function() {
		createListSpy(list);
		dispatchStub.should.have.been.calledOnce;
		dispatchStub.should.have.been.calledWith({
			type: Constants.CREATE_LIST,
			listName: list
		});
	}));

	it('should return when the list name is empty', sinon.test(function() {
		createListSpy('');
		dispatchStub.should.have.not.been.called;
	}));
});