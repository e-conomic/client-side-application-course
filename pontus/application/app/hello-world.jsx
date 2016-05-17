let React = require('react');

let HelloWorld = React.createClass({ 

	render() {
		const content = 'Hello ' + this.props.name;
		return (
			<div>{content}</div>
		);
	}
});

module.exports = HelloWorld;
