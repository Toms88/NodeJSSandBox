if ((typeof routerLoaded === "undefined") ||
    ((typeof routerLoaded === "boolean") && !routerLoaded)) {
    require('./router')();
}

//node modules import
const fs = require('fs');
const mime = require('mime');

let routesData = {
    routes: {},
    routesLoaded: false
};

//default 404 result page route
routes = registerRoute(routes, '404', (req, res) => {
    res.statusCode = 404;
    res.statusMessage = 'Route is not set.';
    res.end();
});

//public file route
routes = registerRoute(routes, 'public', (req, res) => {
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
routes = registerRoute(routes, '/', (req, res) => {
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
    console.log(routes);
    routesData.routes = routes
    routesData.routesLoaded = true;
    return routesData;
}