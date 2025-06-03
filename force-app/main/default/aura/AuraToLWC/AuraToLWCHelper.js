({
    callLwcFunction : function(component, event) {
        console.log("Calling LWC function from Aura helper");
        var lwcCmp = component.find("lwcCmp");
        console.log("LWC component found: ", lwcCmp);
        lwcCmp.callGetAllPersons()
            .then(function(result) {
                console.log("LWC method called successfully: " + JSON.stringify(result));                
            })
            .catch(function(error) {
                console.error("Error calling LWC method: " + error);
                component.set("v.lwcResult", "Error: " + error);
            });
    }
})