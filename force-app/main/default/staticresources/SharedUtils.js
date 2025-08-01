(function (global, factory) {
    // UMD pattern to support ES modules, CommonJS, and global access
    if (typeof define === 'function' && define.amd) {//Checks if the environment supports AMD (Asynchronous Module Definition)
        define(factory);
    } else if (typeof exports === 'object') {//commonly used in Node.js Salesforce’s client-side JavaScript (in LWC and Aura) runs in a browser environment, not Node.js.
        module.exports = factory();
    } else { //Fallback for environments without AMD or CommonJS, such as plain browser scripts or global scope access.
        global.SharedUtils = factory(); //Attaches the SharedUtils object to window.SharedUtils.
    }
}(this, function () {
    // Private namespace to avoid global pollution
    const SharedUtils = {};

    // Utility function: Format date to MM/DD/YYYY
    SharedUtils.formatDate = function (date) {
        try {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }
            return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        } catch (error) {
            console.error('SharedUtils.formatDate: ', error.message);
            return null;
        }
    };

    // Utility function: Validate email
    SharedUtils.isValidEmail = function (email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Utility function: Custom logger
    SharedUtils.log = function (message, level = 'info') {
        const levels = ['info', 'warn', 'error'];
        if (!levels.includes(level)) {
            level = 'info';
        }
        console[level](`[SharedUtils] ${message}`);
    };

    return SharedUtils;
}));