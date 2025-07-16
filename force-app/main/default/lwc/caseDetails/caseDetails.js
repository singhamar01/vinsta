import { LightningElement, api } from 'lwc';

export default class CaseDetails extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    @api componentType;   
    
    handleInput(event) {
        console.log('Checked:', event.target.checked);
        console.log('Value:', event.target.value);
        console.log('Name:', event.target.name);
    }    
}