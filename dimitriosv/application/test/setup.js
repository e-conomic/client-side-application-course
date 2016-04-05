import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import polyfill from 'babel-polyfill';
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;