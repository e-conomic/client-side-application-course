let xhr = (url, success, failure) => {
	let ajax = new XMLHttpRequest();

	ajax.open('GET', url);
	ajax.setRequestHeader('Content-Type', 'application/json');
	ajax.send(null);
	ajax.onreadystatechange = () => {

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
