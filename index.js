var http = require('http');
var url = require('url');
var send = require('send');

var path = require('path');
var fs = require('fs');
var format = require('util').format;

require('node-jsx').install({harmony: true});

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Page = require('./page.jsx');

function renderPage(props) {
	return ReactDOMServer.renderToStaticMarkup(
		React.createElement(Page, props)
	);
}

var app = http.createServer(function(req, res){
	function error(err) {
		res.statusCode = err.status || 500;
		res.end(err.message);
	}

	function list(dirname) {
		console.log('listing %s', dirname);
		fs.readdir(path.join(__dirname, dirname), function(err, data) {
			if (err || data.length < 1) {
				res.end('no content');
				return;
			}

			var elements = data.filter(function(d) { return d.indexOf('.') != 0 })
			.map(function(d) {
				return {
					name: d,
					path: path.join(dirname, d)
				};
			});

			res.setHeader('Content-Type', 'text/html');
			res.write('<!DOCTYPE html>');
			res.end(renderPage({
				url: dirname,
				items: elements
			}));
		})
	}

	send(req, url.parse(req.url).pathname, {root: '.', index: false})
	.on('error', error)
	.on('directory', function() {
		list(url.parse(req.url).pathname);
	})
	.pipe(res);
}).listen(process.env.PORT || 8080);
