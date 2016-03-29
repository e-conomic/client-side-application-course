var React = require('react');

var List = require('./List');
var FilterCheckbox = require('./FilterCheckbox');

var MessageStore = require('../stores/message-store');
var MessageActions = require('../actions/message-actions');
var ListStore = require('../stores/list-store');
var ListActions = require('../actions/list-actions');
var FilterMessagesContainer = require('./FilterMessagesContainer')

import NotificationBar from './notification-bar';
import LanguageSelectorContainer from './LanguageSelectorContainer'

function getAppState() {
  return {
    allLists: ListStore.getAll(),
    validationMessage: MessageStore.getValidationMessage(),
  };
}

module.exports = React.createClass({
        getInitialState: function() {
            return getAppState();
        },
        componentDidMount: function() {
            ListStore.addChangeListener(this._onChange);
            MessageStore.addChangeListener(this._onChange);
        },
        componentWillUnmount: function() {
            ListStore.removeChangeListener(this._onChange);
            MessageStore.removeChangeListener(this._onChange);
        },
        handleDismissError: function() {
            MessageActions.dismissNotification();
        },
        render: function() {
            return  <div>
                        {this.state.validationMessage.isDismissed
                            ? null
                            : <NotificationBar message={this.state.validationMessage.message}
                                                isError={this.state.validationMessage.isError}
                                                onDismissed={this.handleDismissError}
                            />
                        }
                        <LanguageSelectorContainer />
                        <input type="text" ref={(component) => this.newListName = component} />
                        <button type="button" onClick={this.createList}>New List</button>
                        <ol>
                            {this.state.allLists.map(function(list, i) {
                                return <List key={i} list={list} />;
                            },this)}
                        </ol>
                        <FilterCheckbox />
                        <FilterMessagesContainer />
                    </div>
        },
        createList: function() {
            ListActions.createList(this.newListName.value);
        },
        _onChange: function() {
            this.setState(getAppState());
        }
    });

