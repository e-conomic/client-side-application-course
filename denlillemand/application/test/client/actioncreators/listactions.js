import { expect, assert } from 'chai';
import  listActions  from '../../../app/actioncreators/listactions';
import { CREATE_LIST } from '../../../app/constants/listconstants';
import sinon from 'sinon';
import Dispatcher from '../../../app/dispatcher';

const listName = "someName";

describe('Create list action creator', (done) => {
    describe('When called with a valid input', (done) => {
        it('Should not throw an error', () => {
            listActions.createList(listName);
        });

        it('Gives the correct action to the dispatcher, and the dispatcher dispatches it a single time', (done)  => {
            var spy = sinon.spy(Dispatcher, 'dispatch');
            listActions.createList(listName);
            var correctAction = {
                type: CREATE_LIST,
                data: {
                    listName
                }
            };
            setTimeout(() => {
                expect(spy.withArgs(correctAction).calledOnce);
                done();
            }, 0);
        });

    });
    describe('When called with invalid input', (done) => {
        it('Throws a TypeError if the input type for the first argument listName isn\'t a string', () => {
            var spy  = sinon.spy(listActions, 'createList');
            assert.throws(() => {listActions.createList({})}, TypeError, "Invalid type:object");
            assert.throws(() => {listActions.createList(666)}, TypeError, "Invalid type:number");
            assert.throws(() => {listActions.createList(666.66)}, TypeError, "Invalid type:number");
            assert.throws(() => {listActions.createList(null)}, TypeError, "Invalid type:object");
            assert.throws(() => {listActions.createList()}, TypeError, "Invalid type:undefined");
            setTimeout(() => {
                expect(spy.alwaysThrew(TypeError));
                done();
            }, 0);
        });
    });
});
