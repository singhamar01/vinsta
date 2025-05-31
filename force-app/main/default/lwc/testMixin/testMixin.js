import { LightningElement } from 'lwc';
//import { AccountModuleMixin } from 'c/vi_AccountModuleMixin';
//import { ContactModuleMixin } from 'c/vi_ContactModuleMixin';
import { AccountModuleMixin,ContactModuleMixin } from 'c/vi_ApexModule';

export default class TestMixin extends AccountModuleMixin(
    ContactModuleMixin(LightningElement)
) {
  
    // This class uses the mixins to add functionality
    // from vi_ApexModule to the LightningElement base class.
    // The mixins add the `getAccounts()` and `getContacts()` methods
    // which can be used in the component.
    // The connectedCallback lifecycle hook is used to log the results
    // of calling these methods when the component is connected to the DOM.
    async connectedCallback() {
        console.log('TestMixin connectedCallback called');
        const accounts = await this.getRecentAccounts();
        console.log('Recent Accounts:', JSON.stringify(accounts));
        //console.log(this.getAccounts());
        console.log(this.getContacts());
    }
}