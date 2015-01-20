/**
 * Created by steva on 1/20/15.
 */

var exec = require("child_process").exec;

function start(response) {
    console.log("Request handler 'start' was called ");

    exec("ls -lah", function(error, stdout, stderr) {

        var execComplete = "exec completed " + stdout;
        console.log(execComplete);

        /*response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write(execComplete);
        response.end(); */

        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write("Exec upload");
        response.end();
    });

}

function upload(response) {
    console.log("Request handler 'upload' was called ");

    response.writeHead(200, {"Content-Type" : "text/plain"});
    response.write("Exec upload");
    response.end();
}

exports.start = start;

exports.upload = upload;