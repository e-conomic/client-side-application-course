var AjaxHandler = require('../app/utilities/ajax-handler');

describe('Message actions', function() {
	var Constants = require('../app/dispatcher/constants');
	var Dispatcher;
	var MessageActions;
	var dispatchStub;

	beforeEach(function() {
		Dispatcher = require('../app/dispatcher/dispatcher');
		MessageActions = require('../app/actions/message-actions');
		dispatchStub = sinon.stub(Dispatcher, 'dispatch');
	});

	afterEach(function() {
		dispatchStub.restore();
	});

	it('should test if dispatch is called with proper arguments on message creation', sinon.test(function() {
		var createMessage = sinon.spy(MessageActions, 'createMessage');
		createMessage(0, 'A test message');
		dispatchStub.should.have.been.calledOnce;
		dispatchStub.should.have.been.calledWith({
			type: Constants.CREATE_MESSAGE,
			listKey: 0,
			message: 'A test message'
		});
		createMessage.restore();
	}));

	it('should return on an empty message', sinon.test(function() {
		var createMessage = sinon.spy(MessageActions, 'createMessage');
		createMessage(0, '');
		dispatchStub.should.have.not.been.called;
		createMessage.restore();
	}));

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
			})

			return MessageActions.translateMessages('elvish', [{
				message: 'bla bla'
			}])
		})

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
	})
});