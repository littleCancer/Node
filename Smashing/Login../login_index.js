/**
 * Created by steva on 2/16/15.
 */


var connect = require('connect');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var usersMod = require('./userss');
var sessionStore = require('connect-session-store');
var FileSessionStore = require('connect-session-file');

var users = {};

console.log(' ** ' + usersMod);

var user1 =  usersMod.create('Pera', 'Peraf');
users['Pera'] = user1;
var user2 =  new usersMod.user('Djoka', 'pljeska');
users['Djoka'] = user2;

function handleLoggedIn(req, res, next) {
    console.log('parsing logged in');
    if ('/' == req.url && req.session.logged_in) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Welcome back, <b> ' + req.session.name + '</b>' +
        '<a href = "/logout">Logout</a>');
    } else {
        next();
    }
}

function handleNotLoggedIn(req, res, next) {
    console.log('parsing logged out');
    if ('/' == req.url && 'GET' == req.method) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end([
            '<form action="/login" method="POST">',
            '<fieldset>',
            '<legend> Please log in</legend>',
            '<p> User: <input type="text" name="user"></p>',
            '<p> Password: <input type="password" name="password"></p>',
            '<button>Submit</button>',
            '</fieldset>',
            '<form>'
        ].join(''));
    } else {
        next();
    }
}

function handleLogin(req, res, next) {
    console.log('parsing login');
    if ('/login' == req.url && "POST" == req.method) {
        res.writeHead(200, {"Content-Type": "text/html"});
        if (!users[req.body.user] || req.body.password != users[req.body.user].password) {
            res.end('Bad username/password');
        } else {
            req.session.logged_in = true;
            req.session.name = users[req.body.user].username
            res.end('Autheticated');
        }

    } else {
        next();
    }
}

function handleLogout(req, res, next) {
    console.log('parsing logging out');
    if ('/logout' == req.url) {
        req.session.logged_in = false;
        res.writeHead(200);
        res.end('Logged out!');
    } else {
        next();
    }
}

function corsokak(req, res, next) {
    console.log('parsing corsokak');
    console.log('usres ' + users['Pera']);
    res.end('corsokak');
}

/*var app = connect(
    logger('dev') ,
    bodyParser,
    cookie,
    session({secret: 'grande secret'}),
    handleLoggedIn,
    handleNotLoggedIn,
    handleLogin,
    handleLogout,
    corsokak
); */

var app = connect();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(cookie());

var options = {
    storeType: 'file',
    storeOptions: {
        path:'.',
        useAsync:true,
        reapInterval: 5000,
        maxAge: 10000
    }
};

app.use(session({secret: 'grande secret', resave:false, 'saveUninitialized':false, store:new FileSessionStore({path:'.', printDebug:true, useAsync:true})}));
app.use(handleLoggedIn);
app.use(handleNotLoggedIn);
app.use(handleLogin);
app.use(handleLogout);
app.use(corsokak);

app.listen(3000);

