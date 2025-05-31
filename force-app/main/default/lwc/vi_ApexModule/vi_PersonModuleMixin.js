// A simple Mixin method
// adds the `getAllPersons()` method to classes that implement this mixin
import getAllPersons from '@salesforce/apex/ApexModuleController.getAllPersons';

export const PersonModuleMixin = (BaseClass) =>
  class extends BaseClass {
    // Call an apex method to get all persons
    async getAllPersons() {
        console.log("getAllPersons called");
        try {
            const persons = await getAllPersons();
            return persons;
        } catch (error) {
            console.error('Error fetching all persons:', error);
            throw error;
        }
    }

}