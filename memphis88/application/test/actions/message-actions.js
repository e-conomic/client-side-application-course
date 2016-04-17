var AjaxHandler = require('../../app/utilities/ajax-handler');

describe('Message actions', function() {

	var Dispatcher;
	var MessageActions;
	var dispatchStub;

	beforeEach(function() {
		Dispatcher = require('../../app/dispatcher/dispatcher');
		MessageActions = require('../../app/actions/message-actions');
		dispatchStub = sinon.stub(Dispatcher, 'dispatch');
	});

	afterEach(function() {
		dispatchStub.restore();
	});

	describe('createMessage', function() {
		var createMessage;
		beforeEach(function() {
			createMessage = sinon.spy(MessageActions, 'createMessage');
		});

		afterEach(function() {
			createMessage.restore();
		});

		it('should test if dispatch is called with proper arguments', function() {
			createMessage(0, 'A test message');
			dispatchStub.should.have.been.calledOnce;
			dispatchStub.should.have.been.calledWith({
				type: Constants.CREATE_MESSAGE,
				listKey: 0,
				message: 'A test message'
			});
		});

		it('should return on an empty message', function() {
			createMessage(0, '');
			dispatchStub.should.have.not.been.called;
		});

		it('should dispatch an error when text is too big', function() {
			createMessage(0, Array(202).join('a'));
			dispatchStub.should.have.been.calledWith({
				type: Constants.EXCEED_RANGE_ERROR
			});
		});

		it('should dispatch an error when text already exists', function() {
			var MessageStore = require('../../app/stores/message-store');
			var stub = sinon.stub(MessageStore, 'getAll', function() {
				return [{
					listKey: 0,
					message: 'A test message'
				}];
			});
			createMessage(0, 'A test message');
			dispatchStub.should.have.been.calledWith({
				type: Constants.ALREADY_EXISTS_ERROR
			});
			stub.restore();
		});
	});

	describe('deleteMessage', function() {
		var deleteMessage;

		beforeEach(function() {
			deleteMessage = sinon.spy(MessageActions, 'deleteMessage');
		});

		afterEach(function() {
			deleteMessage.restore();
		});

		it('should test if dispatch is called with proper arguments', function() {
			deleteMessage(0);
			dispatchStub.should.have.been.calledWith({
				type: Constants.DELETE_MESSAGE,
				id: 0
			});
		});
	});

	describe('moveMessage', function() {
		var moveMessage;

		beforeEach(function() {
			moveMessage = sinon.spy(MessageActions, 'moveMessage');
		});

		afterEach(function() {
			moveMessage.restore();
		});

		it('should test if dispatch is called with proper arguments', function() {
			moveMessage(0, 0, '#FFFFFF');
			dispatchStub.should.have.been.calledWith({
				type: Constants.MOVE_MESSAGE,
				id: 0,
				listKey: 0,
				color: '#FFFFFF'
			});
		});
	});

	describe('archiveMessage', function() {
		var archiveMessage;

		beforeEach(function() {
			archiveMessage = sinon.spy(MessageActions, 'archiveMessage');
		});

		afterEach(function() {
			archiveMessage.restore();
		});

		it('should test if dispatch is called with proper arguments', function() {
			archiveMessage(0);
			dispatchStub.should.have.been.calledWith({
				type: Constants.ARCHIVE_MESSAGE,
				id: 0
			});
		});
	});

	describe('extractMessage', function() {
		var extractMessage;

		beforeEach(function() {
			extractMessage = sinon.spy(MessageActions, 'extractMessage');
		});

		afterEach(function() {
			extractMessage.restore();
		});

		it('should test if dispatch is called with proper arguments', function() {
			extractMessage(0);
			dispatchStub.should.have.been.calledWith({
				type: Constants.EXTRACT_MESSAGE,
				id: 0
			});
		});
	});

	describe('.translateMessages', function() {

		const expectedText = 'elvish words';
		const response = JSON.stringify({
			data: {
				translations: [{
					translatedText: expectedText
				}]
			}
		});

		beforeEach(function() {
			sinon.stub(AjaxHandler, 'get', function() {
				return Promise.resolve(response);
			});

			return MessageActions.translateMessages('elvish', [{
				message: 'bla bla'
			}]);
		});

		afterEach(function() {
			AjaxHandler.get.restore();
		});

		it('should dispatch the correct payload', function() {
			expect(dispatchStub).to.have.been.calledWith({
				type: Constants.TRANSLATE_MESSAGES,
				translatedMessages: [{
					message: expectedText
				}]
			});
		});

		it('should return if the language is none', function() {
			var spy = sinon.spy(MessageActions, 'translateMessages');
			MessageActions.translateMessages('none', []);
			spy.should.have.returned();
		});
	});
});