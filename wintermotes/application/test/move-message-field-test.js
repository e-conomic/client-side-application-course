var MoveMessageField = require('../app/components/move-message-field');
var ListStore = require('../app/stores/list-store');
var MessageActions = require('../app/actions/message-actions');

describe('Move Message field', function() {
	const shallowRenderer = ReactTestUtils.createRenderer();
	const moveMessageFieldTest = shallowRenderer.render(<MoveMessageField messageId={4} />);
	const moveMessageField = shallowRenderer.getRenderOutput();
	

	it('Should be able to recieve all lists from the list-store', function () {
		//TODO: you need to check if component has any lists
		var componentLists = ListStore.getAllLists();
		expect(ListStore.getAllLists()).to.eql(componentLists);
	});


	it('Should update when a new list is created', function () {
		var spy = Sinon.spy(MoveMessageField.prototype._onChange);
		//TODO: implement _onChange test
		//ListActions.createList("listName")
	});

	it('Should be able to create a moveMessage action', function () {
		var spy = Sinon.spy(MessageActions.moveMessage);
	});
});