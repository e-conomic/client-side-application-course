var React = require("react");

function getAppState(){
    return {
        customers: [],
    }    
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    
    componentDidMount: function() {
        // ListStore.addChangeListener(this._onChange);
        // MessageStore.addChangeListener(this._onChange);
        // OptionsStore.addChangeListener(this._onChange);
        // ValidationStore.addChangeListener(this._onShowNotification);
        // LanguageStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function() {
        // ListStore.removeChangeListener(this._onChange);
        // MessageStore.removeChangeListener(this._onChange);
        // OptionsStore.removeChangeListener(this._onChange);
        // ValidationStore.removeChangeListener(this._onShowNotification);
        // LanguageStore.removeChangeListener(this._onChange);
    },
    
	render: function() {
        return  <div>
                    Hello world
                </div>
        // var listList = this.state.allLists.map((list) => <List key={list.id} list={list} messages={this.state.allMessages.filter(m => m.list == list.id)}/>);
        // var selectedListIds = this.state.allLists.filter(list => list.isSelected).map(l => l.id);
        // var selectedListsMessages = this.state.allMessages.filter(m => selectedListIds.includes(m.list)).sort((a, b) => {
        //     if (a.text < b.text)
        //         return -1;
                
        //     if (a.text > b.text)
        //         return 1;
                
        //     return 0;
        // });
        // var messagesList =  selectedListsMessages.map(msg => <Message key={msg.id} message={msg}/>);
        
		// return 	<div>
        //             {this.state.isNotificationBarVisible &&
        //                 <NotificationBar message={this.state.errorMessage} isError={this.state.isError} onDismissed={this._onDismissed} />}
        //             <Options />
        //             <LanguageSelector selectedLangauge={this.state.options.selectedLanguage} availableLanguages={this.state.allLanguages}/>
		// 			<InputField lists={this.state.allLists} messages={this.state.allMessages} selectedLanguage={this.state.options.selectedLanguage}/>
        //             {!this.state.options.showCombinedMessages &&
        //                 <div>
        //                     <h3>Lists</h3>
        //                     <div>
        //                         {listList}
        //                     </div>
        //                 </div>}
        //             {this.state.options.showCombinedMessages &&
        //                 <div>
        //                     <div id="messages">
        //                         {messagesList}
        //                     </div>
        //                     <div id="list-selection">
        //                         <ListSelector lists={this.state.allLists} />
        //                     </div>
        //                 </div>}
		// 		</div>
	},
    
 });

module.exports = App;