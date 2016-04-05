import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'
import Messages from '../app/Components/Messages'
import {expect} from 'chai'
import 'babel-polyfill'

describe('Messages component', function() {

	var messages = [
    	                {id: 0, listId: 0, text: "message text", translation: '', isArchived: false},
        	            {id: 1, listId: 1, text: "message text", translation: 'translated', isArchived: true},
        	        ]

	const shallowRenderer = ReactTestUtils.createRenderer();

	describe('when rendered', function() {
		
		it('should return the expected output', function() {
			shallowRenderer.render(<Messages messages={messages} handleArchiveClick={()=>{}} handleDeleteClick={()=>{}} />);
			const output = shallowRenderer.getRenderOutput();
			expect(output.type).to.equal('div');
		})

	})
})