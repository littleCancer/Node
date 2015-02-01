/**
 * Created by steva on 1/23/15.
 */

var net = require('net');
//var Person = require('./Person');
var personPevaj = require('./Person');

var connection = net.createConnection({port: 8181, host:'127.0.0.1'},
    function() {
      console.log('connection sucessful');
      this.write('hello servere');
});

connection.on('data', function(data) {
   console.log('connection data ' + data.toString());
});


connection.on('error', function(err){
    console.log('socket on error ' + err);
});

connection.on('end', function(){
    console.log('socket ended');
});

/*var john = new Person('John');

john.talk();

Person('a dva'); */

personPevaj.pevaj('dda da da da');
