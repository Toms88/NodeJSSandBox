'use strict';

var ioClientEvents = require('./io/io.client.events');
var serverInstance = require('./lib/instance.js');


//handling client connection through socket.io process
if (serverInstance.IO_INCLUDED) {
    if (isArray(ioClientEvents)) {
        ioClientEvents.map((el) => {
            if (isObject(el) && ('eventName' in el) && ('eventHandler' in el) &&
                isString(el.eventName) && isFunction(el.eventHandler)) {
                serverInstance.addClientEvents(el.eventName, el.eventHandler);
            }
        });
    }
    serverInstance.io.on('connection', client => {
        serverInstance.initClient(client).then(isInitialized => {
            if (isBoolean(isInitialized) && isInitialized) {
                log('client initialized');
            }
        });
    });
}

serverInstance.init(8080);