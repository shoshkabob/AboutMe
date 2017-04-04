var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
	if (req.url === "/" || req.url === "/favicon.ico" || req.url === "/index.html") {
		fs.readFile("index.html", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				var page = data.toString();
				
				fs.readFile("main.html", function (err, data) {
					if (err) {
						console.log(err);
					}
					else {
						var content = data.toString();
						page = page.replace("[replace]", content);
						res.end(page);
					}
				});
			}
		});
	}
	else if (req.url === "/style.css") {
		fs.readFile("style.css", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				res.end(data);
			}
		});
	}
	else {
		var path = req.url;
		path = path.slice(1);
		path = path.toString();
		var fileName = path.toLowerCase() + ".html";

		fs.readFile("index.html", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				var page = data.toString();
				
				fs.readFile(fileName, function (err, data) {
					if (err) {
						console.log(err);
					}
					else {
						var content = data.toString();
						page = page.replace("[replace]", content);
						res.end(page);
					}
				});
			}
		});
	}
});

server.listen(8080);