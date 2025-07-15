import { LightningElement, api } from 'lwc';

export default class MljCheckbox extends LightningElement {
    @api label = 'Custom Checkbox'; // Default label
    @api isChecked = false; // Default checked state
    @api defaultBackground = '#f0f0f0'; // Default background color
    @api checkedBackground = '#28a745'; // Checked background color
    @api name; // Name attribute for form association
    @api value; // Value attribute for form submission
    @api disabled = false; // Disabled state

    connectedCallback() {
        // Initialize background color based on initial checked state
        this.updateBackground(this.isChecked);
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
        this.updateBackground(this.isChecked);
        // Dispatch custom event for parent components
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    checked: this.isChecked,
                    value: this.value,
                    name: this.name
                }
            })
        );
    }

    updateBackground(isChecked) {
        const checkbox = this.template.querySelector('lightning-input');
        checkbox.style.setProperty('--checkbox-background', isChecked ? this.checkedBackground : this.defaultBackground);
    }
}