if ((typeof variablesLibraryExists === "undefined") ||
    ((typeof variablesLibraryExists === "boolean") && !variablesLibraryExists)) {
    require('../lib/variables')();
}

module.exports = []