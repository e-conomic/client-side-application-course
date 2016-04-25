import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import reactTestUtils from 'react-addons-test-utils';
import react from 'react';

chai.use(sinonChai);

global.expect = chai.expect;
global.Sinon = sinon;
global.React = react; 
global.ReactTestUtils = reactTestUtils;