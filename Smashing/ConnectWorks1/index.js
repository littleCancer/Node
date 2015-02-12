/**
 * Created by steva on 2/12/15.
 */

var http = require('http');
var fs = require('fs');

function handleResponse(req, res) {

    if (req.method == 'GET' && req.url.substr(0, 7) == '/images' && req.url.substr(-4) == '.jpg') {
        fs.stat(__dirname + req.url, function (err, stat) {
             if (err || !stat.isFile()) {
                 res.writeHead(404);
                 res.end('Nema be');
                 return;
             }
            serve(__dirname + req.url, 'application/jpg');
        });
    } else if (req.method == 'GET' && req.url == '/') {
        serve(__dirname + '/index.html', 'text/html');
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }

    function serve(path, type) {
        res.writeHead(200, {'Content-Type:' : type});
        fs.createReadStream(path).pipe(res);
    }

}

var server = http.createServer(handleResponse);

server.listen(3000);

