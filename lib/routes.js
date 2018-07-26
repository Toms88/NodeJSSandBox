if ((typeof routerLoaded === "undefined") ||
    ((typeof routerLoaded === "boolean") && !routerLoaded)) {
    require('./router')();
}

//node modules import
const fs = require('fs');
const mime = require('mime');

//default 404 result page route
registerRoute(routes, '404', (req, res) => {
    res.statusCode = 404;
    res.statusMessage = 'Route is not set.';
    res.end();
});

//public file route
registerRoute(routes, 'public', (req, res) => {
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
registerRoute(routes, '/', (req, res) => {
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

module.exports = function() {
    this.routesLoaded = true;
}