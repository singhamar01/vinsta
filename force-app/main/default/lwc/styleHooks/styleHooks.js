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
        this.labelVariant = this.labelPosition === 'above' ? 'label-stacked' : 'label-inline';
        // Apply the @api background properties to CSS custom properties on the host element
        this.updateStyleHooks();
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
        // Dispatch event to parent if changeHandler is provided, using the native event
        if (this.changeHandler) {
            this.changeHandler(event); // Pass the original lightning-input event
        }
    }

    updateStyleHooks() {
        // Ensure the host element is available before setting properties
        if (this.template && this.template.host) {
            this.template.host.style.setProperty('--default-background', this.defaultBackground);
            this.template.host.style.setProperty('--checked-background', this.checkedBackground);
        } else {
            console.warn('Host element not available in updateStyleHooks');
        }
    }

    get computedContainerClass() {
        const baseClass = 'style-hooks-container';
        const positionClass = this.labelPosition === 'above' ? 'label-above' : 'label-beside';
        return `${baseClass} ${positionClass} ${this.customClass}`.trim();
    }
}