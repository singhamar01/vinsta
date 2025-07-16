import { LightningElement, api, track } from 'lwc';

export default class TestCheckbox extends LightningElement {
    @api label = 'Custom Checkbox';
    @api isChecked = false;
    @api defaultBackground = '#f0f0f0';
    @api checkedBackground = '#28a745';
    @api name;
    @api value;
    @api disabled = false;
    @api labelPosition = 'beside';
    @api customClass = '';

    @track labelVariant = 'label-stacked';

    // Renamed to changeHandler to avoid reserved "on" prefix
    @api changeHandler;

    connectedCallback() {
        this.labelVariant = this.labelPosition === 'above' ? 'label-stacked' : 'standard';
        requestAnimationFrame(() => {
            this.updateBackground(this.isChecked);
        });
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
        this.updateBackground(this.isChecked);
        // Dispatch event to parent if changeHandler is provided, using the native event
        if (this.changeHandler) {
            this.changeHandler(event); // Pass the original lightning-input event
        }
        // Also dispatch a custom event for internal use or additional listeners
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.isChecked,
                value: this.value,
                name: this.name
            }
        }));
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
        const baseClass = 'checkbox-container';
        const positionClass = this.labelPosition === 'above' ? 'label-above' : 'label-beside';
        return `${baseClass} ${positionClass} ${this.customClass}`.trim();
    }
}