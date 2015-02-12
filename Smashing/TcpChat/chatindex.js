/**
 * Created by steva on 2/5/15.
 */

var net = require('net');

var count = 0;

var users = {};

function handleConn (conn) {
    console.log('\033[90m new connection! \033[39m');

    var nickname = null;

    conn.write(
            '\n > welcome to \033[92mnode-chat\033[39m!'
        +   '\n > ' + count + ' other people connected at this time.'
        +   '\n > please write your name and press enter: '
    );

    conn.on('close', function() {
       count--;
        delete  users[nickname];
        broadcast('\033[90m> ' + nickname + ' left the room \033[39m\n', false);
    });

    function handleData(data) {
        console.log('--' + data)
        // data = data.replace('\r\n', '');



        if (!nickname) {
            if (users[data]) {
                conn.write('\033[93m> nickname already in use. try again: \033[39m ');
                return;
            } else {
                nickname = data;
                users[nickname] = conn;

                broadcast('\033[90m> ' + nickname + ' joined the room \033[39m\n', false);

            }
        } else {
            for (var i in users) {

                broadcast('\033[96m> ' + nickname + ' :\033[39m ' + '\n', false);

            }
        }
    }

    function broadcast(msg, exceptMySelf) {
        for (var i in users) {
            if (!exceptMySelf && i != nickname) {
                users[i].write(msg);
            }
        }
    }

    conn.on('data', handleData);

    count++;
}

function listen() {
    console.log('\033[96m server listening on *:3000 \033[39m');
}

var  server = net.createServer(handleConn);

server.listen(3000, listen);