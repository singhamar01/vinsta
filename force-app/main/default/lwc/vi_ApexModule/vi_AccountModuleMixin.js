// A simple Mixin method
// adds the `getAccounts()` method to classes that implement this mixin
import getRecentAccounts from '@salesforce/apex/ApexModuleController.getRecentAccounts';

export const AccountModuleMixin = (BaseClass) =>
  class extends BaseClass {
    getAccounts() {
        console.log("getAccounts called");
        return {
            accountName:"Demo Account",
            accountId: "001xx000003DGXAAA4",
        }
    }
    // Call an apex method to get recent accounts
    async getRecentAccounts() {
        console.log("getRecentAccounts called");
        try {
            const accounts = await getRecentAccounts();
            return accounts;
        } catch (error) {
            console.error('Error fetching recent accounts:', error);
            throw error;
        }
    }

}