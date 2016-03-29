var React = require('react');
var MessageActions = require('../actions/message-actions')
var ListStore = require('../stores/list-store')

module.exports = React.createClass({
        getInitialState: function() {
            return {
                lists: ListStore.getAll(),
                targetListId: 0
            }
        },
        componentDidMount: function() {
            ListStore.addChangeListener(this.onChange);
        },
        componentWillUnmount: function() {
            ListStore.removeChangeListener(this.onChange);
        },
        render: function() {
            return  <span>
                        <button type="button" onClick={this.moveMessage}>Move to</button>
                        <select onChange={this.handleChange} defaultValue='0'>
                            {this.state.lists.map(function(list,i) {
                                return <option key={i} value={list.id}  >{list.name}</option>;
                            },this)}
                        </select>
                    </span>
        },
        moveMessage: function() {
            MessageActions.moveMessage(this.props.message, this.state.targetListId)
        },
        handleChange: function(event) {
            this.setState({targetListId: parseInt(event.target.value)});
        },
        onChange: function() {
                this.setState({
                    lists: ListStore.getAll()
                });
        }
});
