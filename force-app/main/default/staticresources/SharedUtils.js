(function (global, factory) {
    // UMD pattern to support ES modules, CommonJS, and global access
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        global.SharedUtils = factory();
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