//module eventEmitter
const EventEmitter = require('events');

let instance = new EventEmitter();

module.exports = instance;