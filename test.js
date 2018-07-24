'use strict';

require('./lib/variables')();
require('./lib/io.client.events')();

log(checkSocketEventInList(clientEvents, 'testkk'));

addClientEvents('test', () => {
    log('prout');
});

addClientEvents('test2', () => {
    log('prout2');
});

log(clientEvents);