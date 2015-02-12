/**
 * Created by steva on 2/12/15.
 */

var connect = require('connect');
var serveStatic = require('serve-static');

console.log(' **** ' + connect);

var app = connect();

//server.use(connect.static(__dirname + '/website'));
//server.use(connect.static(__dirname + '/website'));

app.use(function(req, res, next) {
    console.log(req.url);
    next();
});
app.use(serveStatic(__dirname));

app.listen(3000);