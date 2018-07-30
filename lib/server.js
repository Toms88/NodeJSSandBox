//get variables library if its not already loaded
if ((typeof variablesLibraryExists === "undefined") ||
    ((typeof variablesLibraryExists === "boolean") && !variablesLibraryExists)) {
    require('./variables')();
}

//get routes definitions
if ((typeof routesLoaded === "undefined") ||
    ((typeof routesLoaded === "boolean") && !routesLoaded)) {
    var routesData = require('./routes')();
}

//get native required modules
const http = require('http');


//request handler for web server
const handleRequest = (req, res) => {
    log(routesData);
    if (isObject(routesData.routes)) {
        if (isFunction(routesData.routes[req.url])) {
            routesData.routes[req.url].apply(null, [req,res]);
        } else if (isFunction(routes['public'])) {
            routesData.routes['public'].apply(null, [req,res]);
        }
    }
}


module.exports = function(includeIO) {
    if (typeof includeIO === "undefined") {
        includeIO = false;
    }
    let instanceServer = http.createServer(handleRequest);
    return ({
        server: instanceServer, //basic node web server
        io: (includeIO) ? require('socket.io')(instanceServer) : null,
        serverLoaded: true,
        IO_INCLUDED: includeIO,
        routesdata: routesData
    });
}