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

    // Handler for parent onchange (optional, for direct method call)
    @api changeHandler;

    connectedCallback() {
        this.labelVariant = this.labelPosition === 'above' ? 'label-stacked' : 'standard';
        // Apply the @api background properties to CSS custom properties on the host element
        this.updateStyleHooks();
    }

    handleCheckboxChange(event) {
        this.isChecked = event.target.checked;
        // Dispatch a custom event with the checked state
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.isChecked,
                value: this.value,
                name: this.name
            },
            bubbles: true,
            composed: true
        }));
        // Optionally call the parent handler if provided, passing the custom detail
        if (this.changeHandler) {
            this.changeHandler({
                detail: {
                    checked: this.isChecked,
                    value: this.value,
                    name: this.name
                }
            });
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