var React = require('react');

var MessageStore = require('../stores/message-store');


module.exports = React.createClass({
        getInitialState: function() {
            return {
                messages: MessageStore.getAll(),
            }
        },
        componentDidMount: function() {
            MessageStore.addChangeListener(() => this.setState({messages: MessageStore.getAll()}));
        },
        render: function () {

            var style = {
                color: 'blue',
            };

            return  <div>
                            <ol>
                                {this.sortMessages(this.filterArchived(false)).filter((m) => {return m.isHidden == false}).map((message,i) => {
                                    return <div key={i}>
                                                {message.text}
                                            </div>;
                                },this)}
                            </ol>
                            <ol>
                                {this.sortMessages(this.filterArchived(true)).filter((m) => {return m.isHidden == false}).map((message,i) => {
                                    return <div style={style} key={i}>
                                                {message.text}
                                            </div>;
                                },this)}
                            </ol>
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
        }

});

