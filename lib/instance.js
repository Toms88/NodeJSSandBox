variablesLibraryExists = false;
routesLoaded = false;
routerLoaded = false;

//require global modules
var serverLibData = require('./server')(true); //load 'server' lib file with include of 'socket.io' module server
//module eventEmitter
const EventEmitter = require('events');
const http = require('http');
class Instance extends EventEmitter {
    constructor(serverData) {
        super();
        if (isObject(serverData)) {
            let dataKeysArray = Object.keys(serverData);
            for (let idx in dataKeysArray) {
                let attr = dataKeysArray[idx];
                this[attr] = serverData[attr];
            }
        } else {
            this.server = null;
            this.io = null;
            this.serverLoaded = false;
            this.IO_INCLUDED = false
        }
        this.clientEvents = new Array();
    }
    init(SERVER_PORT) {
        try {
            if (isNumber(SERVER_PORT) && this.serverLoaded) {
                this.server.listen(SERVER_PORT);
                log('SERVER LISTENING ON PORT : ' + SERVER_PORT);
                return;
            }
        } catch(e) {
            if (!empty(e)) {
                throw e
            }
        }
    }
    checkSocketEventInList(newEventName) {
        if ((isArray(this.clientEvents)) && (isString(newEventName))) {
            return (map(this.clientEvents, (el) => {
                if (isObject(el)) {
                    if (('eventName' in el) && (!empty(el.eventName)) && (el.eventName == newEventName)) {
                        return el;
                    }
                }
                return null;
            }) != null);
        }
        return false;
    }
    addClientEvents(evt, func) {
        var isAlreadyThere = false;
        if ((isString(evt)) && (isFunction(func))) {
            isAlreadyThere = this.checkSocketEventInList(evt);
            if (!isAlreadyThere) {
                this.clientEvents.push({
                    eventName: evt,
                    eventHandler: func
                });
            }
        }
    }
    initClient(client) {
        return new Promise(res => {
            try {
                if (isObject(client) && isArray(this.clientEvents)) {
                    forEachElementInArray(this.clientEvents, evt => {
                        client.on(evt.eventName, evt.eventHandler);
                    }).then(done => {
                        res(done);
                    });
                } else {
                    res(false);
                }
            } catch(e) {
                logError(e.message);
                res(false);
            }
        });
    }
    getServer() {
        if (!empty(this.server)) {
            return this.server;
        }
        return null;
    }
    getIOServer() {
        if (!empty(this.io)) {
            return this.io;
        }
        return null;
    }
    isServerLoaded() {
        return this.serverLoaded;
    }
    isIOIncluded() {
        return this.IO_INCLUDED;
    }
    setServer(server) {
        if ((!empty(server)) && (server instanceof http.Server)) {
            this.server = server;
            this.serverLoaded = true;
        } else if (empty(this.server)) {
            this.server = null;
            this.serverLoaded = false;
        }
    }
    setIO(io) {
        if ((!empty(io)) && (io instanceof http.Server)) {
            this.io = io;
            this.IO_INCLUDED = true;
        } else if (empty(this.io)) {
            this.io = null;
            this.IO_INCLUDED = false;
        }
    }
} 

module.exports = new Instance(serverLibData);