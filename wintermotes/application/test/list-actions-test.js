var ListActions = require('../app/actions/list-actions');
var ListStore = require('../app/stores/list-store');
var Dispatcher = require('../app/dispatcher')

describe('List actions should', function() {
	it('dispatch a createList event with the given paramater', function () {
		var DispatcherSpy = Sinon.spy(Dispatcher, 'dispatch');
		var ListActionsSpy = Sinon.spy(ListActions, 'createList')

		ListActions.createList("new list")
		expect(DispatcherSpy).to.have.been.calledWith({type: 'CREATE_LIST', listName: 'new list'});

		ListActionsSpy.restore();
		DispatcherSpy.restore();
	});
});
