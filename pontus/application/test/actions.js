import Constants from '../app/constants/constants'
import MessageActions from '../app/actions/message-actions'
import {assert, expect} from 'chai'
import sinon from 'sinon'
import Dispatcher from '../app/dispatcher'

describe('actions for messages, ', () => {

	beforeEach( () => {
		sinon.spy(Dispatcher, 'dispatch');
	});

	afterEach( () => { 
		Dispatcher.dispatch.restore();
	});

	it('should create an action to add a message', () => { 
		const text = 'message text';
		const listID = 1;
		const allMessages = [];

		const expectedAction = { 
			type: Constants.CREATE_MESSAGE,
			listID,
			text,
			isArchived: false,
			translateMessage: null
		}

		MessageActions.createMessage(listID, text, allMessages)
		expect(Dispatcher.dispatch.calledWith(expectedAction));
	});

	it ('should only call the action once', () => { 
		const text = 'message text';
		const listID = 1;
		const allMessages = [];

		MessageActions.createMessage(listID, text, allMessages);
		assert(Dispatcher.dispatch.calledOnce);
	});

	it ('it should dispatch not unique failure message', () => { 
		const text = 'message text';
		const listID = 1;
		const allMessages = [{text: 'message text' }];

		MessageActions.createMessage(listID, text, allMessages);
		assert(Dispatcher.dispatch.calledWith( {type: Constants.FAILURE_ON_CREATE_MESSAGE_NOT_UNIQUE} ));
	});

	it ('it should dispatch too many chars failure message', () => { 
		const text = ' wioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeif';
		const listID = 1;
		const allMessages = [];

		MessageActions.createMessage(listID, text, allMessages);
		assert(Dispatcher.dispatch.calledWith( {type: Constants.FAILURE_ON_CREATE_MESSAGE_TOO_MANY_CHARS} ));
	});

	it('it should send the delete message action', () => { 



	});
});

