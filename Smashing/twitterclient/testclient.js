/**
 * Created by steva on 2/8/15.
 */

var http = require("http");
var qs = require("querystring");

function handleResponse(res) {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function() {
        console.log('\n We got: \033[96m' + body + '\033[39m\n')
    });
}

function handleRes2(res) {
    res.setEncoding('utf8');
    res.on('end'm function{
        console.log('\n \033[90m request complete! \033[39m');
        process.stdout.write(\n your name: );
    });
}

function send(theName) {
    http.request({
        host:'127.0.0.1',
        port: 3000,
        method:'POST'
    }, handleRes2).end(qs.stringify({name:theName}));
}

http.request({
    host: '127.0.0.1',
    port: 3000,
    url: "/",
    method: 'GET'
}, handleResponse).end();