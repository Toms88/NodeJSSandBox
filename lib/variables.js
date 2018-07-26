
const log = (variable) => {
    console.log(variable);
}

const logError = (error) => {
    console.error(error);
}

const empty = (variable) => {
    var variableType = typeof variable;
    if ((variableType !== "undefined") && (variable != null)) {
        switch(variableType) {
            case 'function':
                return false;
                break;
            case 'object':
                if (Array.isArray(variable)) {
                    return (variable.length == 0);
                    break;
                } else if (variable.constructor == Number) {
                    return isNaN(variable);
                    break;
                }
                return (Object.keys(variable).length == 0);
                break;
            case 'number':
                return isNaN(variable);
                break;
            default:
                return (variable.length == 0);
        }
    }
    return true;
}

const isArray = variable => {
    return ((!empty(variable)) && (variable instanceof Array));
}

const isObject = variable => {
    return ((!empty(variable)) && (!isArray(variable)) && (variable instanceof Object || typeof variable === "object"));
}

const isString = variable => {
    return ((!empty(variable)) && (variable instanceof String || typeof variable === "string"));
}

const isNumber = variable => {
    return ((!empty(variable)) && (variable instanceof Number || typeof variable === "number"));
}

const isFunction = variable => {
    return ((!empty(variable)) && (variable instanceof Function || typeof variable === "function"));
}

const isBoolean = variable => {
    return ((!empty(variable)) && (variable instanceof Boolean || typeof variable === "boolean"));
}

const isEventEmitter = variable => {
    return ((!empty(variable)) && (variable instanceof EventEmitter));
}

const isMultipleOf = (n, d) => {
    return ((isNumber(n)) && ((n % d) == 0));
}

const forEachElementInArray = (array, func) => {
    return new Promise(res => {
        try {
            if (isArray(array) && isFunction(func)) {
                for (let idx in array) {
                    func(array[idx]);
                }
                res(true);
            }
            res(false);
        } catch(e) {
            logError(e.message);
            res(false);
        }
    });
}


const map = (array, func) => {
    let tempArray = new Array();
    let temp;
    if (isArray(array)) {
        for (let idx in array) {
            temp = func(array[idx]);
            if (!empty(temp)) {
                tempArray.push(temp);
            }
        }
        if (!empty(tempArray)) {
            return tempArray;
        }
        return null;
    }
    return array;
}

const stringToJSON = (stringifiedJSONObject) => {
    if (isString(stringifiedJSONObject)) {
        try {
            return JSON.parse(stringifiedJSONObject);
        } catch(e) {
            logError(e);
            return null;
        }
    }
    return null;
}

const JSONToString = (JSONObject) => {
    if (isObject(JSONObject)) {
        try {
            return JSON.stringify(JSONObject);
        } catch(e) {
            logError(e);
            return null;
        }
    }
    return null;
}


module.exports = function() {
    this.log = log;
    this.logError = logError;
    this.empty = empty;
    this.map = map;
    this.isArray = isArray;
    this.isObject = isObject;
    this.isString = isString;
    this.isNumber = isNumber;
    this.isMultipleOf = isMultipleOf;
    this.isFunction = isFunction;
    this.isBoolean = isBoolean;
    this.isEventEmitter = isEventEmitter;
    this.forEachElementInArray = forEachElementInArray;
    this.stringToJSON = stringToJSON;
    this.JSONToString = JSONToString;
    this.variableLibraryExists = true;
}