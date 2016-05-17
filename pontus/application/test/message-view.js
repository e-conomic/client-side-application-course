let ReactTestUtils = require('react-addons-test-utils');
let React = require('react');
let MessageView = require('../app/message-view');
let expect = require('chai').expect;
let should = require('chai').should();

let lists = [{listName: 'list1', listID: 1 } ];

describe('MessageView component', () => { 

	console.log('message component test' );
	const shallowRenderer = ReactTestUtils.createRenderer(); 

	describe('when rendered', () => { 

		it('should return the expected output', () => { 
			shallowRenderer.render(
				<MessageView lists={lists}  />
			);

			const output = shallowRenderer.getRenderOutput();
			const styleDiv = output.props.children[0];

			expect(styleDiv.type).to.equal('div');
			expect(styleDiv.props['style']).should.not.equal(null);

		});
	});
});
