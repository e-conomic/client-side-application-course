import Messages from './Messages.jsx';
var React = require('react');
var ReactDOM = require('react-dom');
var MessageActions = require('../actions/message-actions.js');

var List = React.createClass({
        getInitialState: function() {
            return {
                    inputMessageName:"",
                    listId:this.props.listId
                };
        },
        render: function() {
            return  <div className="llist">
                        <div className="listname" >{this.props.listName}</div>
                        <div>
                            <input onChange={this.handleMessageChange} type="text"/>
                            <button type="button" onClick={this.addMessageChild}>Submit</button>
                        </div>
                         {/*console.log(thats how you comment inside return)*/}
                         <Messages  messages={this.filterMessages()} 
                                    allLists={this.props.allLists}/> 
                    </div>
        },
        addMessageChild: function() {
                MessageActions.addMessage(this.state.listId,this.state.inputMessageName);
        },
        filterMessages: function() {
            var filteredArray=[]
            for (var index = 0; index < this.props.allMessages.length; ++index) {
                if (this.props.allMessages[index].belongsToList==this.props.listId)
                    {
                        filteredArray.push(this.props.allMessages[index])
                    }
            }
           return filteredArray;
        },
        handleMessageChange: function(evt) {
            this.setState({
              inputMessageName: evt.target.value
          });
        }
    })


module.exports = List;
