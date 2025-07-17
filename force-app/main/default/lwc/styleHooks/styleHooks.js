import { LightningElement, api, track } from 'lwc';

export default class StyleHooks extends LightningElement {
    @api label = 'Style Hooks Checkbox';
    @api isChecked = false;
    @api defaultBackground = '#f0f0f0';
    @api checkedBackground = '#28a745';
    @api name;
    @api value;
    @api disabled = false;
    @api labelPosition = 'beside';
    @api customClass = '';

    @track labelVariant = 'label-stacked';

    // Handler for parent onchange
    @api changeHandler;

    connectedCallback() {
        this.labelVariant = this.labelPosition === 'above' ? 'label-stacked' : 'Standard';
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
        // Dispatch event to parent if changeHandler is provided, using the native event
        if (this.changeHandler) {
            this.changeHandler(event);
        }
        // Dispatch a custom event for internal use or additional listeners
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.isChecked,
                value: this.value,
                name: this.name
            }
        }));
    }

    get computedContainerClass() {
        const baseClass = 'style-hooks-container';
        const positionClass = this.labelPosition === 'above' ? 'label-above' : 'label-beside';
        return `${baseClass} ${positionClass} ${this.customClass}`.trim();
    }
}