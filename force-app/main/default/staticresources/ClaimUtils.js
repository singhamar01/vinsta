(function (global, factory) {
    // UMD pattern to support ES modules, CommonJS, and global access
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        global.ClaimUtils = factory();
    }
}(this, function () {
    // Private namespace to avoid global pollution
    const ClaimUtils = {};

    // Evaluate all 17 criteria
    ClaimUtils.evaluateClaimCriteria = function(component, caseTransaction, casePolicySelections) {
        try {
            if (!component || !caseTransaction || !casePolicySelections) {
                throw new Error('Invalid input parameters');
            }
            const criteriaResults = ClaimUtils.runCriteriaChecks(caseTransaction, casePolicySelections);
            const fulfilledCount = criteriaResults.filter(result => result).length;
            const uiState = ClaimUtils.determineUIState(fulfilledCount);

            component.set("v.isCheckboxEnabled", uiState.isCheckboxEnabled);
            component.set("v.buttonColor", uiState.buttonColor);
        } catch (error) {
            console.error('ClaimUtils.evaluateClaimCriteria: ', error.message);
        }
    };

    // Modular criteria checking
    ClaimUtils.runCriteriaChecks = function(caseTransaction, casePolicySelections) {
        try {
            const criteria = [
                // Criterion 1: Check if CallerType__c on Case is 'Customer'
                () => caseTransaction && caseTransaction.CallerType__c === 'Customer',
                
                // Criterion 2: Check if ALL Case_Policy_Selection__c records have Is_Outpatient__c as true
                () => casePolicySelections && casePolicySelections.length > 0 && casePolicySelections.every(policy => policy.Is_Outpatient__c === true),
                
                // Criterion 3-17: Placeholder criteria (replace with actual logic)
                () => caseTransaction && caseTransaction.Amount__c > 0,
                () => casePolicySelections.length > 0,
                () => casePolicySelections.every(policy => policy.Is_Valid__c),
                // Placeholder for remaining 12 criteria
                () => true, // Add actual logic
                () => true,
                () => true,
                () => true,
                () => true,
                () => true,
                () => true,
                () => true,
                () => true,
                () => true,
                () => true,
                () => true
            ];

            // Execute all criteria and return results
            return criteria.map(criterion => criterion());
        } catch (error) {
            console.error('ClaimUtils.runCriteriaChecks: ', error.message);
            return [];
        }
    };

    // Determine UI state based on fulfilled criteria count
    ClaimUtils.determineUIState = function(fulfilledCount) {
        try {
            if (typeof fulfilledCount !== 'number' || fulfilledCount < 0) {
                throw new Error('Invalid fulfilledCount');
            }
            if (fulfilledCount === 17) {
                return { isCheckboxEnabled: true, buttonColor: 'green' };
            } else if (fulfilledCount >= 1 && fulfilledCount <= 15) {
                return { isCheckboxEnabled: false, buttonColor: 'yellow' };
            } else if (fulfilledCount === 1) {
                return { isCheckboxEnabled: false, buttonColor: 'red' };
            }
            return { isCheckboxEnabled: false, buttonColor: 'red' };
        } catch (error) {
            console.error('ClaimUtils.determineUIState: ', error.message);
            return { isCheckboxEnabled: false, buttonColor: 'red' };
        }
    };

    return ClaimUtils;
}));