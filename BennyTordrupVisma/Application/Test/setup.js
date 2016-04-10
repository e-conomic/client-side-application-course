var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.expect = chai.expect;
global.assert = chai.assert;
global.sinon = sinon;

global.testLists = [{
    id: 1,
    name: 'List 1',
    isSelected: true,
},
{
    id: 2,
    name: 'List 2',
    isSelected: true,
}];

global.testMessages = [{
    id: 1,
    list: 1,
    text: "Hello world",
    translatedText: ""
}, {
    id: 2,
    list: 2,
    text: "This is a test",
    translatedText: ""
}, {
    id: 3,
    list: 1,
    text: "Vil du have en is?",
    isArchived: true,
    translatedText: ""
}, {
    id: 4,
    list: 2,
    text: "Habla espanol?",
    isArchived: true,
    translatedText: ""
}]
