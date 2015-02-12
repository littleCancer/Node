/**
 * Created by steva on 2/5/15.
 */


var net = require('net');

var client = net.connect(6667,'irc.freenode,net');

function onConnect() {
    client.write('NICK mynick\r\n');
    client.write('USER mynick 0 * :realname\r\n');
    client.write('JOIN #node.js\r\n');
}

client.setEncoding('utf-8');