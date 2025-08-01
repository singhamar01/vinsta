// myAuraComponentController.js
({
    handleScriptsLoaded: function (component, event, helper) {
        // SharedUtils is available globally
        console.log(SharedUtils.formatDate(new Date()));
        console.log(SharedUtils.isValidEmail('test@example.com'));
        SharedUtils.log('Aura component loaded', 'info');
    }
})