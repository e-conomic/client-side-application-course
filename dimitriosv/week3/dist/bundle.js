/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _List = __webpack_require__(1);

	var _List2 = _interopRequireDefault(_List);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var App = React.createClass({
	    displayName: "App",

	    getInitialState: function getInitialState() {
	        return { //This state can be changed to empty of course
	            totalLists: 2,
	            totalMessages: 4,
	            inputListName: "",
	            lists: [{ listId: 1, listName: "first list1" }, { listId: 2, listName: "second list2" }],
	            allMessages: [{ messageId: 1, belongsToList: 1, text: "testmessage1", isArchived: false }, { messageId: 2, belongsToList: 1, text: "testmessage2", isArchived: false }, { messageId: 3, belongsToList: 1, text: "testmessage3", isArchived: false }, { messageId: 4, belongsToList: 2, text: "testmessage4", isArchived: false }]
	        };
	    },
	    eachList: function eachList(list, i) {
	        return React.createElement(
	            _List2.default,
	            { key: i,
	                index: i,
	                listName: list.listName,
	                listId: list.listId,
	                allLists: this.state.lists,
	                addMessageParent: this.addMessageParent,
	                deleteMessageParent: this.deleteMessageParent,
	                toggleArchiveMessageParent: this.toggleArchiveMessageParent,
	                allMessages: this.state.allMessages
	            },
	            list
	        );
	    },
	    createList: function createList(evt) {
	        if (this.state.inputListName == "") {
	            alert("Cannot add list with no name!");
	        } else {
	            var newlistId = this.state.totalLists;
	            newlistId++;
	            var newList = {
	                listId: newlistId,
	                listName: this.state.inputListName
	            };

	            //var lists=this.state.lists; //WRONG! THIS DOES NOT CREATE A NEW INSTANCE
	            var lists = Array.from(this.state.lists); //this creates a new instance

	            lists.push(newList);

	            this.setState({
	                lists: lists,
	                totalLists: this.state.totalLists + 1
	            });
	        }
	    },
	    addMessageParent: function addMessageParent(listId, MessageToAdd) {

	        var newMessageId = this.state.totalMessages;
	        newMessageId++;

	        var newMessage = {
	            messageId: newMessageId,
	            belongsToList: listId,
	            text: MessageToAdd,
	            isArchived: false
	        };

	        var allMessages = this.state.allMessages;

	        allMessages.push(newMessage);

	        this.setState({
	            allMessages: allMessages,
	            totalMessages: this.state.totalMessages + 1

	        });
	    },
	    deleteMessageParent: function deleteMessageParent(messageId) {
	        var allMessages = this.state.allMessages;

	        var newArray = allMessages.filter(function (obj) {
	            return messageId != obj.messageId;
	        });

	        this.setState({
	            allMessages: newArray
	        });
	    },
	    toggleArchiveMessageParent: function toggleArchiveMessageParent(messageId) {
	        var allMessages = this.state.allMessages;
	        allMessages.forEach(function (obj) {
	            if (obj.messageId === messageId) {
	                if (obj.isArchived) {
	                    obj.isArchived = false;
	                } else {
	                    obj.isArchived = true;
	                }
	            }
	        });

	        this.setState({
	            allMessages: allMessages
	        });
	    },
	    handleChange: function handleChange(evt) {
	        this.setState({
	            inputListName: evt.target.value
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "container" },
	            React.createElement(
	                "span",
	                null,
	                "Add new list with name: "
	            ),
	            React.createElement("input", { onChange: this.handleChange, type: "text" }),
	            React.createElement(
	                "button",
	                { type: "button", onClick: this.createList },
	                "Add"
	            ),
	            React.createElement(
	                "div",
	                { className: "llistcont" },
	                this.state.lists.map(this.eachList)
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Messages = __webpack_require__(2);

	var _Messages2 = _interopRequireDefault(_Messages);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var List = React.createClass({
	    displayName: "List",

	    getInitialState: function getInitialState() {
	        return {
	            inputMessageName: "",
	            listId: this.props.listId
	        };
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "llist" },
	            React.createElement(
	                "div",
	                { className: "listname" },
	                this.props.listName
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement("input", { onChange: this.handleMessageChange, type: "text" }),
	                React.createElement(
	                    "button",
	                    { type: "button", onClick: this.addMessageChild },
	                    "Submit"
	                )
	            ),
	            React.createElement(_Messages2.default, { deleteMessageParent: this.props.deleteMessageParent,
	                toggleArchiveMessageParent: this.props.toggleArchiveMessageParent,
	                addMessageParent: this.props.addMessageParent,
	                messages: this.filterMessages(),
	                allLists: this.props.allLists })
	        );
	    },
	    addMessageChild: function addMessageChild() {
	        if (!this.state.inputMessageName || this.state.inputMessageName.length > 200) {
	            alert("Message length not valid!");
	        } else {
	            this.props.addMessageParent(this.state.listId, this.state.inputMessageName);
	        }
	    },
	    filterMessages: function filterMessages() {
	        var filteredArray = [];
	        for (var index = 0; index < this.props.allMessages.length; ++index) {
	            if (this.props.allMessages[index].belongsToList == this.props.listId) {
	                filteredArray.push(this.props.allMessages[index]);
	            }
	        }
	        return filteredArray;
	    },
	    handleMessageChange: function handleMessageChange(evt) {
	        this.setState({
	            inputMessageName: evt.target.value
	        });
	    }
	});

	module.exports = List;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	//import Message from './Message.jsx';
	var Message = __webpack_require__(3);

	var Messages = React.createClass({
	    displayName: "Messages",

	    render: function render() {

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                null,
	                this.props.messages.map(function (message, i) {
	                    if (message.isArchived) {
	                        ;
	                    } else {
	                        return React.createElement(
	                            "div",
	                            { className: "message", key: i },
	                            React.createElement(Message, { messageId: message.messageId,
	                                messageText: message.text,
	                                messageIsArchived: message.isArchived,
	                                deleteMessageParent: this.props.deleteMessageParent,
	                                toggleArchiveMessageParent: this.props.toggleArchiveMessageParent,
	                                addMessageParent: this.props.addMessageParent,
	                                allLists: this.props.allLists
	                            })
	                        );
	                    }
	                }.bind(this))
	            ),
	            React.createElement(
	                "div",
	                null,
	                "Archived:"
	            ),
	            React.createElement(
	                "div",
	                null,
	                this.props.messages.map(function (message, i) {
	                    if (message.isArchived) {
	                        return React.createElement(
	                            "div",
	                            { className: "message", key: i },
	                            React.createElement(Message, { messageId: message.messageId,
	                                messageText: message.text,
	                                messageIsArchived: message.isArchived,
	                                deleteMessageParent: this.props.deleteMessageParent,
	                                toggleArchiveMessageParent: this.props.toggleArchiveMessageParent,
	                                addMessageParent: this.props.addMessageParent,
	                                allLists: this.props.allLists
	                            })
	                        );
	                    } else {
	                        ;
	                    }
	                }.bind(this))
	            )
	        );
	    }

	});

	module.exports = Messages;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var Message = React.createClass({
	    displayName: "Message",

	    eachList: function eachList(messageId) {
	        return function (list, i) {
	            return React.createElement(
	                "option",
	                { key: list.listId + messageId, value: list.listId },
	                list.listName
	            );
	        };
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            this.props.messageIsArchived ? React.createElement(
	                "div",
	                { className: "archived" },
	                React.createElement(
	                    "div",
	                    { className: "messageText" },
	                    this.props.messageText
	                ),
	                React.createElement(
	                    "button",
	                    { type: "button", onClick: this.toggleArchiveMessageChild.bind(null, this.props.messageId) },
	                    "Unarchive"
	                )
	            ) : React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "div",
	                    { className: "messageText" },
	                    this.props.messageText
	                ),
	                React.createElement(
	                    "button",
	                    { type: "button", onClick: this.deleteMessageChild.bind(null, this.props.messageId) },
	                    "Delete"
	                ),
	                React.createElement(
	                    "select",
	                    { className: "llistcont", defaultValue: "0", onChange: this.moveMessage },
	                    React.createElement(
	                        "option",
	                        { key: "0", value: "0" },
	                        "Move to:"
	                    ),
	                    this.props.allLists.map(this.eachList(this.props.messageId))
	                ),
	                React.createElement(
	                    "button",
	                    { type: "button", onClick: this.toggleArchiveMessageChild.bind(null, this.props.messageId) },
	                    "Archive"
	                )
	            )
	        );
	    },
	    moveMessage: function moveMessage(e) {
	        var Listid = e.target.value;
	        //i am not sure if this is the correct way to communicate with the "grand-parent"
	        this.props.addMessageParent(Listid, this.props.messageText);
	        this.props.deleteMessageParent(this.props.messageId);
	    },
	    deleteMessageChild: function deleteMessageChild(Messageid) {
	        this.props.deleteMessageParent(Messageid);
	    },
	    toggleArchiveMessageChild: function toggleArchiveMessageChild(Messageid) {
	        this.props.toggleArchiveMessageParent(Messageid);
	    }
	});

	module.exports = Message;

/***/ }
/******/ ]);