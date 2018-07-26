if ((typeof variablesLibraryExists === "undefined") ||
    ((typeof variablesLibraryExists === "boolean") && !variablesLibraryExists)) {
    require('./variables')();
}

const registerRoute = (routesArray, path, handler) => {
    if ((isObject(routesArray)) && (isString(path)) && (isFunction(handler))) {
        routesArray[path] = handler;
    }
    return routesArray;
};

module.exports = function() {
    this.routes = {};
    this.registerRoute = registerRoute;
    this.routerLoaded = true;
}