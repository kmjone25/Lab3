var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        } else {
            res.writeHead(200); //ok
            res.end(data);
        }
    });
    /*
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('Hello, World!\n');*/

}).listen(8000, '127.0.0.1');