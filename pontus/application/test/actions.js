import Constants from '../app/constants/constants'
import MessageActions from '../app/actions/message-actions'
import {assert, expect} from 'chai'
import chai from 'chai'
import sinon from 'sinon'
import Dispatcher from '../app/dispatcher'
import sinonChai from 'sinon-chai'

chai.use(sinonChai);

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
			translatedMessage: null
		}

		MessageActions.createMessage(listID, text, allMessages)
		expect(Dispatcher.dispatch).to.have.been.calledWith(expectedAction);
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

		const expectedAction = {
			type: Constants.FAILURE_ON_CREATE_MESSAGE_NOT_UNIQUE
		};

		MessageActions.createMessage(listID, text, allMessages);
		expect(Dispatcher.dispatch).to.have.been.calledWith(expectedAction);
	});

	it ('it should dispatch too many chars failure message', () => { 
		const text = ' wioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeifjwoiefjwoewioeifjjwoiefjwoeifjwoeif';
		const listID = 1;
		const allMessages = [];
		
		const expectedAction = { 
			 type: Constants.FAILURE_ON_CREATE_MESSAGE_TOO_MANY_CHARS 
		};

		// const falseAction = { 
		// 	type: Constants.FAILURE_ON_CREATE_MESSAGE_NOT_UNIQUE
		// };

		MessageActions.createMessage(listID, text, allMessages);
		// assert(Dispatcher.dispatch.calledWith( {type: Constants.FAILURE_ON_CREATE_MESSAGE_TOO_MANY_CHARS} ));
		expect(Dispatcher.dispatch).to.have.been.calledWith(expectedAction);
		// expect(Dispatcher.dispatch).to.have.been.calledWith(falseAction);
	});

	// it('it should send the delete message action', () => { 

		// const falseAction = { 
		// 	type: Constants.FAILURE_ON_CREATE_MESSAGE_NOT_UNIQUE
		// };

		// expect(Dispatcher.dispatch).to.have.been.calledWith(expectedAction);
		// expect(Dispatcher.dispatch).to.have.been.calledWith(falseAction);

	// });
});

