import { LightningElement, api, track } from 'lwc';

export default class CustomCheckbox extends LightningElement {
  @api componentType; // Required for c-custom-tabs integration
  @api recordId; // For consistency with c-case-details
  @api objectApiName; // For consistency with c-case-details
  @api isDisabled = false; // Default to Enabled mode
  @track isChecked = true; // Tracks checkbox state

  get wrapperClass() {
    let baseClass = 'slds-m-around_small';
    if (this.isDisabled) {
      return this.isChecked
        ? `${baseClass} custom-checkbox-grey`
        : `${baseClass} custom-checkbox-black`;
    }
    return this.isChecked
      ? `${baseClass} custom-checkbox-green`
      : baseClass;
  }

  get checkboxClass() {
    if (this.isDisabled) {
      // Disabled (Read-Only) Mode
      return this.isChecked
        ? 'slds-form-element__control custom-checkbox-grey'
        : 'slds-form-element__control custom-checkbox-black';
    }
    // Enabled (Edit) Mode
    return this.isChecked
      ? 'slds-form-element__control custom-checkbox-green'
      : 'slds-form-element__control';
  }

  handleCheckboxChange(event) {
    console.log('Checkbox changed:', event.target.checked);
    if (!this.isDisabled) {
      this.isChecked = event.target.checked;
    }
  }

  renderedCallback() {
    console.log('Wrapper Class:', this.wrapperClass, 'isChecked:', this.isChecked, 'isDisabled:', this.isDisabled);
  }  
}