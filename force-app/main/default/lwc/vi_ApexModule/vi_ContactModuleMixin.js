// A simple Mixin method
// adds the `getContacts()` method to classes that implement this mixin
export const ContactModuleMixin = (BaseClass) =>
  class extends BaseClass {
    getContacts() {
        console.log("getContacts called");
        return {
            contactName:"Demo Contact",
            contactId: "003xx000004TmiAAE",
        }
    }
}