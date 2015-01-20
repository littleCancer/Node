/**
 * Created by steva on 1/20/15.
 */

var http = require("http");
var url = require("url");

function start(route, handle) {

    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received");

        route(handle, pathname, response);

        response.writeHead(200, {"Content-Type" : "text/plain"});
//        response.write("Hello Node");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}

exports.start = start;