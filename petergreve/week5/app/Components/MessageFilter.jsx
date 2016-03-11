var React = require('react');
var Messages = require('./Messages')
var ListStore = require('../stores/list-store');
var ListActions = require('../actions/list-actions')

var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions')


module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: MessageStore.getAll(),
                lists: ListStore.getAll()
            }
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(() => this.setState({messages: MessageStore.getAll()}));
            ListStore.addChangeListener(() => this.setState({lists: ListStore.getAll()}));
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
                                        <input type="checkbox" value={list.id} onChange={this.handleCheckboxClick} /> 
                                    </span>
                        },this)}
                        <div>
                            <ol>
                                {this.sortMessages(this.filterArchived(false)).filter((m) => {return m.isHidden == false}).map(function(message,i) {
                                    return <div key={i}>
                                                {message.text}
                                            </div>;
                                },this)}
                            </ol>
                            <ol>
                                {this.sortMessages(this.filterArchived(true)).map(function(message,i) {
                                    return <div style={style} key={i}>
                                                {message.text}
                                            </div>;
                                },this)}
                            </ol>
                        </div>
                    </div>
        },
        filterArchived: function (isArchived)  {
               return this.state.messages.filter((m) => {
                    return m.isArchived == isArchived;
           });
       },
        sortMessages: function(arr) {
           return arr.sort(function(a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        },
        handleCheckboxClick: function(event) {
            if (!event.target.checked) {
                MessageActions.hideMessages(event.target.value)
                ListActions.hideListMessages(event.target.value)

            } else {
                MessageActions.unHideMessages(event.target.value)
                ListActions.unHideListMessages(event.target.value)

            }
        }

});

