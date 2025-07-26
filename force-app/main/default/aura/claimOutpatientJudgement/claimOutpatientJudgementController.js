({
    doInit: function(component, event, helper) {
        // Fetch records and evaluate criteria
        helper.fetchRecords(component)
            .then($A.getCallback(function() {
                helper.evaluateClaimCriteria(component);
            }))
            .catch($A.getCallback(function(error) {
                console.error('Error fetching records: ', error);
            }));
    },

    handleProcessClaim: function(component, event, helper) {
        // Handle button click action
        if (component.get("v.isCheckboxEnabled")) {
            // Proceed with claim processing logic
            helper.processClaim(component);
        } else {
            // Show error or notification
            helper.showToast('Error', 'Claim cannot be processed. Not all criteria met.', 'error');
        }
    }
})