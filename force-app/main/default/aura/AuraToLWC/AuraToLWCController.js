({
    callLwcFunction : function(component, event, helper) {
        console.log("Calling LWC function from Aura controller");
        helper.callLwcFunction(component, event);
    }
})