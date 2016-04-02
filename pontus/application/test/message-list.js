let ReactTestUtils = require('react-addons-test-utils');
let React = require('react');
let MessageList = require('../app/message-list');
let expect = require('chai').expect;

let MessageStore = require('../app/stores/message-store');

describe('MessageList component', () => { 

	const shallowRenderer = ReactTestUtils.createRenderer(); 

	console.log('messagelist component test' );
	describe('when rendered', () => { 

		it('should return the expected output', () => { 

			let filteredMessages = MessageStore.getMessagesFilteredByListIDTest();

			shallowRenderer.render( <MessageList filteredMessages={filteredMessages} />);

			const output = shallowRenderer.getRenderOutput();

			const firstChild = output.props.children[1][0].props;
			expect(firstChild["listID"]).to.equal(1);
			expect(firstChild["messageID"]).to.equal(1);
			expect(firstChild["text"]).to.equal('message 1');
			expect(firstChild["isArchived"]).to.equal(false);

			const secondChild = output.props.children[1][1].props;
			expect(secondChild["listID"]).to.equal(2);
			expect(secondChild["messageID"]).to.equal(2);
			expect(secondChild["text"]).to.equal('message 2');
			expect(secondChild["isArchived"]).to.equal(true);
		});
	});
});
