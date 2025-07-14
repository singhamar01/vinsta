import { LightningElement, api } from 'lwc';

export default class CaseDetails extends LightningElement {
    // Flexipage provides recordId and objectApiName
    @api recordId;
    @api objectApiName;
    @api componentType;    
}