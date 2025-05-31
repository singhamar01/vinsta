public with sharing class ApexModuleController {

    //Method to retrieve 10 recently modified Account records
    @AuraEnabled(cacheable=true)
    public static List<Account> getRecentAccounts() {
        // Query to fetch the 10 most recently modified Account records
        return [SELECT Id, Name 
                FROM Account 
                ORDER BY LastModifiedDate DESC 
                LIMIT 10];
    }
    //Method to retrieve 10 recently modified Contact records
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRecentContacts() {
        // Query to fetch the 10 most recently modified Contact records
        return [SELECT Id, FirstName, LastName 
                FROM Contact 
                ORDER BY LastModifiedDate DESC 
                LIMIT 10];
    }
}