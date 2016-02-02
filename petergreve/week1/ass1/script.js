var allMessages = [];

function handleClickSubmit() {

	var text = document.getElementById('typed').value;

	if (validateText(text)=== true) {
			printText(text);
	} else {
		printErrorMessage(text);
	}
}


function printText(text) {
	document.getElementById("message-container").innerHTML = text;
	addMessage(text);
}

function validateText(text) {
	if (typeof text === 'string' || text instanceof String) {
		return true;
	} else {
		return false;
	}
}

function addMessage(text) {
	allMessages.push(text)
}

function printErrorMessage(text) {
	var elem = document.getElementById("message-container");
	elem.innerHTML = text;
	elem.style.color = "Red";
}

function printAllMessages () {
		allMessages.forEach(function(element) {
			console.log(element);
		});
}