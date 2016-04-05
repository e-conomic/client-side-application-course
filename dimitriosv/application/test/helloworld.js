import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'
import Hello from '../app/components/hello-world'
import Message from '../app/components/Message'
import ListStore from '../app/stores/list-store'


describe('hello world', () => {
  it('works!', () => {
    expect(true).to.be.true;
  });
});

describe('Hello component', function() {
    const shallowRenderer = ReactTestUtils.createRenderer();
    describe('when rendered', function() {
        it('should return the expected output', function() {
            shallowRenderer.render(<Hello name='World' />);
            const output = shallowRenderer.getRenderOutput();
            expect(output.props.children).to.equal('Hello World');
        });
    });
});



describe('Message component', function() {
    const shallowRenderer2 = ReactTestUtils.createRenderer();
    var lists = ListStore.getAll();
    //var lists=[{listId: 0, listName: "first list1"},{listId: 1, listName: "second list2"}];
    describe('when rendered', function() {
        shallowRenderer2.render(<Message messageId='1'  messageText='hello' messageIsArchived='false' allLists={lists} />);
        const message = shallowRenderer2.getRenderOutput();
        it('should be div', function() {
            console.log(message.props.children);
            expect(message.props.children.type).to.equal('div');
        });
        //console.log("---");
        it('should contain hello', function() {
            //console.log(message.props.children);
            //console.log("---");
            //console.log(message.props.children.props.children[0]);
            expect(message.props.children.props.children[0].props.children).to.equal('hello');
        });
    });
});