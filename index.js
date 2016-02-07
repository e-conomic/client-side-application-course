var http = require('http');
var url = require('url');
var send = require('send');

var path = require('path');
var fs = require('fs');
var format = require('util').format;

var app = http.createServer(function(req, res){
	function error(err) {
		res.statusCode = err.status || 500;
		res.end(err.message);
	}

	function list(dirname) {
		console.log('listing %s', dirname);
		fs.readdir(path.join(__dirname, dirname), (err, data) => {
			if (err || data.length < 1) {
				res.end('no content');
				return;
			}

			var elements = data.filter(d => d.indexOf('.') != 0).map(d => {
				return format('<li><a href="%s">%s</a></li>', path.join(dirname, d), d);
			})

			elements.unshift('<ul>');
			elements.push('</ul>');

			res.setHeader('Content-Type', 'text/html');
			res.end(elements.reduce((out, e) => out + e));
		})
	}

	send(req, url.parse(req.url).pathname, {root: '.', index: false})
	.on('error', error)
	.on('directory', function() {
		list(url.parse(req.url).pathname);
	})
	.pipe(res);
}).listen(process.env.port || 8080);
