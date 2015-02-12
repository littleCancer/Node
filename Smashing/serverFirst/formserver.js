/**
 * Created by steva on 2/8/15.
 */


var http = require("http");
var qs = require("querystring");

function handleReq(req, res) {

    if (req.url == '/') {
        res.writeHead(200, {'Content-Type' : 'text/html'});

        var form = [
            '<form method="POST" action="/url">',
            '<h1>My form</h1>',
            '<fieldset>',
            '<label> Personal Information </label>',
            '<p>What is your name ?</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>'
        ].join('');

        res.end(form);
    } else if (req.url == '/url' && req.method == "POST") {
        var body = '';
        req.on('data', function(chunk){
           body += chunk;
        });

        req.on('end', function() {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<p>Your name is: <b>' + qs.parse(body).name + '</b>');
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }



}

var server = http.createServer(handleReq).listen(3000);