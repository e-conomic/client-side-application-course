var expect = require('chai').expect
var Message = require('../app/components/message');
var MoveMessageField = require('../app/components/move-message-field');
var ReactTestUtils = require('react-addons-test-utils');
var React = require('react');

// Question 1: How do i check if a component throws an error 
// Question 2: How do i check the props thas was given to a component outside of the rendering function, e.g the archived field. 
// 			   Should this be checked in another test, for instance when testing the <List /> component?

describe('Message component', function() {

	const shallowRenderer = ReactTestUtils.createRenderer();
	var messageText = "test-text";
	var messageId = 5; 
	var archived = false; 
	var listId = 1

	shallowRenderer.render(<Message messageId={messageId} content={messageText} archived={false} listId={listId}/>);
	const resultObject = shallowRenderer.getRenderOutput();
	
	describe('A message', function() {
		it('should have the the given messageId, listId and content', function () {			
			var messageParagraph = resultObject.props.children[0].props.children
			expect(resultObject.type).to.equal('div');
			expect(messageParagraph).to.eql([ 'id: ', messageId, ' | text: ', messageText ]);
		});	

		it('should have a delete, archive and move field', function () {
			var b = ReactTestUtils.isElementOfType(<MoveMessageField />, resultObject.props.children[3].type)
			expect(b).to.be.true
			expect(resultObject.props.children[1].props.action).to.equal("delete");
			expect(resultObject.props.children[2].props.action).to.equal("archive");
		});

		it('should have the proper message style', function () {
			expect(resultObject.props.style).to.eql({ marginTop: '60px', border: '1px solid blue' })
		});
	});

	describe('An archived message', function () {
		it('should have the given messageId, listId, and message content', function () {

		}); 

		it('should have an unarhive field', function () {

		}); 

		it('should have the proper styling', function () {

		}); 
	});

		describe('when called with an invalid input', function() {
		it('Should throw an error', function () {

		});
	});
});

