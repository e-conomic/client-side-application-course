var React = require('react');

var List = require('./List');
var FilterCheckbox = require('./FilterCheckbox');

var MessageStore = require('../stores/message-store');

var ListStore = require('../stores/list-store');
var ListActions = require('../actions/list-actions');

import NotificationBar from './notification-bar';


function getAppState() {
  return {
    allLists: ListStore.getAll(),
    messageError: false
  };
}

module.exports = React.createClass({
        getInitialState: function() {
            return getAppState();
        },
        componentDidMount: function() {
            ListStore.addChangeListener(this._onChange);
            MessageStore.addErrorListener(this._onError);
        },
        componentWillUnmount: function() {
            ListStore.removeChangeListener(this._onChange);
            MessageStore.removeErrorListener(this._onError);
        },
        render: function() {
            return  <div>
                        <NotificationBar message='message too long' isError={this.state.messageError} onDismissed={this.handleDismissError}/> 
                        <input type="text" ref={(component) => this.newListName = component} />
                        <button type="button" onClick={this.createList}>New List</button>
                        <ol>
                            {this.state.allLists.map(function(list, i) {
                                return <List key={i} list={list} />;
                            },this)}
                        </ol>
                        <FilterCheckbox />
                    </div>
        },
        createList: function() {
            ListActions.createList(this.newListName.value);
        },
        _onChange: function() {
            this.setState(getAppState());
        },
        _onError: function () {
            this.setState({messageError: true})
        },
        handleDismissError: function() {
            this.setState({messageError:false})
        }

    });

