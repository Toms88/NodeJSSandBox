'use strict';


require('./lib/variables')();
require('./lib/server.js')();


//handling client connection through socket.io process
io.on('connection', client => {

});

server.listen(8080);