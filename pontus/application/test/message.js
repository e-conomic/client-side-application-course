let ReactTestUtils = require('react-addons-test-utils');
let React = require('react');
let Message = require('../app/message');
let expect = require('chai').expect;

describe('Message component', () => { 

	console.log('message component test' );
	const shallowRenderer = ReactTestUtils.createRenderer(); 

	describe('when rendered', () => { 

		it('should return the expected output', () => { 
			shallowRenderer.render(
				<Message text="a message" translatedMessage="translated message" />
			);

			const output = shallowRenderer.getRenderOutput();

			const firstChild = output.props.children[0];
			expect(firstChild.type).to.equal('li');
			expect(firstChild.props.children).to.equal('a message');

			const secondChild = output.props.children[1];
			expect(secondChild.props["translatedMessage"]).to.equal("translated message");
		});
	});
});
