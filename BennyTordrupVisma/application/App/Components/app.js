var React = require("react");

var ListActions = require("../Actions/list-actions");
var MessageActions = require("../Actions/message-actions");
var OptionsActions = require("../Actions/options-actions");

var ListStore = require("../Stores/list-store");
var MessageStore = require("../Stores/message-store");
var OptionsStore = require("../Stores/options-store");
var ValidationStore = require("../Stores/validation-store");
var LanguageStore = require("../Stores/language-store");

var List = require("../Components/list");
var InputField = require("../Components/inputfield");
var Options = require("../Components/options");
var Message = require("../Components/message");
var ListSelector = require("../Components/listSelector");
var NotificationBar = require("../Components/notification-bar");
var LanguageSelector = require("../Components/languageSelector");

function getAppState(){
    return {
        allLists: ListStore.getAll(),
        allMessages: MessageStore.getAll(),
        options: OptionsStore.get(),
        allLanguages: LanguageStore.getLanguages(),
        // isNotificationBarVisible: false,
        // errorMessage: '',
        // isError: false,
    }    
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    
    componentDidMount: function() {
        ListStore.addChangeListener(this._onChange);
        MessageStore.addChangeListener(this._onChange);
        OptionsStore.addChangeListener(this._onChange);
        ValidationStore.addChangeListener(this._onShowNotification);
        LanguageStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        ListStore.removeChangeListener(this._onChange);
        MessageStore.removeChangeListener(this._onChange);
        OptionsStore.removeChangeListener(this._onChange);
        ValidationStore.removeChangeListener(this._onShowNotification);
        LanguageStore.removeChangeListener(this._onChange);
    },
    
	render: function() {
        var listList = this.state.allLists.map((list) => <List key={list.id} list={list} messages={this.state.allMessages.filter(m => m.list == list.id)}/>);
        var selectedListIds = this.state.allLists.filter(list => list.isSelected).map(l => l.id);
        var selectedListsMessages = this.state.allMessages.filter(m => selectedListIds.includes(m.list)).sort((a, b) => {
            if (a.text < b.text)
                return -1;
                
            if (a.text > b.text)
                return 1;
                
            return 0;
        });
        var messagesList =  selectedListsMessages.map(msg => <Message key={msg.id} message={msg}/>);
        
		return 	<div>
                    {this.state.isNotificationBarVisible &&
                        <NotificationBar message={this.state.errorMessage} isError={this.state.isError} onDismissed={this._onDismissed} />}
                    <Options />
                    <LanguageSelector selectedLangauge={this.state.options.selectedLanguage} availableLanguages={this.state.allLanguages}/>
					<InputField lists={this.state.allLists} messages={this.state.allMessages}/>
                    {!this.state.options.showCombinedMessages &&
                        <div>
                            <h3>Lists</h3>
                            <div>
                                {listList}
                            </div>
                        </div>}
                    {this.state.options.showCombinedMessages &&
                        <div>
                            <div id="messages">
                                {messagesList}
                            </div>
                            <div id="list-selection">
                                <ListSelector lists={this.state.allLists} />
                            </div>
                        </div>}
				</div>
	},
    
    _onChange: function() {
         this.setState(getAppState());
    },
    
    _onShowNotification: function() {
        var validationResult = ValidationStore.getValidationResult();
        this.setState({
            isNotificationBarVisible: true,
            errorMessage: validationResult.message,
            isError: validationResult.isError,
        });
    },

	_onDismissed: function() { 
 		this.setState({ 
 			isNotificationBarVisible: false
 		});
 	},
 });

module.exports = App;