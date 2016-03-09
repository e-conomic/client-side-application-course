var React = require('react');

var List = require('./List');
var ErrorMessage = require('./ErrorMessage')
var MessageStore = require('../stores/message-store')

var ListStore = require('../stores/list-store');
var ListActions = require('../actions/list-actions');



function getAppState() {
  return {
    allLists: ListStore.getAll(),
    errorMessage: ''
  };
}

module.exports = React.createClass({
        getInitialState: function() {
            return Object.assign({}, getAppState());
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
                        <ErrorMessage errorMessage={this.state.errorMessage} />
                        <input type="text" ref={(component) => this.newListName = component} />
                        <button type="button" onClick={this.createList}>New List</button>
                        <ol>
                            {this.state.allLists.map(function(list, i) {
                                return <List key={i} list={list} />;
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
        _onError: function () {
            this.setState({errorMessage: 'message is too long'})
        }

    });

