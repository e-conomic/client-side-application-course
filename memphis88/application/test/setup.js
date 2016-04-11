import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import rewire from 'rewire';

chai.should();
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;
global.rewire = rewire;