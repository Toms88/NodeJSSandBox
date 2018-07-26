//get variables library if its not already loaded
if ((typeof variablesLibraryExists === "undefined") ||
    ((typeof variablesLibraryExists === "boolean") && !variablesLibraryExists)) {
    require('./variables')();
}

//get routes definitions
if ((typeof routesLoaded === "undefined") ||
    ((typeof routesLoaded === "boolean") && !routesLoaded)) {
    require('./routes')();
}

//get native required modules
const http = require('http');

//request handler for web server
const handleRequest = (req, res) => {
    if (isObject(routes)) {
        if (isFunction(routes[req.url])) {
            routes[req.url].apply(null, [req,res]);
        } else if (isFunction(routes['public'])) {
            routes['public'].apply(null, [req,res]);
        }
    }
}


module.exports = function() {
    this.server = http.createServer(handleRequest); //basic node web server
    this.io = require('socket.io')(this.server); //socket.io server
    this.serverLoaded = true;
}