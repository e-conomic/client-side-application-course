describe('List actions', function() {
	var Dispatcher;
	var ListActions;
	var createListSpy;
	var dispatchStub;

	var list = 'A test list';

	beforeEach(function() {
		Dispatcher = require('../../app/dispatcher/dispatcher');
		ListActions = require('../../app/actions/list-actions');
		createListSpy = sinon.spy(ListActions, 'createList');
		dispatchStub = sinon.stub(Dispatcher, 'dispatch');
	});

	afterEach(function() {
		createListSpy.restore();
		dispatchStub.restore();
	});

	describe('createList', function() {

		it('should test if dispatch is called with proper arguments', function() {
			ListActions.createList(list);
			dispatchStub.should.have.been.calledOnce;
			dispatchStub.should.have.been.calledWith({
				type: Constants.CREATE_LIST,
				listName: list
			});
		});

		it('should return when the list name is empty', function() {
			ListActions.createList('');
			dispatchStub.should.have.not.been.called;
		});
	});
});