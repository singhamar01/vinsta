import { LightningElement } from 'lwc';
import { PersonModuleMixin } from 'c/vi_ApexModule';
export default class FamilyBook extends PersonModuleMixin(LightningElement) {
    //create a variable to hold the persons
    persons = [];
    async connectedCallback() {
        console.log('FamilyBook connectedCallback called');
        this.persons = await this.getAllPersons();
        console.log('All Persons:', JSON.stringify(this.persons));
    }
}