/**
 * Created by steva on 1/20/15.
 */

var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response, postData) {
    console.log("Request handler 'start' was called ");

    /*exec("ls -lah", function(error, stdout, stderr) {

        var execComplete = "exec completed " + stdout;
        console.log(execComplete);

        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write(execComplete);
        response.end();

    }); */

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html;' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Submit text" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();

}

function upload(response, postData) {
    console.log("Request handler 'upload' was called ");

    response.writeHead(200, {"Content-Type" : "text/plain"});
    var qs = querystring.parse(postData).text;
    response.write("Just received : " + qs);
    response.end();
}

exports.start = start;

exports.upload = upload;