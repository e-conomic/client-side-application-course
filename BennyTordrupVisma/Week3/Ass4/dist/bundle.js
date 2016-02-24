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

	//require("./style.css");

	var List = __webpack_require__(1);
	var InputField = __webpack_require__(3);

	var App = React.createClass({
		displayName: "App",

		getInitialState: function getInitialState() {
			return {
				//lists: []
				lists: [{
					name: "List 1",
					messages: [{
						id: 1,
						text: "Test 1-1"
					}, {
						id: 2,
						text: "Test 1-2",
						isArchived: true
					}, {
						id: 3,
						text: "Test 1-3"
					}, {
						id: 4,
						text: "Test 1-4",
						isArchived: true
					}, {
						id: 5,
						text: "Test 1-5"
					}]
				}, {
					name: "List 2",
					messages: [{
						id: 1,
						text: "Test 2-1"
					}, {
						id: 2,
						text: "Test 2-2",
						isArchived: true
					}, {
						id: 3,
						text: "Test 2-3"
					}, {
						id: 4,
						text: "Test 2-4",
						isArchived: true
					}, {
						id: 5,
						text: "Test 2-5"
					}]
				}]
			};
		},

		render: function render() {
			var listList = this.state.lists.map(function (list, index) {
				return React.createElement(List, { key: index,
					list: list,
					onArchiveMessage: this.archiveMessage,
					onDeleteMessage: this.deleteMessage,
					onUnarchiveMessage: this.unarchiveMessage,
					onMoveMessage: this.moveMessage });
			}.bind(this));

			return React.createElement(
				"div",
				null,
				React.createElement(InputField, { handleCommit: this.commitMessage, lists: this.state.lists }),
				React.createElement(
					"div",
					null,
					React.createElement(
						"h3",
						null,
						"Lists"
					),
					React.createElement(
						"div",
						null,
						listList
					)
				)
			);
		},

		moveMessage: function moveMessage(message, oldList, newListName) {
			console.log("Moving message from " + oldList.name + " to " + newListName);
			var sourceList = this.state.lists.find(function (l) {
				return l.name == oldList.name;
			});
			if (!sourceList) return;

			var destinationList = this.state.lists.find(function (l) {
				return l.name == newListName;
			});
			if (!destinationList) return;

			var msgPos = sourceList.messages.findIndex(function (m) {
				return m.id = message.id;
			});
			if (msgPos === -1) return;

			var msgText = sourceList.messages[msgPos].text;

			this.deleteMessage(message, oldList);

			this.commitMessage(msgText, newListName);
		},

		deleteMessage: function deleteMessage(message, list) {
			var listInStateToChange = this.state.lists.find(function (l) {
				return l.name == list.name;
			});
			if (!listInStateToChange) return;

			var listToChange = Object.assign({}, listInStateToChange);

			var msgPos = listToChange.messages.findIndex(function (m) {
				return m.id == message.id;
			});
			if (msgPos === -1) return;

			listToChange.messages.splice(msgPos, 1);

			this.setState({
				lists: this.state.lists.map(function (list) {
					return list.name == listToChange.name ? listToChange : list;
				})
			});
		},

		archiveOrUnarchiveMessageKernel: function archiveOrUnarchiveMessageKernel(message, list, doArchive) {
			var listToChange = this.state.lists.find(function (l) {
				return l.name == list.name;
			});
			if (!listToChange) return;

			var destList = Object.assign({}, listToChange);

			var msgToArchive = destList.messages.find(function (m) {
				return m.id == message.id;
			});
			if (!msgToArchive) return;

			msgToArchive.isArchived = doArchive;

			this.setState({
				lists: this.state.lists.map(function (list) {
					return list.name == destList.name ? destList : list;
				})
			});
		},

		archiveMessage: function archiveMessage(message, list) {
			this.archiveOrUnarchiveMessageKernel(message, list, true);
		},

		unarchiveMessage: function unarchiveMessage(message, list) {
			this.archiveOrUnarchiveMessageKernel(message, list, false);
		},

		commitMessage: function commitMessage(messageText, listName) {
			var msgToAdd = {
				id: 0,
				text: messageText,
				isArchived: false
			};

			var destinationList = this.state.lists.find(function (l) {
				return l.name == listName;
			});
			if (destinationList == null) {
				msgToAdd.id = 1;

				destinationList = {
					name: listName,
					messages: [msgToAdd]
				};

				this.setState({
					lists: this.state.lists.concat([destinationList])
				});
			} else {
				msgToAdd.id = destinationList.messages.length + 1;
				var newDestList = Object.assign({}, destinationList);
				newDestList.messages.push(msgToAdd);
				this.setState({
					lists: this.state.lists.map(function (list) {
						return list.name == newDestList.name ? newDestList : list;
					})
				});
			}
		}
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById("content"));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Message = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: "exports",

		render: function render() {
			var that = this;
			var activeMessageList = this.props.list.messages.filter(function (e) {
				return !e.isArchived;
			}).map(function (message, index) {
				return React.createElement(Message, { key: index,
					message: message,
					onArchiveMessage: that.archiveMessage,
					onDeleteMessage: that.deleteMessage,
					onUnarchiveMessage: that.unarchiveMessage,
					onMoveMessage: that.moveMessage });
			});
			var archivedMessageList = this.props.list.messages.filter(function (e) {
				return e.isArchived;
			}).map(function (message, index) {
				return React.createElement(Message, { key: index,
					message: message,
					onArchiveMessage: that.archiveMessage,
					onDeleteMessage: that.deleteMessage,
					onUnarchiveMessage: that.unarchiveMessage });
			});

			return React.createElement(
				"div",
				{ className: "list" },
				React.createElement(
					"h4",
					null,
					this.props.list.name
				),
				React.createElement(
					"div",
					null,
					activeMessageList
				),
				React.createElement(
					"h5",
					null,
					"Archived messages"
				),
				React.createElement(
					"div",
					null,
					archivedMessageList
				)
			);
		},

		moveMessage: function moveMessage(message, newListName) {
			this.props.onMoveMessage(message, this.props.list, newListName);
		},

		deleteMessage: function deleteMessage(message) {
			this.props.onDeleteMessage(message, this.props.list);
		},

		archiveMessage: function archiveMessage(message) {
			this.props.onArchiveMessage(message, this.props.list);
		},

		unarchiveMessage: function unarchiveMessage(message) {
			this.props.onUnarchiveMessage(message, this.props.list);
		}
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = React.createClass({
		displayName: "exports",

		getInitialState: function getInitialState() {
			return {
				listSelectionVisible: false
			};
		},

		render: function render() {
			var archivedMessage = React.createElement(
				"div",
				{ className: "archived-message" },
				this.props.message.id,
				". ",
				this.props.message.text,
				React.createElement(
					"button",
					{ onClick: this.handleUnarchive },
					"Unarchive"
				)
			);

			var nonArchivedMessage = React.createElement(
				"div",
				null,
				this.props.message.id,
				". ",
				this.props.message.text,
				React.createElement(
					"button",
					{ onClick: this.handleArchive },
					"Archive"
				),
				React.createElement(
					"button",
					{ onClick: this.handleDelete },
					"Delete"
				),
				!this.state.listSelectionVisible && React.createElement(
					"button",
					{ onClick: this.handleShowListSelection },
					"Move"
				),
				this.state.listSelectionVisible && React.createElement(
					"div",
					null,
					React.createElement(
						"label",
						null,
						"New list: "
					),
					React.createElement("input", { type: "text", ref: "newList" }),
					React.createElement(
						"button",
						{ onClick: this.handleMoveMessage },
						"Move"
					)
				)
			);

			return React.createElement(
				"div",
				null,
				this.props.message.isArchived ? archivedMessage : nonArchivedMessage
			);
		},

		handleShowListSelection: function handleShowListSelection() {
			this.setState({
				listSelectionVisible: true
			});
		},

		handleMoveMessage: function handleMoveMessage() {
			this.props.onMoveMessage(this.props.message, this.refs.newList.value);
			this.setState({
				listSelectionVisible: false
			});
		},

		handleDelete: function handleDelete() {
			this.props.onDeleteMessage(this.props.message);
		},

		handleArchive: function handleArchive() {
			this.props.onArchiveMessage(this.props.message);
		},

		handleUnarchive: function handleUnarchive() {
			this.props.onUnarchiveMessage(this.props.message);
		}
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = React.createClass({
		displayName: "exports",

		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"label",
					null,
					"Text to add: "
				),
				React.createElement("input", { type: "text", ref: "input" }),
				React.createElement(
					"label",
					null,
					"Name of list: "
				),
				React.createElement("input", { type: "text", ref: "listInput" }),
				React.createElement(
					"button",
					{ onClick: this.handleCommit },
					"Commit"
				)
			);
		},

		isInputValid: function isInputValid(input, list) {
			if (input.length > 200) {
				window.alert("The input may not exceed 200 characters.");
				return false;
			}

			if (list.length == 0) {
				window.alert("You have to enter a name on the list to add message to.");
				return false;
			}

			if (this.props.lists.some(function (l) {
				return l.messages.some(function (m) {
					return m.text == input;
				});
			})) {
				window.alert("The message is already member of a list and cannot be added");
				return false;
			}

			return true;
		},

		handleCommit: function handleCommit() {
			var input = this.refs.input.value;
			var list = this.refs.listInput.value;
			if (this.isInputValid(input, list)) {
				this.props.handleCommit(input, list);
				this.refs.input.value = '';
				this.refs.listInput.value = '';
				this.refs.input.focus();
			}
		}
	});

/***/ }
/******/ ]);