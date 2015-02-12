/**
 * Created by steva on 1/25/15.
 */

var http = require("http");

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello world</h1>');
}).listen(3000);

//require("http").createServer(function (req, res) {
//    res.writeHead(200, { ‘Content-Type’: ‘text/html’ });
//    res.end(‘<h1>Hello world</h1>’);
//}).listen(3000);