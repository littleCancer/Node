/**
 * Created by steva on 1/20/15.
 */

var server = require("./server");
var router = require("./router");

server.start(router.route);