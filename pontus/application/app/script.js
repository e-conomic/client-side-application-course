function xhr(method, url, data, success, failure) {
	let ajax = new XMLHttpRequest();
	// let json = JSON.stringify(data);

	ajax.open(method, url);
	ajax.setRequestHeader('Content-Type', 'application/json');

	ajax.send(json);

	ajax.onreadystatechange = function () {

		// when they are both 4, and it's ready
		if (ajax.readyState === XMLHttpRequest.DONE) {

			// success
		if (httpRequest.status === 200) {
			console.log(httpRequest.responseText);

			success();
			// let value = ajax.responseText;
			// let json = JSON.parse(value);

			// callback(json);
		}

		// failure
		else {
			failure();
			console.log('There was a problem with the request.');
		}
		}
	};
}

module.exports = xhr;
