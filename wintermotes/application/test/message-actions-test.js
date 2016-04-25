var MessageActions = require('../app/actions/message-actions');
var MessageStore = require('../app/stores/message-store');
var Dispatcher = require('../app/dispatcher')
var Constants = require('../app/constants')

describe('Message actions', function() {
	var Sandbox; 
	var DispatcherSpy;
	var MessageActionsSpy;

	beforeEach(function () {
		Sandbox = Sinon.sandbox.create();
		DispatcherSpy = Sandbox.spy(Dispatcher, 'dispatch');
	});

	afterEach(function () {
		Sandbox.restore();
	});

	
	
	describe('with valid input should ', function () {
		it('dispatch create, delete, move, archive and unarchive message events', function() {
			var createMsgSpy = Sandbox.spy(MessageActions, 'createMessage');
			var deleteMsgSpy = Sandbox.spy(MessageActions, 'deleteMessage');
			var archiveMsgSpy = Sandbox.spy(MessageActions, 'archiveMessage');
			var unarchiveMsgSpy = Sandbox.spy(MessageActions, 'unarchiveMessage');

			MessageActions.createMessage("new message", 4, ["message1", "message2"]);
			MessageActions.deleteMessage(4);
			MessageActions.archiveMessage(2);
			MessageActions.unarchiveMessage(3);
			
			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.CREATE_MESSAGE, 
				listId : 4, 
				content : "new message"
			});

			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.DELETE_MESSAGE, 
				messageId : 4
			})

			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.ARCHIVE_MESSAGE, 
				messageId : 2
			})

			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.UNARCHIVE_MESSAGE, 
				messageId : 3
			})

			expect(DispatcherSpy).to.have.callCount(4)
		});

		it('dispatch add, update and remove events', function () {
			var addFilterSpy = Sandbox.spy(MessageActions, 'addListFilter');
			var addFilterSpy = Sandbox.spy(MessageActions, 'removeListFilter');
			var addFilterSpy = Sandbox.spy(MessageActions, 'updateFilters');

			MessageActions.addListFilter(4)
			MessageActions.removeListFilter(3)
			MessageActions.updateFilters([0, 2]);

			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.ADD_FILTER, 
				filterType : 'listFilter',
				filter : 4
			});

			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.REMOVE_FILTER,
				filterType : 'listFilter',
				filter : 3
			});

			expect(DispatcherSpy).to.have.been.calledWith({
				type : Constants.UPDATE_FILTERS,  
				filters : [0, 2]
			});
		});

		it('validate new messages to be unique and no longer than 200 characters', function () {
			
		});
	});

	describe('with invalid input should', function () {
		it('should send notifications events displaying a sucess or error message', function () {

		});
	});
});

