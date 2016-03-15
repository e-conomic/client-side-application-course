var React = require('react');

module.exports = React.createClass({
    render: function () {

        var style = {
            color: 'red'
        };
        return  <div style={style}>
                    {this.props.errorMessage}
                </div>
    }

});