
if ((empty(variableLibraryExists)) || (!variableLibraryExists)) {
    require('./variables')();
}

let clientEvents = new Array();

const checkSocketEventInList = (clientEvents, newEventName) => {
    if ((isArray(clientEvents)) && (isString(newEventName))) {
        return (map(clientEvents, (el) => {
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

const addClientEvents = (evt, func) => {
    var isAlreadyThere = false;
    if ((isString(evt)) && (isFunction(func))) {
        isAlreadyThere = checkSocketEventInList(clientEvents, evt);
        if (!isAlreadyThere) {
            clientEvents.push({
                eventName: evt,
                eventHandler: func
            });
        }
    }
}

const initClient = (io, client) => {
    if (isObject(client) && (!empty(clientEvents))) {
        forEachElementInArray(clientEvents, evt => {
            client.on(evt.eventName, evt.eventHandler);
        });
        /*.then(() => {
            Send the initializing confirmation event to the client
        });*/
    }
}

module.exports = function() {
    this.clientEvents = clientEvents;
    this.checkSocketEventInList = checkSocketEventInList;
    this.addClientEvents = addClientEvents;
}