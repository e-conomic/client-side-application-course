let xhr = (method, url, data, success, failure) => {
	let ajax = new XMLHttpRequest();

	ajax.open(method, url);
	ajax.setRequestHeader('Content-Type', 'application/json');
	ajax.send(null);
	ajax.onreadystatechange = () => {

		// when they are both 4, and it's ready
		if (ajax.readyState === XMLHttpRequest.DONE) {
			if (ajax.status === 200) {
				success(ajax.responseText);
			}
			else {
				failure();
			}
		}
	};
}

module.exports = xhr;
