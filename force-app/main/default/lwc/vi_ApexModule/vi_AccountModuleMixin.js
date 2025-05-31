// A simple Mixin method
// adds the `getAccounts()` method to classes that implement this mixin
export const AccountModuleMixin = (BaseClass) =>
  class extends BaseClass {
    getAccounts() {
        console.log("getAccounts called");
        return {
            accountName:"Demo Account",
            accountId: "001xx000003DGXAAA4",
        }
    }
}