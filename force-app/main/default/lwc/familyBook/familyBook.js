import { LightningElement } from 'lwc';
import { PersonModuleMixin } from 'c/vi_ApexModule';
export default class FamilyBook extends PersonModuleMixin(LightningElement) {
    //crate an array to hold OrderLevel data from 1 to 6
    orderlevels = [1, 2, 3, 4, 5, 6];
    //create a variable to hold the persons
    persons = [];
    groupedPersons = [];
    async connectedCallback() {
        console.log('FamilyBook connectedCallback called');
        this.persons = await this.getAllPersons();
        this.groupedPersons = this.groupPersonsByOrderLevel(this.persons);
        //console.log('All Persons:', JSON.stringify(this.persons));
        console.log('Grouped Persons:', JSON.stringify(this.groupedPersons));
    }
    groupPersonsByOrderLevel(persons) {
        const grouped = {};
        persons.forEach(person => {
            console.log(person.Order__c);
            const orderLevel = person.Order__c ? Number(person.Order__c.charAt(0)) : NaN;
            console.log(`Processing person: ${person.Name}, Order Level: ${orderLevel}`);
            if (!grouped[orderLevel]) {
                console.log(`Creating new group for Order Level: ${orderLevel}`);
                grouped[orderLevel] = { orderLevel, persons: [] };
            }
            grouped[orderLevel].persons.push(person);
        });
        return Object.values(grouped);
    }
}