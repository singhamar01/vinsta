import { LightningElement } from 'lwc';
//import { AccountModuleMixin } from 'c/vi_AccountModuleMixin';
//import { ContactModuleMixin } from 'c/vi_ContactModuleMixin';
import { AccountModuleMixin,ContactModuleMixin,PersonModuleMixin } from 'c/vi_ApexModule';

export default class TestMixin extends AccountModuleMixin(
    ContactModuleMixin(PersonModuleMixin(LightningElement))
) {
    //create a variable to hold the accounts
    accounts = [];
    //create a variable to hold the persons
    persons = [];
    // This class uses the mixins to add functionality
    // from vi_ApexModule to the LightningElement base class.
    // The mixins add the `getAccounts()` and `getContacts()` methods
    // which can be used in the component.
    // The connectedCallback lifecycle hook is used to log the results
    // of calling these methods when the component is connected to the DOM.
    async connectedCallback() {
        console.log('TestMixin connectedCallback called');
        //this.accounts = await this.getRecentAccounts();
        //console.log('Recent Accounts:', JSON.stringify(this.accounts));
        this.persons = await this.getAllPersons();
        console.log('All Persons:', JSON.stringify(this.persons));
        //console.log(this.getAccounts());
        //console.log(this.getContacts());
    }
}