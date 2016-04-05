var Message = require('../app/components/list');
var MoveMessageField = require('../app/components/move-message-field');

// Question 1: How do i check if a component throws an error 
// Question 2: How do i check the props thas was given to a component outside of the rendering function, e.g the archived field. 
// 			   Should this be checked in another test, for instance when testing the <List /> component?

describe('List component', function() {
	const shallowRenderer = ReactTestUtils.createRenderer();
	var messageText = "test-text";
	var messageId = 5; 
	var archived = false; 
	var listId = 1
});

