var Constants = require('../constants')
var Dispatcher = require('../dispatcher')
var languageUrl = require('../utils/translate-Url').languageUrl
var translateUrl = require('../utils/translate-Url').translateUrl
var googleKey = require('../utils/translate-Url').key

var errorMessage = "An error has happened"

function validateString (string, messages){
	if(string.length >= 200){
		errorMessage = "Messages can't be longer than 200 characters."
		return false
	}

	for(var i = 0; i<messages.length; i++){
		if(messages[i].content == string){
			errorMessage = "Message must be unique."
			return false
		}
	}

	return true
}

function createTranslatedMessagesObjects(messages, jsonTranslateObject){
	var translatedMessages = []
	for(var i = 0; i<messages.length; i++){
		translatedMessages[i] = messages[i]; 
		translatedMessages[i].content = jsonTranslateObject.data.translations[i].translatedText;
	}
	return translatedMessages
}

module.exports = {
	createMessage : function(content, listId, messages){
		if(validateString(content, messages)){
			Dispatcher.dispatch({
				type : Constants.CREATE_MESSAGE, 
				listId : listId, 
				content : content
			});			
		} else {
			this.createNotification(true)
		}
	},
	moveMessage : function(newListId, messageId){
		Dispatcher.dispatch({
			type : Constants.MOVE_MESSAGE, 
			listId : newListId,
			messageId : messageId,
		});
	},
	deleteMessage : function(id){
		Dispatcher.dispatch({
			type : Constants.DELETE_MESSAGE, 
			messageId : id
		});
	}, 
	archiveMessage : function(id){
		Dispatcher.dispatch({
			type : Constants.ARCHIVE_MESSAGE, 
			messageId : id
		});
	}, 
	unarchiveMessage : function(id){
		Dispatcher.dispatch({
			type : Constants.UNARCHIVE_MESSAGE, 
			messageId : id
		});
	}, 
	updateFilters : function(filters){
		Dispatcher.dispatch({
			type : Constants.UPDATE_FILTERS, 
			filters : filters
		});
	}, 
	addListFilter : function(filter){
		Dispatcher.dispatch({
			type : Constants.ADD_FILTER, 
			filterType : 'listFilter',
			filter : filter
		});
	}, 
	removeListFilter : function(filter){
		Dispatcher.dispatch({
			type : Constants.REMOVE_FILTER, 
			filterType : 'listFilter',
			filter : filter
		});
	}, 
	createNotification : function(isError){
		Dispatcher.dispatch({
			type : Constants.CREATE_NOTIFICATION, 
			isError : isError, 
			text : errorMessage
		});
	},
	dismissNotification : function(id){
		Dispatcher.dispatch({
			type : Constants.DISMISS_NOTIFICATION, 
			id : id
		});
	},
	disableTranslation: function(){
		Dispatcher.dispatch({
			type : Constants.DISABLE_TRANSLATION
		})
	},
	translateMessages: function(messages, language) {
		var query = translateUrl
		for(var i = 0; i<messages.length; i++){
			query += "q=" + messages[i].content + "&"
		}

		query += "target=" + language + "&"
		query += "key=" + googleKey

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", query, true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
		    	var translationObject = JSON.parse(xhttp.responseText)
		    	Dispatcher.dispatch({
		    		type: Constants.TRANSLATE_MESSAGES, 
		    		messages: createTranslatedMessagesObjects(messages, translationObject)
		    	})
		    } 
		};
	},
	getAllLangugages: function(){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", languageUrl, true);
		xhttp.send();
		xhttp.onreadystatechange = function() {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
		       Dispatcher.dispatch({
		       		type: Constants.GET_LANGUAGES, 
		       		languages: xhttp.responseText
		       });
		    } 
		};
	} 
}