import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'
import Message from '../app/components/hello-world'



describe('hello world', () => {
  it('works!', () => {
    expect(true).to.be.true;
  });
});

describe('Message component', function() {
    const shallowRenderer = ReactTestUtils.createRenderer();
    describe('when rendered', function() {
        it('should return the expected output', function() {
            shallowRenderer.render(<Message name='World' />);
            const output = shallowRenderer.getRenderOutput();
            expect(output.props.children).to.equal('Hello World');
        });
    });
});