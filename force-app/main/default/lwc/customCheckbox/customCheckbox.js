import { LightningElement, api, track } from 'lwc';

export default class CustomCheckbox extends LightningElement {
  @api componentType;
  @api recordId;
  @api objectApiName;
  @api isDisabled = false;
  @track isChecked = true;

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
  get wrapperStyle() {
    return this.isChecked && !this.isDisabled ? 'position: relative; padding: 0.5rem;' : 'padding: 0.5rem;';
  }

  handleCheckboxChange(event) {
    if (!this.isDisabled) {
      this.isChecked = event.target.checked;
    }
  }

  renderedCallback() {
    console.log('Wrapper Class:', this.wrapperClass, 'isChecked:', this.isChecked, 'isDisabled:', this.isDisabled);
  }
}