/**
 * Created by steva on 1/20/15.
 */

var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs");
var formidable = require("formidable");

function start(response, postData) {
    console.log("Request handler 'start' was called ");

   /* exec("ls -lah", function(error, stdout, stderr) {

        var execComplete = "exec completed " + stdout;
        console.log(execComplete);

        response.writeHead(200, {"Content-Type" : "text/plain"});
        response.write(execComplete);
        response.end();

    }); */

    /*var body = '<html>' +
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
        '</html>'; */

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html;' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple"/>' +
        '<input type="submit" value="Upload file">' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(body);
    response.end();

}

function upload(response, request) {
    console.log("Request handler 'upload' was called ");

    console.log("parsing image");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("parsing done " + files.upload)
        fs.rename(files.upload.path, "tmp/testica.png", function(error) {
            if (error) {
                fs.unlink("tmp/testica.png");
                fs.rename(files.upload.path, "/tmp/testica.png");
            }
        });

        response.writeHead("200", {"Content-Type":"text/plain"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });


    /*response.writeHead(200, {"Content-Type" : "text/plain"});
    var qs = querystring.parse(postData).text;
    response.write("you have sent the text : " + qs);
    response.end(); */
}

function show (response, postData) {
    console.log("Request ' show ' handler was called");
    fs.readFile("tmp/testica.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + " errore \n");
            response.end();
        } else {
            response.writeHead("200", {"Content-Type":"text/plain"});
            response.write(file, "binary");
            response.end();
        }
    });


}

exports.start = start;
exports.show = show;
exports.upload = upload;