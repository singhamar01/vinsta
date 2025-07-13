public with sharing class TabConfigurationController {
    @AuraEnabled(cacheable=true)
    public static List<TabConfigWrapper> getTabConfigurations() {
        try {
            String userId = UserInfo.getUserId();
            List<TabConfiguration__c> tabConfigs = [
                SELECT Id, TabId__c, TabLabel__c, IsActive__c, ContentClass__c,
                       (SELECT Id, ComponentId__c, ComponentType__c FROM TabComponents__r)
                FROM TabConfiguration__c
                WHERE UserId__c = :userId
                WITH SECURITY_ENFORCED
            ];

            List<TabConfigWrapper> wrappers = new List<TabConfigWrapper>();
            for (TabConfiguration__c tab : tabConfigs) {
                TabConfigWrapper wrapper = new TabConfigWrapper();
                wrapper.tabId = tab.TabId__c;
                wrapper.label = tab.TabLabel__c;
                wrapper.active = tab.IsActive__c;
                wrapper.contentClass = tab.ContentClass__c;
                wrapper.components = new List<ComponentWrapper>();
                
                for (TabComponent__c comp : tab.TabComponents__r) {
                    ComponentWrapper compWrapper = new ComponentWrapper();
                    compWrapper.id = comp.ComponentId__c;
                    compWrapper.type = comp.ComponentType__c;
                    wrapper.components.add(compWrapper);
                }
                wrappers.add(wrapper);
            }
            return wrappers;
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving tab configurations: ' + e.getMessage());
        }
    }

    @AuraEnabled
    public static void saveTabConfigurations(List<TabConfigWrapper> tabConfigs) {
        try {
            String userId = UserInfo.getUserId();
            List<TabConfiguration__c> tabsToUpsert = new List<TabConfiguration__c>();
            List<TabComponent__c> componentsToUpsert = new List<TabComponent__c>();
            Set<String> tabIds = new Set<String>();

            // Collect existing tab IDs for the user
            for (TabConfiguration__c existingTab : [SELECT TabId__c FROM TabConfiguration__c WHERE UserId__c = :userId WITH SECURITY_ENFORCED]) {
                tabIds.add(existingTab.TabId__c);
            }

            // Prepare tab and component records
            for (TabConfigWrapper tab : tabConfigs) {
                TabConfiguration__c tabRecord = new TabConfiguration__c(
                    UserId__c = userId,
                    TabId__c = tab.tabId,
                    TabLabel__c = tab.label,
                    IsActive__c = tab.active,
                    ContentClass__c = tab.contentClass
                );
                if (tabIds.contains(tab.tabId)) {
                    tabRecord.Id = [SELECT Id FROM TabConfiguration__c WHERE TabId__c = :tab.tabId AND UserId__c = :userId WITH SECURITY_ENFORCED LIMIT 1].Id;
                }
                tabsToUpsert.add(tabRecord);

                for (ComponentWrapper comp : tab.components) {
                    TabComponent__c compRecord = new TabComponent__c(
                        ComponentId__c = comp.id,
                        ComponentType__c = comp.type
                    );
                    componentsToUpsert.add(compRecord);
                }
            }

            // Upsert tabs
            if (!tabsToUpsert.isEmpty() && Schema.sObjectType.TabConfiguration__c.isCreateable() && Schema.sObjectType.TabConfiguration__c.isUpdateable()) {
                upsert tabsToUpsert TabId__c;
            }

            // Link components to tabs and upsert
            Map<String, Id> tabIdToRecordId = new Map<String, Id>();
            for (TabConfiguration__c tab : [SELECT Id, TabId__c FROM TabConfiguration__c WHERE UserId__c = :userId WITH SECURITY_ENFORCED]) {
                tabIdToRecordId.put(tab.TabId__c, tab.Id);
            }

            for (TabConfigWrapper tab : tabConfigs) {
                for (ComponentWrapper comp : tab.components) {
                    componentsToUpsert.add(new TabComponent__c(
                        TabConfiguration__c = tabIdToRecordId.get(tab.tabId),
                        ComponentId__c = comp.id,
                        ComponentType__c = comp.type
                    ));
                }
            }

            if (!componentsToUpsert.isEmpty() && Schema.sObjectType.TabComponent__c.isCreateable() && Schema.sObjectType.TabComponent__c.isUpdateable()) {
                upsert componentsToUpsert ComponentId__c;
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error saving tab configurations: ' + e.getMessage());
        }
    } 

    // Wrapper classes for serialization
    public class TabConfigWrapper {
        @AuraEnabled public String tabId;
        @AuraEnabled public String label;
        @AuraEnabled public Boolean active;
        @AuraEnabled public String contentClass;
        @AuraEnabled public List<ComponentWrapper> components;
    }

    public class ComponentWrapper {
        @AuraEnabled public String id;
        @AuraEnabled public String type;
    }
}