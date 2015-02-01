/**
 * Created by steva on 1/22/15.
 */

var net = require('net');


var server = net.createServer(function(connectionListener) {
    console.log('connected');

    console.log(this.address());

    this.getConnections(function(err, count) {
        if (err) {
            console.log('Error getting connections');
        } else {
            console.log('Connections count: ' + count);
            connectionListener.write('connections to server : ' + count + ' \r\n');
        }
    });

    connectionListener.on('end', function() {
       console.log('disconnected');


    });

    connectionListener.write('vozdra \r\n');

    connectionListener.on('data', function(data) {
       console.log('message received : ' + data) ;
    });

    connectionListener.on('server error', function(err){
        console.log('error ' + err);
    });
});

server.on('error', function(err) {
   console.log('Server error: ' + err);
});

server.on('data', function(data){
   console.log(data.toString());
});

server.listen('8181', function() {
   console.log("I'm listening");
});