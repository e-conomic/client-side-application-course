var React = require('react');
var Messages = require('./Messages')
var ListStore = require('../stores/list-store');
var MessageStore = require('../stores/message-store');

module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: MessageStore.getAll(),
                lists: ListStore.getAll()
            }
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(() => this.setState({messages: MessageStore.getAll}));
            ListStore.addChangeListener(() => this.setState({lists: ListStore.getAll}));
        },
        render: function () {

            var style = {
                color: 'blue',
            };

            return  <div>
                        <ol>
                            {this.state.lists.map((list,i) => {
                                return
                                    <div>
                                        <input type="checkbox" name={list.name} value={list.name} />
                                    </div>;
                            }, this)}
                        </ol>
                        <div>
                            <ol>
                                {this.filterArchived(false).map(function(message,i) {
                                    return <div key={i}>
                                                {message.text}
                                            </div>;
                                },this)}
                            </ol>
                            <ol>
                                {this.filterArchived(true).map(function(message,i) {
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
        sortMessages: function(messages) {
            objArray.sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        }

});

