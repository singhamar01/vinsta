public with sharing class ApexModuleController {

    //Method to retrieve 10 recently modified Account records
    @AuraEnabled(cacheable=true)
    public static List<Account> getRecentAccounts() {
        // Query to fetch the 10 most recently modified Account records
        return [SELECT Id, Name, Phone 
                FROM Account 
                ORDER BY LastModifiedDate DESC 
                LIMIT 12];
    }
    //Method to retrieve 10 recently modified Contact records
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRecentContacts() {
        // Query to fetch the 10 most recently modified Contact records
        return [SELECT Id, FirstName, LastName, Phone 
                FROM Contact 
                ORDER BY LastModifiedDate DESC 
                LIMIT 12];
    }
    //method to retrieve from Person__c Custom Object
    @AuraEnabled(cacheable=true)
    public static List<Person__c> getAllPersons() {
        // Query to fetch all Person__c records
        return [SELECT Id, Name, Date_of_Birth__c, Gender__c, Marital_Status__c
                FROM Person__c 
                ORDER BY Order__c ASC ];
    }
}