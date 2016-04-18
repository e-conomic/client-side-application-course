import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'
import chaiAsPromised from 'chai-as-promised';

chai.use(sinonChai);
chai.use(chaiAsPromised);

global.expect = chai.expect;
global.sinon = sinon;
global.ReactTestUtils = ReactTestUtils;
global.React = React;