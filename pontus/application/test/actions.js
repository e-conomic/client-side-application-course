let Constants = require('../app/constants/constants');
let MessageActions = require('../app/actions/message-actions');

let expect = require('chai').expect;

describe('action', () => {
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

		// doesn't work, would only work in redux.
		expect(MessageActions.createMessage(listID, text, allMessages)).to.equal(expectedAction);
	});
});

