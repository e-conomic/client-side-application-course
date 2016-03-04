var React = require('react');
var List = require('./List');

var ListStore = require('../stores/list-store');
var ListActions = require('../actions/list-actions');

var MessageStore = require('../stores/message-store');


function getAppState() {
  return {
    allLists: ListStore.getAll(),
    allMessages: MessageStore.getAll()
  };
}

module.exports = React.createClass({
        getInitialState: function() {
            return Object.assign({}, getAppState());
        },
        componentDidMount: function() {
            ListStore.addChangeListener(this._onChange);
            MessageStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function() {
            ListStore.removeChangeListener(this._onChange);
            MessageStore.removeChangeListener(this._onChange);
        },
        render: function() {
            return  <div>
                        <input type="text" ref={(component) => this.newListName = component} />
                        <button type="button" onClick={this.createList}>New List</button>
                        <ol>
                            {this.state.allLists.map(function(list, i) {
                                return <List
                                            key={i}
                                            list={list}
                                            messages={this.getMessagesForList(list.id)} />;
                            },this)}
                        </ol>

                    </div>
        },
        createList: function() {
            ListActions.createList(this.newListName.value);
        },
        _onChange: function() {
            this.setState(getAppState());
        },
        getMessagesForList: function(listId) {
            return this.state.allMessages.filter((m) => {
                return m.listId == listId;
            });
        }

    });

