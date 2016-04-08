import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import ReactTestUtils from 'react-addons-test-utils'
import React from 'react'

chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;
global.ReactTestUtils = ReactTestUtils;
global.React = React;