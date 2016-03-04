var React = require('react');
var ReactDOM = require('react-dom');


var Message = React.createClass({
    renderListOptions: function(messageId) {  return function(list,i) {
        return (
             <option key={list.listId+messageId} value={list.listId}>{list.listName}</option>
        );
    }
    
    },
    render: function () {
        return (<div>
                    {this.props.messageIsArchived
                        ? <div className="archived">
                        <div className="messageText" >{this.props.messageText}</div>
                        <button type="button" onClick={this.toggleArchiveMessageChild.bind(null,this.props.messageId)}>Unarchive</button>
                        </div>
                        : <div>
                        <div className="messageText" >{this.props.messageText}</div>
                        <button type="button"  onClick={this.deleteMessageChild.bind(null,this.props.messageId)}>Delete</button>
                            <select className="llistcont" defaultValue="0"  onChange={this.moveMessage}>
                                <option key="0" value="0"  >Move to:</option>
                                {this.props.allLists.map(this.renderListOptions(this.props.messageId))}
                             </select>
                        <button type="button" onClick={this.toggleArchiveMessageChild.bind(null,this.props.messageId)}>Archive</button></div>
                    }
               </div>)
    },
    moveMessage: function(e) {
        var Listid=e.target.value;  
        //i am not sure if this is the correct way to communicate with the "grand-parent"
        this.props.addMessageParent(Listid,this.props.messageText)        
        this.props.deleteMessageParent(this.props.messageId)
    },
    deleteMessageChild: function(messageid) {
        this.props.deleteMessageParent(messageid)
    },
    toggleArchiveMessageChild: function(messageid) {
        this.props.toggleArchiveMessageParent(messageid)
    }
});

module.exports = Message;