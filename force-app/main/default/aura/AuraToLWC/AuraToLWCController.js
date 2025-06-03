({
    callLwcFunction : function(component, event, helper) {
        var lwcCmp = component.find("lwcCmp");
        new Promise((resolve, reject) => {
            lwcCmp.getRecentAccounts()
            .then(result => resolve(result))
            .catch(error => reject(error));
        })
        .then(result => {
            // handle success
            console.log('Accounts:', result);
        })
        .catch(error => {
            // handle error
            console.error('Error:', error);
        });
    }
})