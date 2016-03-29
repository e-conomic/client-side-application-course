var React = require('react');

var ListStore = require('../stores/list-store');

var ListActions = require('../actions/list-actions')


module.exports = React.createClass({
        getInitialState: function() {
            return {
                lists: ListStore.getAll()
            }
        },
        componentDidMount: function() {
            ListStore.addChangeListener(this.onChange);
        },
        componentWillUnmount: function() {
            ListStore.removeChangeListener(this.onChange);
        },
        render: function () {

            var style = {
                color: 'blue',
            };

            return  <div>
                        <div>
                            Filter on lists:
                        </div>
                        {this.state.lists.map(function(list, i) {
                            return <span key={i}>
                                        {list.name}
                                        <input type="checkbox" value={list.id} defaultChecked onChange={this.handleCheckboxClick} />
                                    </span>
                        },this)}
                    </div>
        },
        handleCheckboxClick: function(event) {
            if (!event.target.checked) {
                ListActions.hideMessages(event.target.value)
            } else {
                ListActions.unHideMessages(event.target.value)

            }
        },
        onChange: function() {
            this.setState({lists: ListStore.getAll()})
        }
});

