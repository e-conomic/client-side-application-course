import Messages from '../../app/Components/Messages'

describe('Messages component', function() {

	var messages = [
    	                {id: 0, listId: 0, text: "message text", translation: '', isArchived: false},
        	            {id: 1, listId: 1, text: "message text", translation: 'translated', isArchived: true},
        	        ]

	const shallowRenderer = ReactTestUtils.createRenderer();

	describe('when rendered', function() {
		let output;

		beforeEach(() => {
			shallowRenderer.render(<Messages messages={messages} handleArchiveClick={()=>{}} handleDeleteClick={()=>{}} />);
			 output = shallowRenderer.getRenderOutput();
		});

		it('should return a div', function() {
			expect(output.type).to.equal('div');
		})

		it('should return the 2 children', function() {
			expect(output.props.children.length).to.equal(2);
		})
	})
})