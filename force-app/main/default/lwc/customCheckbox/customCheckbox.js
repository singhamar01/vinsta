import { LightningElement } from 'lwc';

export default class CustomCheckbox extends LightningElement {
    handleCheckboxChange(event) {
        const isChecked = event.target.checked;
        const container = this.template.querySelector('.checkbox-container');
        // Dynamically update CSS custom property based on checkbox state
        container.style.setProperty('--checkbox-background', isChecked ? '#28a745' : '#e410a4ff');
    }
}