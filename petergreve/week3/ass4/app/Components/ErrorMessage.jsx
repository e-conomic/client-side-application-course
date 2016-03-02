var React = require('react');

var ErrorMessage = React.createClass({
    render: function () {

        var style = {
            color: 'red',
        };
        return  <div style={style}>
                    {this.props.errorMessage}
                </div>
    }

});