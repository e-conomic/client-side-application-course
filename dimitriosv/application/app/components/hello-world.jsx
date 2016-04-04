import React from 'react'

export default React.createClass({
    propTypes: {
        name: React.PropTypes.string,
    },
    render() {
    	const content = 'Hello ' + this.props.name;
        return (
            <div>{content}</div>
        );
    }
});