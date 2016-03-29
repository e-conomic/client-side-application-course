import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'
import HelloWorld from '../app/hello-world'
import {expect} from 'chai'

describe('HelloWorld component', function() {

	const shallowRenderer = ReactTestUtils.createRenderer();

	describe('when rendered', function() {

		it('should return the expected output', function() {
			shallowRenderer.render(<HelloWorld name='World'/>);
			const output = shallowRenderer.getRenderOutput();
			expect(output.props.children).to.equal('Hello World');
		})

	})
})