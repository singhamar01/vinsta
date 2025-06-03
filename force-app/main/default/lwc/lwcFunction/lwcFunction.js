import { LightningElement,api } from 'lwc';
import { PersonModuleMixin } from 'c/vi_ApexModule';

export default class LwcFunction extends PersonModuleMixin(LightningElement) {
    // You can now use the getAllPersons method from the mixin
    @api
    async callGetAllPersons() {
        const result = await this.getAllPersons();
        console.log("Result from getAllPersons:", result);
        return result;
    }
}