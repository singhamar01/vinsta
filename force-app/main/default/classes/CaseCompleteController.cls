public with sharing class CaseCompleteController {
    
    @AuraEnabled
    public static String completeCase(Id caseId) {
        try {
            // Query Case and CPTs
            Case currentCase = [SELECT Id, Status, CaseNumber, Subject, Description FROM Case WHERE Id = :caseId];
            List<Case_Policy_Selection__c> allCpts = [SELECT Id, Name, Is_CSS__c /* add other fields */ FROM Case_Policy_Selection__c WHERE Case__c = :caseId];
            
            // Update Case Status
            currentCase.Status = 'Closed';
            update currentCase;
            
            // Split CPTs into separate lists
            List<Case_Policy_Selection__c> nonCssCpts = new List<Case_Policy_Selection__c>();
            List<Case_Policy_Selection__c> cssCpts = new List<Case_Policy_Selection__c>();
            for (Case_Policy_Selection__c cpt : allCpts) {
                if (cpt.Is_CSS__c) {
                    cssCpts.add(cpt);
                } else {
                    nonCssCpts.add(cpt);
                }
            }
            
            // Determine Pattern
            Boolean hasNonCss = !nonCssCpts.isEmpty();
            Boolean hasCss = !cssCpts.isEmpty();
            Integer pattern = (hasNonCss && hasCss) ? 1 : (!hasCss ? 2 : 3);
            //String targetSystem = (hasNonCss && hasCss) ? 'Mix' : (!hasCss ? 'TxDB' : 'CSS');
            
            // Build and Send Based on Pattern
            if (pattern == 1 || pattern == 2) {
                // Build base JSON for wftapi1 with non-CSS CPTs
                Map<String, Object> baseJson = buildJson(currentCase, nonCssCpts);
                String baseJsonString = JSON.serialize(baseJson);
                HttpResponse res1 = sendToApi('WFTAPI1_Cred', '/endpoint', baseJsonString);
                if (pattern == 1 && res1.getStatusCode() != 200) {
                    throw new AuraHandledException('wftapi1 failed: ' + res1.getBody());
                }
            }
            
            if (pattern == 1 || pattern == 3) {
                // Build enhanced JSON for wftapi2 with CSS CPTs
                Map<String, Object> enhancedJson = buildJson(currentCase, cssCpts);
                enhancedJson.put('cssMetadata', new Map<String, Object>{ 'systemType' => 'CSS', 'additionalInfo' => 'Extra for CSS' });
                String enhancedJsonString = JSON.serialize(enhancedJson);
                sendToApi('WFTAPI2_Cred', '/endpoint', enhancedJsonString); // Simplified: No inner if needed
            }
            
            return 'Case completed and data sent successfully.';
        } catch (Exception e) {
            // Log error (e.g., insert custom log record)
            throw new AuraHandledException('Error: ' + e.getMessage());
        }
    }
    
    private static Map<String, Object> buildJson(Case c, List<Case_Policy_Selection__c> cpts) {
        Map<String, Object> jsonMap = new Map<String, Object>{
            'case' => new Map<String, Object>{
                'id' => c.Id,
                'caseNumber' => c.CaseNumber,
                'subject' => c.Subject,
                'description' => c.Description
            },
            'cpts' => new List<Object>()
        };
        for (Case_Policy_Selection__c cpt : cpts) {
            ((List<Object>) jsonMap.get('cpts')).add(new Map<String, Object>{
                'id' => cpt.Id,
                'name' => cpt.Name,
                'isCss' => cpt.Is_CSS__c
            });
        }
        return jsonMap;
    }
    
    private static HttpResponse sendToApi(String namedCred, String path, String body) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:' + namedCred + path);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setBody(body);
        HttpResponse res = http.send(req);
        // Log response if needed
        if (res.getStatusCode() != 200) {
            throw new CalloutException('API failed: ' + res.getStatus());
        }
        return res;
    }
}