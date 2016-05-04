var React = require('react');
var ReactDOM = require('react-dom');
var Cube = require('./components/game/objects/cube.js');

ReactDOM.render(
  React.createElement(Cube, null),
  document.getElementById('app')
);

