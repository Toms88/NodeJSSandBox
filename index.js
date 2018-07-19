'use strict';
//node modules import
const http = require('http');
const fs = require('fs');
const mime = require('mime');

//needed variables for creating server
let io, server, routes = {};

//registerRoute function for handling new url
const registerRoute = (path, handler) => {
    routes[path] = handler;
};

const empty = (variable) => {
    var variableType = typeof variable;
    if ((variableType !== "undefined") && (variable != null)) {
        switch(variableType) {
            case 'function':
                return false;
                break;
            case 'object':
                if (Array.isArray(variable)) {
                    return (variable.length == 0);
                }
                return (Object.keys(obj).length == 0);
                break;
            default:
                return (variable.length == 0);
        }
    }
    return true;
}

//default 404 result page route
registerRoute('404', (req, res) => {
    res.statusCode = 404;
    res.statusMessage = 'Route is not set.';
    res.end();
});

//public file route
registerRoute('public', (req, res) => {
    res.setHeader('Content-Type', mime.getType(req.url));
    if (fs.existsSync(__dirname + '/public' + req.url)) {
        res.write(fs.readFileSync(__dirname + '/public' + req.url));
        res.statusCode = 200;
    } else {
        res.statusCode = 404;
    }
    res.end();
});

//homepage route
registerRoute('/', (req, res) => {
    try {
        res.setHeader('Content-Type', 'text/html');
        res.write(fs.readFileSync(__dirname + '/index.html'));
        res.statusCode = 200;
        res.end();
    } catch(e) {
        res.statusCode = 500;
        res.statusMessage = "server error";
        res.end();
    }
});

//creating http server
server = http.createServer(function(req, res) {
    if (!empty(routes[req.url])) {
        routes[req.url].apply(null, [req,res]);
    } else {
        routes['public'].apply(null, [req,res]);
    }
});

//creating socket.io server
io = require('socket.io')(server);

//handling client connection through socket.io process
io.on('connection', client => {

});

server.listen(8080);