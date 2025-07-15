import { LightningElement, api, track } from 'lwc';

export default class MljCheckbox extends LightningElement {
    @api label = 'Custom Checkbox'; // Default label
    @api isChecked = false; // Default checked state
    @api defaultBackground = '#f0f0f0'; // Default background color
    @api checkedBackground = '#28a745'; // Checked background color
    @api name; // Name attribute for form association
    @api value; // Value attribute for form submission
    @api disabled = false; // Disabled state
    @api labelPosition = 'beside'; // Label position: 'above' or 'beside'
    @api customClass = ''; // Additional custom classes for the container

    @track labelVariant = 'label-stacked'; // Default for 'above' position

    connectedCallback() {
        // Set label variant based on labelPosition
        this.labelVariant = this.labelPosition === 'above' ? 'label-stacked' : 'standard';
        // Defer background update to ensure DOM is ready
        requestAnimationFrame(() => {
            this.updateBackground(this.isChecked);
        });
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
        if (checkbox) {
            checkbox.style.setProperty('--checkbox-background', isChecked ? this.checkedBackground : this.defaultBackground);
        } else {
            console.warn('lightning-input element not found in updateBackground');
        }
    }

    get computedContainerClass() {
        // Combine base class, label position class, and custom class
        const baseClass = 'checkbox-container';
        const positionClass = this.labelPosition === 'above' ? 'label-above' : 'label-beside';
        return `${baseClass} ${positionClass} ${this.customClass}`.trim();
    }
}