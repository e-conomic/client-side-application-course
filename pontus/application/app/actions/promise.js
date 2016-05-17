var XMLHttpRequest = require("xhr2");
// var xhr = new XMLHttpRequest();

let get = (url) => { 

	return new Promise( (resolve, reject) => { 

		let req = new XMLHttpRequest();
		req.open('GET', url);
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(null);

		req.onreadystatechange = () => {
			if (req.readyState === XMLHttpRequest.DONE) {
				if (req.status === 200) {
					resolve(req.responseText);
				}
				else { 
					// reject(error("It broke"));
				}
			}
		}
	});
}

module.exports = get;
