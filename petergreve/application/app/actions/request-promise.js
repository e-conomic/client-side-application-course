var superagent = require("superagent");

let request = {

	get: (url) => {
		return new Promise((resolve, reject) => {
		    superagent.get(url)
	            .set('Accept', 'application/json')
	            .end((err, response) => {
	                    if (err) {
	                        reject(err);
	                    } else {
	                    	resolve(response.body)
	                    }
	                });
		})
	}
}

export default request